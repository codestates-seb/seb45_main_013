package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import org.joda.time.DateTime;

import java.sql.Date;
import  java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class ReservationPostDto {
    private long memberId;

    private String body;

    private Timestamp reservationTimeStart;

    private Timestamp reservationTimeEnd;

    private String adress;

    private String phone;

    private List<ReservationPetPostDto> pet;

    //null 이었다가 나중에 정보 저장
    private long petSitterId;
}
