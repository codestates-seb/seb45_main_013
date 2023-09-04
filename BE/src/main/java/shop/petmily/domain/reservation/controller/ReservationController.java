package shop.petmily.domain.reservation.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.dto.*;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.mapper.ReservationMapper;
import shop.petmily.domain.reservation.repository.ReservationRepository;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.global.argu.LoginMemberId;
import shop.petmily.global.security.utils.JwtUtils;

import javax.validation.constraints.Positive;
import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Validated
@Slf4j
@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationMapper mapper;
    private final ReservationService service;
    private final JwtUtils jwtUtils;
    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationMapper mapper, ReservationService service, JwtUtils jwtUtils,ReservationRepository reservationRepository) {
        this.mapper = mapper;
        this.service = service;
        this.jwtUtils = jwtUtils;
        this.reservationRepository = reservationRepository;
    }

    // 예약 등록
    @PostMapping
    public ResponseEntity postReservation(@RequestBody ReservationPostDto reservationPostDto) {
        reservationPostDto.setMemberId(jwtUtils.getMemberId());
        Reservation reservation = mapper.reservationPostDtoToReservation(reservationPostDto);
        service.createReservation(reservation);
        ReservationResponseDto response = mapper.reservationToReservationResponseDto(reservation);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/petsitters")
    public ResponseEntity findPetsitter(@RequestBody ReservationPostDto reservationPostDto,
                                        @LoginMemberId Long memberId) {

        reservationPostDto.setMemberId(memberId);
        Reservation reservation = mapper.reservationPostDtoToReservation(reservationPostDto);

        List<Petsitter> petsitters = service.findReservationPossiblePetsitter(reservation);

        List<ReservationPossiblePetsitterReseponseDto> response = new ArrayList<>();
        for (Petsitter p : petsitters) {
            response.add(mapper.petsitterToReservationPossiblePetsitterReseponseDto(p));
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 예약 1개 조회 (jwt 아직 x)
    @GetMapping("/{reservation-id}")
    public ResponseEntity getReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        Reservation reservation = service.findReservation(reservationId);
        ReservationResponseDto response = mapper.reservationToReservationResponseDto(reservation);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    // 예약 전체 조회 (멤버) (jwt 아직 x) memberid jwt로 받아오는걸로 변경필요
//    @GetMapping("/member")
//    public ResponseEntity getReservationsForMember(@RequestParam("page") @Positive int page,
//                                                   @RequestParam("size") @Positive int size,
//                                                   @RequestParam("id") @Positive long memberId) {
//        Page<Reservation> reservationPage = service.findMemberReservations(page, size, memberId);
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
//
//    // 예약 전체 조회 (펫시터) (jwt 아직 x) petsiterid jwt로 받아오는걸로 변경필요
//    @GetMapping("/petSitter")
//    public ResponseEntity getReservationsForPetSitter(@RequestParam("page") @Positive int page,
//                                                      @RequestParam("size") @Positive int size,
//                                                      @RequestParam("petSitterId") @Positive long petSitterId) {
//        Page<Reservation> reservationPage = service.findPetsitterReservations(page, size, petSitterId);
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

//    // 예약 확정 (펫시터)petsiterid jwt로 받아오는걸로 변경필요
//    @PatchMapping("/{reservation-id}/confirm")
//    public HttpStatus confirmReservation(@PathVariable("reservation-id") @Positive long reservationId) {
//        service.confirmReservationStatus(reservationId, jwtUtils.getMemberId());
//
//        return HttpStatus.OK;
//    }
//
//    // 예약 취소 (펫시터)petsiterid jwt로 받아오는걸로 변경필요
//    @PatchMapping("/{reservation-id}/cancel")
//    public HttpStatus cancelReservationStatus(@PathVariable("reservation-id") @Positive long reservationId) {
//        service.cancelReservationStatus(reservationId, jwtUtils.getMemberId());
//
//        return HttpStatus.OK;
    }

//    // 예약 삭제
//    @DeleteMapping("/{reservation-id}")
//    public HttpStatus deleteReservation(@PathVariable("reservation-id") @Positive long reservationId) {
//        service.deleteReservation(reservationId, jwtUtils.getMemberId());
//
//        return HttpStatus.NO_CONTENT;
//    }
//}
