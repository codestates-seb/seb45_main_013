package shop.petmily.domain.member.controller;

import shop.petmily.domain.member.dto.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.mapper.MemberMapper;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.global.argu.LoginMemberId;
import shop.petmily.global.dto.LoginMemberResponseDto;
import shop.petmily.global.dto.SingleResponseDto;
import shop.petmily.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostRequestDto requestBody) {
        Member member = memberService.createMember(mapper.memberPostDtoToMember(requestBody));
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());
        return ResponseEntity.created(location).body(new SingleResponseDto<>("success create member"));
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @LoginMemberId Long loginMemberId,
                                      @Valid @RequestBody MemberPatchRequestDto requestBody) {
        Member findMember = memberService.findMember(memberId);
        memberService.verifyAuthority(findMember, loginMemberId);

        requestBody.setMemberId(findMember.getMemberId());
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>("success modify member"), HttpStatus.OK);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/my-page")
    public ResponseEntity<MemberGetResponseDto> getMember(@LoginMemberId Long loginMemberId) {
        MemberGetResponseDto memberGetResponseDto = memberService.findProfileMember(loginMemberId);

        return new ResponseEntity<>(memberGetResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId, @LoginMemberId Long loginMemberId) {
        Member findMember = memberService.findMember(memberId);
        memberService.verifyAuthority(findMember, loginMemberId);
        memberService.removeMember(findMember.getMemberId());
        return new ResponseEntity<>(new SingleResponseDto<>("success delete member"), HttpStatus.OK);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/user")
    public ResponseEntity accountUserDetails(@LoginMemberId Long loginMemberId) {
        Member findMember = memberService.findMember(loginMemberId);

        return new ResponseEntity<>(new LoginMemberResponseDto(mapper.memberToLoginMemberResponseDto(findMember)), HttpStatus.OK);
    }
}