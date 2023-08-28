package shop.petmily.domain.review.mapper;

import shop.petmily.domain.review.Dto.ReviewPatchDto;
import shop.petmily.domain.review.Dto.ReviewPostDto;
import shop.petmily.domain.review.Dto.ReviewResponseDto;
import shop.petmily.domain.review.entity.Review;

public interface ReviewMapper {
    Review reviewPostToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToResponse(Review createdReview);
}
