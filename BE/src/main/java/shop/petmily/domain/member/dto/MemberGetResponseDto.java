package shop.petmily.domain.member.dto;

import com.sun.istack.Nullable;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberGetResponseDto {
    private Long memberId;
    private Long petsitterId;
    private String email;
    private String name;
    private String nickName;
    private String phone;
    private String address;
    private String photo;
    private String body;
    private Boolean petsitterBoolean;
}
