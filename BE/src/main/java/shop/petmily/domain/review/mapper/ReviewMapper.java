package shop.petmily.domain.review.mapper;

import org.mapstruct.Mapper;
import shop.petmily.domain.review.Dto.ReviewPatchDto;
import shop.petmily.domain.review.Dto.ReviewPostDto;
import shop.petmily.domain.review.Dto.ReviewResponseDto;
import shop.petmily.domain.review.entity.Review;

@Mapper(componentModel = "Spring")
public interface ReviewMapper {
    Review reviewPostToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToResponse(Review createdReview);
}
