package shop.petmily.domain.reservation.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findByMember_MemberId(Long memberId, PageRequest pageRequest);

    Page<Reservation> findByPetsitter_PetsitterId(Long petsitterId, PageRequest pageRequest);


}
