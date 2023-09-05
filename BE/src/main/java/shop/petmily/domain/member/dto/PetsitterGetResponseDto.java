package shop.petmily.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Petsitter;

import java.sql.Time;

@Getter
@Setter
@Builder
public class PetsitterGetResponseDto {
    private long petsitterId;
    private String email;
    private String name;
    private String nickName;
    private String phone;
    private String address;
    private String photo;
    private Petsitter.PossiblePetType possiblePetType;
    private String possibleDay;
    private Time possibleTimeStart;
    private Time possibleTimeEnd;
    private String body;
    private double star;
}
