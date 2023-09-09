package shop.petmily.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberGetResponseDto {
    private Long memberId;
    private String email;
    private String name;
    private String nickName;
    private String phone;
    private String address;
    private String photo;
    private String body;
    private boolean petsitterBoolean;
}
