package shop.petmily.domain.review.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.reservation.entity.ReservationPet;
import shop.petmily.domain.review.Dto.ReviewPatchDto;
import shop.petmily.domain.review.Dto.ReviewPostDto;
import shop.petmily.domain.review.Dto.ReviewResponseDto;
import shop.petmily.domain.review.entity.Review;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "Spring")
public interface ReviewMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "reservationId", target = "reservation.reservationId")
    Review reviewPostToReview(ReviewPostDto reviewPostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Review reviewPatchToReview(ReviewPatchDto reviewPatchDto);

    default ReviewResponseDto reviewToResponse(Review review) {
        ReviewResponseDto response = new ReviewResponseDto();
        response.setReviewId(review.getReviewId());
        response.setMemberId(review.getReservation().getMember().getMemberId());
        response.setMemberNickName(review.getMember().getNickName());
        response.setMemberPhoto(review.getMember().getPhoto());
        response.setReservationId(review.getReservation().getReservationId());
        response.setPetsitterId(review.getPetsitter().getPetsitterId());

        response.setCreatedAt(review.getCreatedAt());
        response.setLastModifiedAt(review.getLastModifiedAt());
        response.setBody(review.getBody());
        response.setReviewPhotos(new ArrayList<>(review.getPhotos()));
        response.setStar(review.getStar());
        response.setPetsitterName(review.getReservation().getPetsitter().getMember().getName());
        response.setPetsitterPhoto(review.getReservation().getPetsitter().getMember().getPhoto());


        List<String> petNames = new ArrayList<>();
        List<String> petPhotos = new ArrayList<>();

        for (ReservationPet reservationPet : review.getReservation().getReservationPets()) {
            Pet pet = reservationPet.getPet();
            petNames.add(pet.getName());
            petPhotos.add(pet.getPhoto());
        }

        response.setPetNames(petNames);
        response.setPetPhotos(petPhotos);

        return response;
    }

}
