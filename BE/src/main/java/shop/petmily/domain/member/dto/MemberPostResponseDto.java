package shop.petmily.domain.member.dto;

import shop.petmily.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberPostResponseDto {
    private Long memberId;

    private String email;

    private String displayName;

    private Member.MemberStatus status;
}
