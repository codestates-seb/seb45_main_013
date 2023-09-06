package shop.petmily.domain.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.review.Dto.ReviewPatchDto;
import shop.petmily.domain.review.Dto.ReviewPostDto;
import shop.petmily.domain.review.Dto.ReviewResponseDto;
import shop.petmily.domain.review.entity.Review;

import java.util.ArrayList;

@Mapper(componentModel = "Spring")
public interface ReviewMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "reservationId", target = "reservation.reservationId")
    Review reviewPostToReview(ReviewPostDto reviewPostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Review reviewPatchToReview(ReviewPatchDto reviewPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "petsitter.petsitterId", target = "petsitterId")
    @Mapping(source = "reservation.reservationId", target = "reservationId")
    ReviewResponseDto reviewToResponse(Review createdReview);

    default ReviewResponseDto reviewsToResponseDto(Review review) {
        ReviewResponseDto dto = new ReviewResponseDto();
        dto.setReviewId(review.getReviewId());
        dto.setMemberId(review.getReservation().getMember().getMemberId());
        dto.setReservationId(review.getReservation().getReservationId());
        dto.setPetsitterId(review.getReservation().getPetsitter().getPetsitterId());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setLastModifiedAt(review.getLastModifiedAt());
        dto.setBody(review.getBody());
        dto.setPhotos(new ArrayList<>(review.getPhotos()));
        dto.setStar(review.getStar());

        return dto;
    }

}
