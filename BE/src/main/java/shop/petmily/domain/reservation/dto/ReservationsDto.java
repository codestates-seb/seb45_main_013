package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.reservation.entity.Progress;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class ReservationsDto {

    @Getter
    @Setter
    public static class MemberResponse {
        private Long reservationId;

        private LocalDate reservationDay;

        private LocalTime reservationTimeStart;

        private LocalTime reservationTimeEnd;

        private String address;

        private String reservationPhone;

        private String reservationBody;

        private Progress progress;

        private Long petsitterId;

        private String petsitterName;

        private String petsitterNickName;

        private String petsitterPhone;

        private String petsitterPhoto;

        private List<ReservationsDto.PetResponse> pets;

        private Long journalId;
    }

    @Getter
    @Setter
    public static class PetsitterResponse {
        private Long reservationId;

        private LocalDate reservationDay;

        private LocalTime reservationTimeStart;

        private LocalTime reservationTimeEnd;

        private String address;

        private String reservationPhone;

        private String reservationBody;

        private Progress progress;

        private Long memberId;

        private String memberName;

        private String memberNickName;

        private String memberPhone;

        private String memberPhoto;

        private List<ReservationsDto.PetResponse> pets;

        private Long journalId;
    }

    @Getter
    @Setter
    public static class PetResponse {
        private Long petId;

        private String name;
    }
}

