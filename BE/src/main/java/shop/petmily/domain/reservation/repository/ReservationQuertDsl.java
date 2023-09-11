package shop.petmily.domain.reservation.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.review.entity.Review;

import static shop.petmily.domain.journal.entity.QJournal.journal;
import static shop.petmily.domain.review.entity.QReview.review;

@Repository
public class ReservationQuertDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public ReservationQuertDsl(JPAQueryFactory jpaQueryFactory) {
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
}
