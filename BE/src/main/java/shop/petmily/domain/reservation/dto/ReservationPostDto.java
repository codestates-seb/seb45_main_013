package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class ReservationPostDto {
    private Long memberId;

    private String body;

    private LocalDate reservationDay;

    private LocalTime reservationTimeStart;

    private LocalTime reservationTimeEnd;

    private String adress;

    private String phone;

    private List<Long> petId;

    //null이면 펫시터 찾기, 아니면 예약등록
    private Long petsitterId;
}
