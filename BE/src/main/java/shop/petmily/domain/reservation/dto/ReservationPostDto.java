package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.entity.Pet;

import java.util.List;

@Getter
@Setter
public class ReservationPostDto {
    private long memberId;

    private String body;

    private String reservationTimeStart;

    private String reservationTimeEnd;

    private List<Pet> pets;

    //null 이었다가 나중에 정보 저장
    private long petSitterId;
}
