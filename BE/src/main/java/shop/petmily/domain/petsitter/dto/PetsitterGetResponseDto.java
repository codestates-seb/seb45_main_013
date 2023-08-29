package shop.petmily.domain.petsitter.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PetsitterGetResponseDto {
    private String email;
    private String name;
    private String displayName;
    private String phone;
    private String address;
    private String possiblePetType;
    private String possibleDay;
    private String possibleTimeStart;
    private String possibleTimeEnd;
    private String possibleLocation;
}
