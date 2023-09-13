package shop.petmily.domain.reservation.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.dto.PetsitterScheduledResponseDto;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.review.entity.Review;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static shop.petmily.domain.journal.entity.QJournal.journal;
import static shop.petmily.domain.reservation.entity.QReservation.reservation;
import static shop.petmily.domain.review.entity.QReview.review;

@Repository
public class ReservationQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public ReservationQueryDsl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public Journal findJournalByReservation(Reservation requestReservation){
        return jpaQueryFactory
                .selectFrom(journal)
                .where(journal.reservation.eq(requestReservation))
                .fetchOne();
    }

    public Review findReviewByReservation(Reservation requestReservation){
        return jpaQueryFactory
                .selectFrom(review)
                .where(review.reservation.eq(requestReservation))
                .fetchOne();
    }

    public List<Reservation> findReservationsByDateTime(){
        LocalDate today = LocalDate.now();
        LocalTime nowTime = LocalTime.now();

        return jpaQueryFactory
                .selectFrom(reservation)
                .where(
                        reservation.reservationDay.eq(today),
                        (reservation.reservationTimeStart.lt(nowTime).and(reservation.progress.eq(Progress.RESERVATION_REQUEST)))
                                .or(
                                        (reservation.reservationTimeEnd.lt(nowTime).and(reservation.progress.eq(Progress.RESERVATION_CONFIRMED)))
                                )
                )
                .fetch();
    }

    public List<PetsitterScheduledResponseDto> findPetsitterSchedule(Petsitter requestPetsitter) {
        return jpaQueryFactory
                .select(Projections.constructor(PetsitterScheduledResponseDto.class,
                        reservation.reservationId,
                        reservation.reservationDay,
                        reservation.reservationTimeStart,
                        reservation.reservationTimeEnd,
                        reservation.progress))
                .from(reservation)
                .where(
                        reservation.petsitter.eq(requestPetsitter),
                        reservation.reservationDay.goe(LocalDate.now()),
                        reservation.progress.ne(Progress.RESERVATION_CANCELLED)
                )
                .fetch();
    }
}
