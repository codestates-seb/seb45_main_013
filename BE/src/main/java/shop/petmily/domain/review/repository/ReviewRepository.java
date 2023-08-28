package shop.petmily.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
