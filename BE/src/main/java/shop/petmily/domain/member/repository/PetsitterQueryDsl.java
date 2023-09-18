package shop.petmily.domain.member.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.dto.PossiblePetsitterDto;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static shop.petmily.domain.member.entity.QPetsitter.petsitter;
import static shop.petmily.domain.reservation.entity.QReservation.reservation;

@Repository
public class PetsitterQueryDsl {

    private final JPAQueryFactory jpaQueryFactory;

    public PetsitterQueryDsl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<PossiblePetsitterDto.Response> findPossiblePetsitters(String possibleDay,
                                         Petsitter.PossiblePetType possiblePetType,
                                         String possibleLocation,
                                         LocalTime reservationTimeStart,
                                         LocalTime reservationTimeEnd,
                                         LocalDate reservationDate){

        return jpaQueryFactory
                .select(Projections.constructor(PossiblePetsitterDto.Response.class,
                        petsitter.member.memberId,
                        petsitter.petsitterId,
                        petsitter.member.name,
                        petsitter.member.nickName,
                        petsitter.member.photo,
                        petsitter.possibleDay,
                        petsitter.possibleTimeStart,
                        petsitter.possibleTimeEnd,
                        petsitter.star,
                        petsitter.reviewCount))
                .from(petsitter)
                .where(
                        petsitter.possibleDay.startsWith(possibleDay),
                        petsitter.possiblePetType.eq(possiblePetType).or(petsitter.possiblePetType.eq(Petsitter.PossiblePetType.PET_ALL)),
                        petsitter.possibleLocation.any().eq(possibleLocation),
                        petsitter.possibleTimeStart.loe(reservationTimeStart),
                        petsitter.possibleTimeEnd.goe(reservationTimeEnd),
                                JPAExpressions
                                        .select(petsitter)
                                        .from(reservation)
                                        .where(
                                                reservation.petsitter.eq(petsitter),
                                                reservation.reservationDay.eq(reservationDate),
                                                reservation.reservationTimeStart.loe(reservationTimeEnd),
                                                reservation.reservationTimeEnd.goe(reservationTimeStart),
                                                reservation.progress.ne(Progress.RESERVATION_CANCELLED)
                                        ).notExists()
                )
                .fetch();
    }

    public boolean petsitterReservationCheck(Petsitter petsitter,
                                             LocalTime reservationTimeStart,
                                             LocalTime reservationTimeEnd,
                                             LocalDate reservationDate) {

        Reservation findedReservation = jpaQueryFactory
                .selectFrom(reservation)
                .where(
                        reservation.petsitter.eq(petsitter),
                        reservation.reservationDay.eq(reservationDate),
                        reservation.reservationTimeStart.loe(reservationTimeEnd),
                        reservation.reservationTimeEnd.goe(reservationTimeStart),
                        reservation.progress.ne(Progress.RESERVATION_CANCELLED)
                ).fetchFirst();

        return findedReservation != null;
    }

    public boolean petsitterPossibleCheck(Petsitter requestPetsitter,
                                          String possibleDay,
                                          Petsitter.PossiblePetType possiblePetType,
                                          String possibleLocation,
                                          LocalTime reservationTimeStart,
                                          LocalTime reservationTimeEnd) {
        Petsitter findedPetsitter = jpaQueryFactory
                .selectFrom(petsitter)
                .where(
                        petsitter.petsitterId.eq(requestPetsitter.getPetsitterId()),
                        petsitter.possibleDay.startsWith(possibleDay),
                        petsitter.possiblePetType.eq(possiblePetType).or(petsitter.possiblePetType.eq(Petsitter.PossiblePetType.PET_ALL)),
                        petsitter.possibleLocation.any().eq(possibleLocation),
                        petsitter.possibleTimeStart.loe(reservationTimeStart),
                        petsitter.possibleTimeEnd.goe(reservationTimeEnd)
                ).fetchOne();

        return findedPetsitter == null;
    }
}