package shop.petmily.domain.reservation.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import shop.petmily.domain.member.repository.MemberRepository;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.repository.ReservationRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
//    private final PetSitterRepository petSitterRepository;

    public ReservationService(ReservationRepository reservationRepository, MemberRepository memberRepository, MemberService memberService) {
        this.reservationRepository = reservationRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    public Reservation createReservation(Reservation reservation) {
        reservation.setMember(memberService.findVerifiedMember(reservation.getMember().getMemberId()));

        LocalDateTime now = LocalDateTime.now();
        reservation.setCreatedAt(now);
        reservation.setLastModifiedAt(now);

        reservationRepository.save(reservation);

        return reservation;
    }

    public Reservation findReservation(long reservationId) {
        Reservation reservation = findVerifiedReservation(reservationId);

        reservationRepository.save(reservation);

        return reservation;
    }


    public Page<Reservation> findReservations(int page, int size) {
        return reservationRepository.findAll(PageRequest.of(page,size, Sort.by("reservationId").descending()));
    }

    public Reservation updateReservation(Reservation reservation) {
        Reservation findReservation = findVerifiedReservation(reservation.getReservationId());

        verifiedQuestionOwner(reservation.getMember().getMemberId(), findReservation);

        Optional.ofNullable(reservation.getReservationTimeStart())
                .ifPresent(findReservation::setReservationTimeStart);
        Optional.ofNullable(reservation.getReservationTimeEnd())
                .ifPresent(findReservation::setReservationTimeEnd);
        Optional.ofNullable(reservation.getBody())
                .ifPresent(findReservation::setBody);
        findReservation.setLastModifiedAt(LocalDateTime.now());

        reservationRepository.save(findReservation);
        return findReservation;
    }

    public void deleteReservation(long reservationId, long memberId) {
        Reservation findReservation = findVerifiedReservation(reservationId);
        verifiedQuestionOwner(memberId, findReservation);

        reservationRepository.delete(findReservation);
    }
    public Reservation findVerifiedReservation(long reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Reservation findReservation = optionalReservation.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_EXIST)
        );

        return findReservation;
    }
    public void verifiedQuestionOwner(long memberId, Reservation verifiedReservation){
        if (memberId != verifiedReservation.getMember().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }
}
