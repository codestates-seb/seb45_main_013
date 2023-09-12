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
public class FavoriteResponseDto {
    private Long petsitterId;
    private String petsitterName;
    private Petsitter.PossiblePetType possiblePetType;
    private List<String> possibleLocation;
    private String possibleDay;
    private LocalTime possibleTimeStart;
    private LocalTime possibleTimeEnd;
    private double star;
    private Integer reviewCount;
}
