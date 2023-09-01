package shop.petmily.domain.petsitter.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import shop.petmily.domain.petsitter.entity.Petsitter;

@AllArgsConstructor
@Getter
public class PetsitterPatchResponseDto {
    private long petsitterId;
    private String displayName;
    private String password;
    private Petsitter.PetsitterStatus status;
}
