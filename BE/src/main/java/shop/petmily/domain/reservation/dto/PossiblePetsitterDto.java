package shop.petmily.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import shop.petmily.global.utils.validation.ValidAddress;
import shop.petmily.global.utils.validation.ValidLocalDate;
import shop.petmily.global.utils.validation.ValidLocalTime;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class PossiblePetsitterDto {

    @Getter
    public static class Request{
        private Long memberId;

        @ValidLocalDate
        private LocalDate reservationDay;

        @ValidLocalTime
        private LocalTime reservationTimeStart;

        @ValidLocalTime
        private LocalTime reservationTimeEnd;

        @ValidAddress
        private String address;

        @NotNull(message = "예약하실 반려동물을 선택해 주세요.")
        private List<Long> petId;

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long memberId;

        private Long petsitterId;

        private String name;

        private String nickName;

        private String photo;

        private double star;

        private Integer reviewCount;
    }
}
