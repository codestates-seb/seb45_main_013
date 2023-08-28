package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.entity.Pet;

import java.util.List;

@Getter
@Setter
public class ReservationPostDto {
    private long memberId;

    private long petSitterId;

    private String body;

    private String reservationTimeStart;

    private String reservationTimeEnd;

    private List<Pet> pets;
}
