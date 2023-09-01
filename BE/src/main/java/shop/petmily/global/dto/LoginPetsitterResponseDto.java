package shop.petmily.global.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.petsitter.entity.Petsitter;

@Getter
@Setter
@NoArgsConstructor
public class LoginPetsitterResponseDto {
    private Long petsitterId;

    private String email;

    private String displayName;

    public LoginPetsitterResponseDto(Petsitter petsitter) {
        this.petsitterId = petsitter.getPetsitterId();
        this.email = petsitter.getEmail();
        this.displayName = petsitter.getDisplayName();
    }
}
