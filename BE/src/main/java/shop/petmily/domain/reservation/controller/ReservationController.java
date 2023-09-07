package shop.petmily.domain.reservation.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.dto.*;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.mapper.ReservationMapper;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.global.argu.LoginMemberId;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@Slf4j
@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationMapper mapper;
    private final ReservationService service;

    public ReservationController(ReservationMapper mapper, ReservationService service) {
        this.mapper = mapper;
        this.service = service;
    }

    //임시예약으로 등록하고<<등록안하는거로 변경...예약가능 펫시터 list보여주기
    @PostMapping("/petsitters")
    public ResponseEntity findPetsitter(@RequestBody ReservationPostDto reservationPostDto,
                                        @LoginMemberId Long memberId) {

        reservationPostDto.setMemberId(memberId);
        Reservation reservation = mapper.reservationPostDtoToReservation(reservationPostDto);

        List<Petsitter> petsitters = service.findReservationPossiblePetsitter(reservation);
//        Reservation savedReservation = service.createTemporaryReservation(reservation);

        List<ReservationPossiblePetsitterReseponseDto> petsitterReseponse = new ArrayList<>();
        for (Petsitter petsitter : petsitters) {
            petsitterReseponse.add(mapper.petsitterToReservationPossiblePetsitterReseponseDto(petsitter));
        }

        return new ResponseEntity<>(petsitterReseponse, HttpStatus.CREATED);
    }

    //임시예약에서<<임시예약안만듦 예약정보 + 펫시터정보 등록하고 예약신청상태로 만들기
    @PostMapping
    public ResponseEntity createResrvation(@RequestBody ReservationPostDto reservationPostDto,
                                           @LoginMemberId Long memberId) {
        reservationPostDto.setMemberId(memberId);
        Reservation reservation = mapper.reservationPostDtoToReservation(reservationPostDto);
        Reservation createdReservation = service.createReservation(reservation);
        ReservationResponseDto response = mapper.reservationToReservationResponseDto(createdReservation);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 예약 1개 조회
    @GetMapping("/{reservation-id}")
    public ResponseEntity getReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        Reservation reservation = service.findReservation(reservationId);
        ReservationResponseDto response = mapper.reservationToReservationResponseDto(reservation);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 예약 조회 (멤버)
    @GetMapping("/member")
    public ResponseEntity getReservationsForMember(@RequestParam("page") @Positive int page,
                                                   @RequestParam("size") @Positive int size,
                                                   @RequestParam(value = "condition", required = false) String condition,
                                                   @LoginMemberId Long memberId) {
        Page<Reservation> reservationPage = service.findMemberReservations(page, size, memberId, condition);
        ReservationPageInfo pageInfo = new ReservationPageInfo(page, size, (int) reservationPage.getTotalElements(), reservationPage.getTotalPages());

        List<Reservation> reservations = reservationPage.getContent();
        List<ReservationResponseDto> response =
                reservations.stream()
                        .map(reservation -> mapper.reservationToReservationResponseDto(reservation))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ReservationMultiResponseDto(response, pageInfo), HttpStatus.OK);
    }

    // 예약 조회 (펫시터)
    @GetMapping("/petsitter")
    public ResponseEntity getReservationsForPetSitter(@RequestParam("page") @Positive int page,
                                                      @RequestParam("size") @Positive int size,
                                                      @RequestParam(value = "condition", required = false) String condition,
                                                      @LoginMemberId Long memberId) {
        Page<Reservation> reservationPage = service.findPetsitterReservations(page, size, memberId, condition);
        ReservationPageInfo pageInfo = new ReservationPageInfo(page, size, (int) reservationPage.getTotalElements(), reservationPage.getTotalPages());

        List<Reservation> reservations = reservationPage.getContent();
        List<ReservationResponseDto> response =
                reservations.stream()
                        .map(reservation -> mapper.reservationToReservationResponseDto(reservation))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ReservationMultiResponseDto(response, pageInfo), HttpStatus.OK);
    }

    // 예약 확정 (펫시터)
    @PatchMapping("/{reservation-id}/confirm")
    public HttpStatus confirmReservation(@PathVariable("reservation-id") @Positive long reservationId,
                                         @LoginMemberId Long memberId) {
        service.confirmReservationStatus(reservationId, memberId);

        return HttpStatus.OK;
    }

    // 예약 취소 (펫시터)
    @PatchMapping("/{reservation-id}/petsittercancel")
    public HttpStatus cancelReservationPetsitter(@PathVariable("reservation-id") @Positive long reservationId,
                                              @LoginMemberId Long memberId) {
        service.cancelReservationPetsitter(reservationId, memberId);

        return HttpStatus.OK;
    }
    //예약 취소(멤버)
    @PatchMapping("/{reservation-id}/membercancel")
    public HttpStatus cancelReservationMember(@PathVariable("reservation-id") @Positive long reservationId,
                                                 @LoginMemberId Long memberId) {
        service.cancelReservationMember(reservationId, memberId);

        return HttpStatus.OK;
    }
}

//    // 메서드 추출 (예약 전체 조회)
//    public ResponseEntity makeReservationPage(@RequestParam("page") @Positive int page,
//                                              @RequestParam("size") @Positive int size,
//                                              @Positive long id) {
//        Page<Reservation> reservationPage = service.findMemberReservations(page, size, id);
//        ReservationPageInfo pageInfo = new ReservationPageInfo(page, size, (int) reservationPage.getTotalElements(), reservationPage.getTotalPages());
//
//        List<Reservation> reservations = reservationPage.getContent();
//        List<ReservationResponseDto> response =
//                reservations.stream()
//                        .map(reservation -> mapper.reservationToReservationResponseDto(reservation))
//                        .collect(Collectors.toList());
//
//        return new ResponseEntity<>(new ReservationMultiResponseDto(response, pageInfo), HttpStatus.OK);
//    }



//    // 예약 수정 (회원)
//    @PatchMapping("/{reservation-id}")
//    public ResponseEntity patchReservation(@PathVariable("reservation-id") @Positive long reservationId,
//                                           @RequestBody ReservationPatchDto reservationPatchDto) {
//        reservationPatchDto.setMemberId(jwtUtils.getMemberId());
//        reservationPatchDto.setReservationId(reservationId);
//
//        Reservation reservation = mapper.reservationPatchDtoToReservation(reservationPatchDto);
//        Reservation upadtedReservation = service.updateReservation(reservation);
//        ReservationResponseDto response = mapper.reservationToReservationResponseDto(upadtedReservation);
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

//    // 예약 삭제
//    @DeleteMapping("/{reservation-id}")
//    public HttpStatus deleteReservation(@PathVariable("reservation-id") @Positive long reservationId) {
//        service.deleteReservation(reservationId, jwtUtils.getMemberId());
//
//        return HttpStatus.NO_CONTENT;
//    }
//}
