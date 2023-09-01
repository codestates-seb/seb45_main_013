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
    private String email;
    private String nickName;
    private String phone;
    private String address;
    private String photo;
    private Petsitter.PossiblePetType possiblePetType;
    private String possibleDay;
    private Time possibleTimeStart;
    private Time possibleTimeEnd;
    private int star;
}
