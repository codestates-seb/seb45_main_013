package shop.petmily.domain.reservation.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import shop.petmily.domain.member.repository.MemberRepository;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.repository.ReservationRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.sql.Timestamp;
import java.time.*;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public ReservationService(ReservationRepository reservationRepository,
                              MemberRepository memberRepository,
                              MemberService memberService) {
        this.reservationRepository = reservationRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

//    public List<Petsitter> findReservationPossiblePetsitter(Reservation reservation){
//
//        LocalDate localDate = reservation.getReservationTimeStart().toLocalDateTime().toLocalDate();
//        String day = localDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);
//
//        List<Petsitter> dayPossiblePetsitters = petsitterRepository.findByPossibleDayContaining(day);
//
//        LocalTime reservationStartTime = reservation.getReservationTimeStart().toLocalDateTime().toLocalTime();
//        LocalTime reservationEndTime = reservation.getReservationTimeEnd().toLocalDateTime().toLocalTime();
//
//        if (reservationStartTime.isAfter(reservationEndTime)||(reservationStartTime.equals(reservationEndTime))) {
//            throw new BusinessLogicException(ExceptionCode.TIME_REQUEST_NOT_ALLOWED);
//        }
//
//        List<Petsitter> AllPossiblePetsitters = new ArrayList<>();
//        for (Petsitter petsitter : dayPossiblePetsitters) {
//            LocalTime petsitterPossibleTimeStart = petsitter.getPossibleTimeStart().toLocalTime();
//            LocalTime petsitterPossibleTimeEnd = petsitter.getPossibleTimeEnd().toLocalTime();
//
//            if ((petsitterPossibleTimeStart.equals(reservationStartTime) || petsitterPossibleTimeStart.isBefore(reservationStartTime)) &&
//                    (petsitterPossibleTimeEnd.equals(reservationEndTime) || petsitterPossibleTimeEnd.isAfter(reservationEndTime))) {
//                AllPossiblePetsitters.add(petsitter);
//            }
//        }
//        return AllPossiblePetsitters;
//    }

    // 예약 등록
    public Reservation createReservation(Reservation reservation) {
        reservation.setMember(memberService.findVerifiedMember(reservation.getMember().getMemberId()));

        LocalDateTime now = LocalDateTime.now();
        reservation.setCreatedAt(now);
        reservation.setLastModifiedAt(now);
        reservation.setProgress(Progress.RESERVATION_REQUEST);
        reservationRepository.save(reservation);

        return reservation;
    }

    // 예약 조회
    public Reservation findReservation(long reservationId) {
        Reservation reservation = findVerifiedReservation(reservationId);

        reservationRepository.save(reservation);

        return reservation;
    }

//    // 예약 전체 조회
//    public Page<Reservation> findMemberReservations(int page, int size, long id) {
//        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
//        Page<Reservation> reservations = reservationRepository.findByMember_MemberId(id, pageRequest);
//        return reservations;
//    }
//
//    public Page<Reservation> findPetsitterReservations(int page, int size, long id) {
//        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
//        Page<Reservation> reservations = reservationRepository.findByPetsitter_PetsitterId(id, pageRequest);
//        return reservations;
//    }

    // 예약 내용 수정
    public Reservation updateReservation(Reservation reservation) {
        Reservation findReservation = findVerifiedReservation(reservation.getReservationId());

        verifiedReservationOwnerMember(reservation.getMember().getMemberId(), findReservation);

        Optional.ofNullable(reservation.getReservationTimeStart())
                .ifPresent(findReservation::setReservationTimeStart);
        Optional.ofNullable(reservation.getReservationTimeEnd())
                .ifPresent(findReservation::setReservationTimeEnd);
        Optional.ofNullable(reservation.getBody())
                .ifPresent(findReservation::setBody);

        reservationRepository.save(findReservation);
        findReservation.setLastModifiedAt(LocalDateTime.now());
        return findReservation;
    }

    // 예약 확정 (펫시터)
//    public Reservation confirmReservationStatus(long reservationId, long petSitterid) {
//        Reservation reservation = findVerifiedReservation(reservationId);
//        verifiedReservationOwnerPetSitter(petSitterid, reservation);
//
//        if (Progress.RESERVATION_CONFIRMED.equals(reservation.getProgress())) {
//            throw new BusinessLogicException(ExceptionCode.ALREADY_CONFIRMED);
//        }
//        if (reservation.getProgress() == Progress.RESERVATION_REQUEST) {
//            reservation.setProgress(Progress.RESERVATION_CONFIRMED);
//        }
//        return reservationRepository.save(reservation);
//    }

    // 예약 취소 (펫시터)
//    public Reservation cancelReservationStatus(long reservationId, long petSitterid) {
//        Reservation reservation = findVerifiedReservation(reservationId);
//        verifiedReservationOwnerPetSitter(petSitterid, reservation);
//
//        if (Progress.RESERVATION_CANCELLED.equals(reservation.getProgress())) {
//            throw new BusinessLogicException(ExceptionCode.ALREADY_BEEN_CANCELLED);
//        }
//        if (reservation.getProgress() == Progress.RESERVATION_CONFIRMED || reservation.getProgress() == Progress.RESERVATION_REQUEST) {
//            reservation.setProgress(Progress.RESERVATION_CANCELLED);
//        }
//        return reservationRepository.save(reservation);
//    }


    // 유효한 예약인지 확인
    public Reservation findVerifiedReservation(long reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Reservation findReservation = optionalReservation.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_EXIST)
        );

        return findReservation;
    }

    // 예약에 해당하는 회원인지 확인
    public void verifiedReservationOwnerMember(long memberId, Reservation verifiedReservation){
        if (memberId != verifiedReservation.getMember().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }

    // 예약에 해당하는 펫시터인지 확인
//    public void verifiedReservationOwnerPetSitter(long petSitterId, Reservation verifiedReservation) {
//        if (petSitterId != verifiedReservation.getPetsitter().getPetsitterId()) {
//            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_PETSITTER);
//        }
//    }

//    예약 삭제
//    public void deleteReservation(long reservationId, long memberId) {
//        Reservation findReservation = findVerifiedReservation(reservationId);
//        verifiedReservationOwner(memberId, findReservation);
//
//        reservationRepository.delete(findReservation);
//    }
}
