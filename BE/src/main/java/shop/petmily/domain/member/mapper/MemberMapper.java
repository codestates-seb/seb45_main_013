package shop.petmily.domain.member.mapper;

import shop.petmily.domain.member.dto.*;
import shop.petmily.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostRequestDto requestBody);
    Member memberPatchDtoToMember(MemberPatchRequestDto requestBody);
    Member memberToLoginMemberResponseDto(Member member);
    MemberPostResponseDto memberToMemberPostResponseDto(Member member);
    MemberPatchResponseDto memberToMemberPatchResponseDto(Member member);
    MemberGetResponseDto memberToMemberGetResponseDto(Member member);
}
