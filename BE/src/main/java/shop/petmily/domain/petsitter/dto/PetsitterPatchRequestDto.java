package shop.petmily.domain.petsitter.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
public class PetsitterPatchRequestDto {
    private long petsitterId;

    @Pattern(regexp = "^[a-zA-Z가-헿0-9]{4,}$", message = "4자 이상부터 가능하며 특수 문자가 없어야 합니다.")
    private String displayName;

    @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-ZS]).{8,}", message = "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다.")
    private String password;

    @NotBlank
    @Pattern(regexp = "^010\\d{4}\\d{4}$", message = "'010'으로 시작해야 하며 '-'를 제외한 8자리 숫자여야 합니다.")
    private String phone;

    private String address;

    private String possiblePetType;

    private String possibleDay;

    private String possibleTimeStart;

    private String possibleTimeEnd;

    private String possibleLocation;
    public void setPetsitterId(long petsitterId) {
        this.petsitterId = petsitterId;
    }

}

