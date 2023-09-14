package shop.petmily.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.petmily.domain.journal.dto.JournalResponseDto;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.dto.ReservationPostPetDto;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.review.Dto.ReviewResponseDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class ReservationDetailsDto {

    @Getter
    @Setter
    public static class Response{
        private Long reservationId;

        private LocalDate reservationDay;

        private LocalTime reservationTimeStart;

        private LocalTime reservationTimeEnd;

        private String address;

        private String phone;

        private String body;

        private Progress progress;

        private ReservationDetailsDto.MemberResponse member;

        private ReservationDetailsDto.PetsitterResponse petsitter;

        private List<ReservationDetailsDto.PetResponse> pets;

//        private ReservationDetailsDto.JournalResponse journal;
//
//        private ReservationDetailsDto.ReviewResponse review;

        public Response(Long reservationId, LocalDate reservationDay, LocalTime reservationTimeStart,
                        LocalTime reservationTimeEnd, String address, String phone, String body,
                        Progress progress) {
            this.reservationId = reservationId;
            this.reservationDay = reservationDay;
            this.reservationTimeStart = reservationTimeStart;
            this.reservationTimeEnd = reservationTimeEnd;
            this.address = address;
            this.phone = phone;
            this.body = body;
            this.progress = progress;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class MemberResponse {
        private Long memberId;

        private String name;

        private String nickName;

        private String body;

        private String photo;
    }

    @Getter
    @AllArgsConstructor
    public static class PetsitterResponse {
        private Long petsitterId;

        private String name;

        private String nickName;

        private String phone;

        private String body;

        private String photo;
    }

    @Getter
    @AllArgsConstructor
    public static class PetResponse {
        private Long petId;

        private Pet.PetType type;

        private String name;

        private Integer age;

        private String species;

        private Integer weight;

        private Boolean male;

        private Boolean neutering;

        private String body;

        private String photo;
    }

    @Getter
    @AllArgsConstructor
    public static class JournalResponse {
        private Long journalId;

        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class ReviewResponse {
        private Long reviewId;

        private String body;

        private Integer star;
    }
}
