package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Getter
@Setter
public class ReservationPostDto {
    private Long memberId;

    private String body;

    private Date reservationDay;

    private Time reservationTimeStart;

    private Time reservationTimeEnd;

    private String adress;

    private String phone;

    private List<Long> petId;

    //null 이었다가 나중에 정보 저장
    private long petSitterId;
}
