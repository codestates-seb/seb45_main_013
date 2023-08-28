package shop.petmily.domain.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
