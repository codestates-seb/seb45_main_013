package shop.petmily.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Petsitter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
public class MemberPatchRequestDto {
    private Long memberId;

    @Pattern(regexp = "^[a-zA-Z가-헿0-9]{4,}$", message = "4자 이상부터 가능하며 특수 문자가 없어야 합니다.")
    private String nickName;

    @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-ZS]).{8,}", message = "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다.")
    private String password;

    @Pattern(regexp = "^010\\d{4}\\d{4}$", message = "'010'으로 시작해야 하며 '-'를 제외한 8자리 숫자여야 합니다.")
    private String phone;

    private String address;

    private String photo;

    private String body;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

}

