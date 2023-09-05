package shop.petmily.domain.reservation.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import shop.petmily.domain.reservation.entity.Reservation;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findByMember_MemberId(Long memberId, PageRequest pageRequest);

    Page<Reservation> findByPetsitter_PetsitterId(Long petsitterId, PageRequest pageRequest);

    @Query(value = "SELECT * FROM reservation WHERE CAST(reservation_day AS DATE) = :today", nativeQuery = true)
    List<Reservation> findEqualReservationDay(@Param("today") LocalDate today);
}
