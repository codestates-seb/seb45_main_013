package shop.petmily.domain.member.controller;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.member.dto.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.mapper.MemberMapper;
import shop.petmily.domain.member.mapper.PetsitterMapper;
import shop.petmily.domain.member.service.FavoriteService;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.member.service.PetsitterService;
import shop.petmily.global.argu.LoginMemberId;
import shop.petmily.global.dto.PageResponseDto;
import shop.petmily.global.dto.SingleResponseDto;
import shop.petmily.global.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final PetsitterService petsitterService;
    private final MemberMapper memberMapper;
    private final PetsitterMapper petsitterMapper;
    private final FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostRequestDto requestBody) {
        Member member = memberService.createMember(memberMapper.memberPostDtoToMember(requestBody));
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());
        return ResponseEntity.created(location).body(new SingleResponseDto<>("success create member"));
    }

    //*****사진 업로드 수정 다됨 이거참고******
    @PatchMapping(value = "/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @LoginMemberId Long loginMemberId,
                                      @Valid @ModelAttribute MemberPatchRequestDto requestBody) {
        Member findMember = memberService.findMember(memberId);
        memberService.verifyAuthority(findMember, loginMemberId);

        requestBody.setMemberId(findMember.getMemberId());

        memberService.updateMember(memberMapper.memberPatchDtoToMember(requestBody), requestBody.getFile());

        return new ResponseEntity<>(new SingleResponseDto<>("success modify member"), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}/photo")
    public ResponseEntity photoDeleteMember(@PathVariable ("member-id") @Positive long memberId,
                                            @LoginMemberId Long loginMemberId) {
        Member findMember = memberService.findMember(memberId);
        memberService.verifyAuthority(findMember, loginMemberId);
        memberService.photoDelete(findMember.getMemberId());
        return new ResponseEntity(new SingleResponseDto<>("success delete photo"), HttpStatus.OK);
    }

    @PatchMapping("/petsitters/{member-id}")
    public ResponseEntity patchPetsitterPossible(@PathVariable("member-id") @Positive long memberId,
                                      @LoginMemberId Long loginMemberId,
                                      @Valid @RequestBody PetsitterPatchRequestDto requestBody) {
        Member findMember = memberService.findMember(memberId);
        memberService.verifyAuthority(findMember, loginMemberId);

        Petsitter findPetsitter = petsitterService.findPetsitter(findMember);
        requestBody.setPetsitterId(findPetsitter.getPetsitterId());
        petsitterService.updatePetsitter(petsitterMapper.petstitterPatchDtoToPetsitter(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>("success modify member"), HttpStatus.OK);
    }

    @GetMapping("/petsitters")
    public ResponseEntity<PetsitterPossibleResoponseDto> getPetsitterPossible(@LoginMemberId Long loginMemberId) {
        Member findMember = memberService.findMember(loginMemberId);
        Petsitter findPetsitter = petsitterService.findPetsitter(findMember);
        PetsitterPossibleResoponseDto petsitterPossibleResoponseDto = petsitterService.findPossible(findPetsitter);
        return new ResponseEntity<>(petsitterPossibleResoponseDto, HttpStatus.OK);
    }

    @GetMapping("/search")
    @JsonManagedReference
    public ResponseEntity getPetsitters(@RequestParam Map<String, String> params, @PageableDefault(page = 0, size = 20, sort = "updateAt", direction = Sort.Direction.DESC) Pageable pageable) {

        // 펫시터 서비스에서 펫시터 목록을 조회
        Page<PetsitterGetResponseDto> petsitters = petsitterService.findPetsittersWithFilters(params, pageable);

        return new ResponseEntity<>(PageResponseDto.of(petsitters.getContent(), petsitters), HttpStatus.OK);
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

    // 찜 하기 + 찜 취소
    @PatchMapping("/favorite")
    public ResponseEntity favoritePetsitter(@LoginMemberId Long memberId,
                                            @RequestParam Long petsitterId) {
        favoriteService.toggleFavorite(memberId, petsitterId);
        return new ResponseEntity<>(new SingleResponseDto<>("해당 펫시터가 찜 선택(취소) 되었습니다"), HttpStatus.OK);
    }

    // 찜한 펫시터 목록 조회
    @GetMapping("/favorite")
    public ResponseEntity<List<PetsitterGetResponseDto>> getFavoritePetsitters(@LoginMemberId Long memberId) {
        List<PetsitterGetResponseDto> favoritePetsitters = favoriteService.findFavoritePetsitters(memberId);
        return new ResponseEntity<>(favoritePetsitters, HttpStatus.OK);
    }

//    @ResponseStatus(value = HttpStatus.OK)
//    @GetMapping("/user")
//    public ResponseEntity accountUserDetails(@LoginMemberId Long loginMemberId) {
//        Member findMember = memberService.findMember(loginMemberId);
//
//        return new ResponseEntity<>(new LoginMemberResponseDto(memberMapper.memberToLoginMemberResponseDto(findMember)), HttpStatus.OK);
//    }
}