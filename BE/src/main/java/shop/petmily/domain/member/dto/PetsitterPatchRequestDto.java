package shop.petmily.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.global.utils.validation.ValidLocalTime;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PetsitterPatchRequestDto {

    private Long petsitterId;

    private Petsitter.PossiblePetType possiblePetType;

    private List<String> possibleLocation;

    private String possibleDay;

    @ValidLocalTime
    private LocalTime possibleTimeStart;

    @ValidLocalTime
    private LocalTime possibleTimeEnd;

    public void setPetsitterId(long petsitterId) {
        this.petsitterId = petsitterId;
    }
}
