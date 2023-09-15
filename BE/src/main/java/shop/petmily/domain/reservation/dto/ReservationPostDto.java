package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import shop.petmily.global.utils.validation.ValidAddress;
import shop.petmily.global.utils.validation.ValidLocalDate;
import shop.petmily.global.utils.validation.ValidLocalTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class ReservationPostDto {

    @Getter
    public static class Request {
        private Long memberId;

        private String body;

        @ValidLocalDate
        private LocalDate reservationDay;

        @ValidLocalTime
        private LocalTime reservationTimeStart;

        @ValidLocalTime
        private LocalTime reservationTimeEnd;

        @ValidAddress
        private String address;

        @NotBlank(message = "휴대폰 번호를 입력해 주세요.")
        @Pattern(regexp = "^010\\d{4}\\d{4}$", message = "'010'으로 시작해야 하며 '-'를 제외한 총 11자리 숫자여야 합니다.")
        private String phone;

        @NotNull(message = "예약하실 반려동물을 선택해 주세요.")
        private List<Long> petId;

        @NotNull(message = "예약하실 펫시터를 선택해 주세요.")
        private Long petsitterId;

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }
    }
}