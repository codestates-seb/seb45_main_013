package shop.petmily.domain.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.review.Dto.ReviewPatchDto;
import shop.petmily.domain.review.Dto.ReviewPostDto;
import shop.petmily.domain.review.Dto.ReviewResponseDto;
import shop.petmily.domain.review.entity.Review;

@Mapper(componentModel = "Spring")
public interface ReviewMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "reservationId", target = "reservation.reservationId")
    Review reviewPostToReview(ReviewPostDto reviewPostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Review reviewPatchToReview(ReviewPatchDto reviewPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "reservation.reservationId", target = "reservationId")
    ReviewResponseDto reviewToResponse(Review createdReview);
}
