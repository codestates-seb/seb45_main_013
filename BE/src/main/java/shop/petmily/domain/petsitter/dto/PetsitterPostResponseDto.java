package shop.petmily.domain.petsitter.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import shop.petmily.domain.petsitter.entity.Petsitter;

@AllArgsConstructor
@Getter
public class PetsitterPostResponseDto {
    private long memberId;

    private String email;

    private String displayName;

    private Petsitter.PetsitterStatus status;
}
