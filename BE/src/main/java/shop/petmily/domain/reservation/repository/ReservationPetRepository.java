package shop.petmily.domain.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;

import java.util.List;

public interface ReservationPetRepository  extends JpaRepository<ReservationPet, Long> {

    List<ReservationPet> findByReservation(Reservation reservation);
}
