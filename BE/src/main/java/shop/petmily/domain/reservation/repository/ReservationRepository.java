package shop.petmily.domain.reservation.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findByMember(Member member, PageRequest pageRequest);

    Page<Reservation> findByMemberAndProgressIn(Member member, List<Progress> progressList, PageRequest pageRequest);

    Page<Reservation> findByMemberAndProgressNotIn(Member member, List<Progress> progressList, PageRequest pageRequest);

    Page<Reservation> findByPetsitter(Petsitter petsitter, PageRequest pageRequest);

    Page<Reservation> findByPetsitterAndProgressIn(Petsitter petsitter, List<Progress> progressList, PageRequest pageRequest);

    Page<Reservation> findByPetsitterAndProgressNotIn(Petsitter petsitter, List<Progress> progressList, PageRequest pageRequest);

    @Query(value = "SELECT * FROM reservation WHERE CAST(reservation_day AS DATE) = :today", nativeQuery = true)
    List<Reservation> findEqualReservationDay(@Param("today") LocalDate today);
}
