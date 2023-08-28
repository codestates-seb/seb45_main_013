package shop.petmily.domain.member.dto;

import shop.petmily.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberPatchResponseDto {
    private long memberId;
    private String displayName;
    private String password;
    private Member.MemberStatus status;
}
