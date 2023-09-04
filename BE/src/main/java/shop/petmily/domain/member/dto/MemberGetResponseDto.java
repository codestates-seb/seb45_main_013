package shop.petmily.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberGetResponseDto {
    private String email;
    private String nickName;
    private String phone;
    private String address;
    private String photo;
    private String body;
}
