package shop.petmily.domain.reservation.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.reservation.dto.*;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.mapper.ReservationMapper;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.global.security.utils.JwtUtils;

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
    private final JwtUtils jwtUtils;

    public ReservationController(ReservationMapper mapper, ReservationService service, JwtUtils jwtUtils) {
        this.mapper = mapper;
        this.service = service;
        this.jwtUtils = jwtUtils;
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

    // 예약 1개 조회
    @GetMapping("/{reservation-id}")
    public ResponseEntity getReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        Reservation reservation = service.findReservation(reservationId);
        ReservationResponseDto response = mapper.reservationToReservationResponseDto(reservation);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 예약 전체 조회
    @GetMapping
    public ResponseEntity getReservations(@RequestParam("page") @Positive int page,
                                          @RequestParam("size") @Positive int size){
        Page<Reservation> reservationPage = service.findReservations(page, size);
        ReservationPageInfo pageInfo = new ReservationPageInfo(page, size, (int) reservationPage.getTotalElements(), reservationPage.getTotalPages());

        List<Reservation> reservations = reservationPage.getContent();
        List<ReservationResponseDto> response =
                reservations.stream()
                        .map(reservation -> mapper.reservationToReservationResponseDto(reservation))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ReservationMultiResponseDto(response,pageInfo),HttpStatus.OK);
    }

    // 예약 수정
    @PatchMapping("/{reservation-id}")
    public ResponseEntity patchReservation(@PathVariable("reservation-id") @Positive long reservationId,
                                           @RequestBody ReservationPatchDto reservationPatchDto) {
        reservationPatchDto.setMemberId(jwtUtils.getMemberId());
        reservationPatchDto.setReservationId(reservationId);

        Reservation reservation = mapper.reservationPatchDtoToReservation(reservationPatchDto);
        Reservation upadtedReservation = service.updateReservation(reservation);
        ReservationResponseDto response = mapper.reservationToReservationResponseDto(upadtedReservation);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 예약 취소
    @DeleteMapping("/{reservation-id}")
    public HttpStatus deleteReservation(@PathVariable("reservation-id") @Positive long reservationId) {
        service.deleteReservation(reservationId, jwtUtils.getMemberId());

        return HttpStatus.NO_CONTENT;
    }
}
