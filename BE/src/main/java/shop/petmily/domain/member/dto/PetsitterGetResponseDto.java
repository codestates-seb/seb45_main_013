package shop.petmily.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Petsitter;

import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Builder
public class PetsitterGetResponseDto {
    private Long petsitterId;
    private String email;
    private String name;
    private String nickName;
    private String phone;
    private String address;
    private String photo;
    private Petsitter.PossiblePetType possiblePetType;
    private List<String> possibleLocation;
    private String possibleDay;
    private LocalTime possibleTimeStart;
    private LocalTime possibleTimeEnd;
    private String body;
    private double star;
    private int reviewCount;
}
