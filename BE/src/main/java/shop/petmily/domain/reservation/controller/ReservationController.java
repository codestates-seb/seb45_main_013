package shop.petmily.domain.reservation.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.journal.mapper.JournalMapper;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.dto.*;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.mapper.ReservationMapper;
import shop.petmily.domain.reservation.repository.ReservationQueryDsl;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.domain.review.mapper.ReviewMapper;
import shop.petmily.global.argu.LoginMemberId;
import shop.petmily.global.dto.PageInfo;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@Slf4j
@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationMapper mapper;
    private final ReservationService service;
    private final ReservationQueryDsl reservationQueryDsl;


    public ReservationController(ReservationMapper mapper, ReservationService service,
                                 ReservationQueryDsl reservationQueryDsl) {
        this.mapper = mapper;
        this.service = service;
        this.reservationQueryDsl = reservationQueryDsl;
    }

    //예약가능 펫시터 list 보여주기
    @PostMapping("/petsitters")
    public ResponseEntity<List<PossiblePetsitterDto.Response>> findPossiblePetsitters(@Valid @RequestBody PossiblePetsitterDto.Request requestBody,
                                                                                      @LoginMemberId Long memberId) {
        requestBody.setMemberId(memberId);

        Reservation reservation = mapper.possiblePetsitterDtoToReservation(requestBody);

        List<PossiblePetsitterDto.Response> possiblePetsitters = service.findReservationPossiblePetsitter(reservation);

        return new ResponseEntity<>(possiblePetsitters, HttpStatus.OK);
    }

    //예약정보 + 펫시터정보 등록하고 예약신청상태로 만들기
    @PostMapping
    public ResponseEntity<String> createReservation(@Valid @RequestBody ReservationPostDto.Request requestBody,
                                                    @LoginMemberId Long memberId) {
        requestBody.setMemberId(memberId);

        Reservation reservation = mapper.reservationPostDtoToReservation(requestBody);

        service.createReservation(reservation);

        return new ResponseEntity<>("Reservation Created", HttpStatus.CREATED);
    }


    // 예약 1개 조회
    @GetMapping("/{reservation-id}")
    public ResponseEntity<ReservationDetailsDto.Response> getReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        ReservationDetailsDto.Response response = service.findReservation(reservationId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 예약 조회 (멤버)
    @GetMapping("/member")
    public ResponseEntity<ReservationMultiDto.MemberResponse> getReservationsForMember(@RequestParam("page") @Positive int page,
                                                                                @RequestParam("size") @Positive int size,
                                                                                @RequestParam(value = "condition", required = false) String condition,
                                                                                @LoginMemberId Long memberId) {
        Page<Reservation> reservationPage = service.findMemberReservations(page, size, memberId, condition);
        PageInfo pageInfo = new PageInfo(page, size, (int) reservationPage.getTotalElements(), reservationPage.getTotalPages());

        List<Reservation> reservations = reservationPage.getContent();
        List<ReservationsDto.MemberResponse> responses =
                reservations.stream().map(mapper::reservationToReservationMemberResponseDto).collect(Collectors.toList());

        return new ResponseEntity<>(new ReservationMultiDto.MemberResponse(responses, pageInfo), HttpStatus.OK);
    }


    // 예약 조회 (펫시터)
    @GetMapping("/petsitter")
    public ResponseEntity<ReservationMultiDto.PetsitterResponse> getReservationsForPetSitter(@RequestParam("page") @Positive int page,
                                                      @RequestParam("size") @Positive int size,
                                                      @RequestParam(value = "condition", required = false) String condition,
                                                      @LoginMemberId Long memberId) {
        Page<Reservation> reservationPage = service.findPetsitterReservations(page, size, memberId, condition);
        PageInfo pageInfo = new PageInfo(page, size, (int) reservationPage.getTotalElements(), reservationPage.getTotalPages());

        List<Reservation> reservations = reservationPage.getContent();
        List<ReservationsDto.PetsitterResponse> responses =
                reservations.stream().map(mapper::reservationToReservationPetsitterResponseDto).collect(Collectors.toList());

        return new ResponseEntity<>(new ReservationMultiDto.PetsitterResponse(responses, pageInfo), HttpStatus.OK);
    }

    //펫시터 오늘날짜 이후 취소아닌 예약일정 찾기
    @GetMapping("/schedule/{petsitter-id}")
    public ResponseEntity<List<PetsitterScheduledResponseDto>> getPetsitterSchedule(@PathVariable("petsitter-id") @Positive long petsitterId){
        List<PetsitterScheduledResponseDto> response = service.getPetsitterSchedule(petsitterId);

        return new ResponseEntity<>(response, HttpStatus.OK);
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