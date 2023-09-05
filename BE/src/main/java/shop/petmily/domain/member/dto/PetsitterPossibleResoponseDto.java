package shop.petmily.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Petsitter;

import java.sql.Time;

@Getter
@Setter
@Builder
public class PetsitterPossibleResoponseDto {
    private long petsitterId;
    private Petsitter.PossiblePetType possiblePetType;
    private String possibleLocation;
    private String possibleDay;
    private Time possibleTimeStart;
    private Time possibleTimeEnd;
    private double star;
}
