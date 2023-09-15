package shop.petmily.domain.reservation.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.dto.PetsitterScheduleDto;
import shop.petmily.domain.reservation.dto.ReservationDetailsDto;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static shop.petmily.domain.member.entity.QMember.member;
import static shop.petmily.domain.member.entity.QPetsitter.petsitter;
import static shop.petmily.domain.pet.entity.QPet.pet;
import static shop.petmily.domain.reservation.entity.QReservation.reservation;

@Repository
public class ReservationQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public ReservationQueryDsl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public ReservationDetailsDto.Response findReservationDetails(Reservation requestReservation){
        return jpaQueryFactory
                .select(Projections.constructor(ReservationDetailsDto.Response.class,
                        reservation.reservationId,
                        reservation.reservationDay,
                        reservation.reservationTimeStart,
                        reservation.reservationTimeEnd,
                        reservation.address,
                        reservation.phone,
                        reservation.body,
                        reservation.progress))
                .from(reservation)
                .where(
                        reservation.eq(requestReservation)
                ).fetchOne();
    }

    public ReservationDetailsDto.MemberResponse findReservationMember(Reservation requestReservation){
        return jpaQueryFactory
                .select(Projections.constructor(ReservationDetailsDto.MemberResponse.class,
                        member.memberId,
                        member.name,
                        member.nickName,
                        member.body,
                        member.photo))
                .from(member)
                .where(
                        member.memberId.eq(requestReservation.getMember().getMemberId())
                ).fetchOne();
    }

    public ReservationDetailsDto.PetsitterResponse findReservationPetsitter(Reservation requestReservation){
        return jpaQueryFactory
                .select(Projections.constructor(ReservationDetailsDto.PetsitterResponse.class,
                        petsitter.petsitterId,
                        petsitter.member.name,
                        petsitter.member.nickName,
                        petsitter.member.phone,
                        petsitter.member.body,
                        petsitter.member.photo))
                .from(petsitter)
                .where(
                        petsitter.petsitterId.eq(requestReservation.getPetsitter().getPetsitterId())
                ).fetchOne();
    }

    public List<ReservationDetailsDto.PetResponse> findReservationPets(Reservation requestReservation){
        return jpaQueryFactory
                .select(Projections.constructor(ReservationDetailsDto.PetResponse.class,
                        pet.petId,
                        pet.type,
                        pet.name,
                        pet.age,
                        pet.species,
                        pet.weight,
                        pet.male,
                        pet.neutering,
                        pet.body,
                        pet.photo))
                .from(pet)
                .where(
                        pet.in(requestReservation.getReservationPets().stream()
                                .map(ReservationPet::getPet)
                                .collect(Collectors.toList()))
                ).fetch();
    }

    public List<Reservation> findReservationsByDateTime(){
        LocalDate today = LocalDate.now();
        LocalTime nowTime = LocalTime.now();

        return jpaQueryFactory
                .selectFrom(reservation)
                .where(
                        reservation.reservationDay.eq(today),
                        (reservation.reservationTimeStart.lt(nowTime).and(
                                reservation.progress.eq(Progress.RESERVATION_REQUEST)))
                                .or(
                                        (reservation.reservationTimeEnd.lt(nowTime).and(
                                                reservation.progress.eq(Progress.RESERVATION_CONFIRMED)))
                                )
                )
                .fetch();
    }

    public List<PetsitterScheduleDto.Response> findPetsitterSchedule(Petsitter requestPetsitter) {
        return jpaQueryFactory
                .select(Projections.constructor(PetsitterScheduleDto.Response.class,
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
