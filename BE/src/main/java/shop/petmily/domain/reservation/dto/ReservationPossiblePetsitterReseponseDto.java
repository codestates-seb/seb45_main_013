package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Setter
@Getter
public class ReservationPossiblePetsitterReseponseDto {
    private long memberId;

    private Long petsitterId;

    private String name;

    private String nickName;

    private String phone;

    private String email;

    private String address;

    private String photo;

    private String body;

    private String possiblePetType;

    private String possibleLocation;

    private String possibleDay;

    private Time possibleTimeStart;

    private Time possibleTimeEnd;

    private double star;
}