package shop.petmily.domain.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.review.entity.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByPetsitter(Petsitter petsitter);

    Page<Review> findByPetsitter_PetsitterId(Long petsitterId, Pageable pageable);

    boolean existsByReservation(Reservation reservation);

}

