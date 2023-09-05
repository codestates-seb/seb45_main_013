package shop.petmily.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.review.entity.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByPetsitter(Petsitter petsitter);

}
