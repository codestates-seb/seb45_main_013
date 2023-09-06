package shop.petmily.domain.journal.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.journal.dto.*;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.journal.mapper.JournalMapper;
import shop.petmily.domain.journal.service.JournalService;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.global.argu.LoginMemberId;
import shop.petmily.global.security.utils.JwtUtils;

import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Validated
@RestController
@RequestMapping("/journals")
public class JournalController {
    private final JournalService service;
    private final MemberService memberService;
    private final JournalMapper mapper;
    private final JwtUtils jwtUtils;
    public JournalController(JournalService service, MemberService memberService, JournalMapper mapper, JwtUtils jwtUtils) {
        this.service = service;
        this.memberService = memberService;
        this.mapper = mapper;
        this.jwtUtils = jwtUtils;
    }

    // 케어일지 등록
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postJournal(@RequestPart JournalPostDto journalPostDto,
                                      @RequestPart(required = false) List<MultipartFile> files) throws IOException {
        journalPostDto.setPetsitterId(memberService.findVerifiedMember(jwtUtils.getMemberId()).getPetsitter().getPetsitterId());
        Journal createdJournal = service.createJournal(mapper.JournalPostDtoToJournal(journalPostDto), files);
        JournalResponseDto response = mapper.JournalToResponse(createdJournal);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 케어일지 수정
    @PatchMapping(value = "/{journal-id}",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchJournal(@PathVariable("journal-id") @Positive long journalId,
                                       @RequestPart JournalPatchDto journalPatchDto,
                                       @RequestPart(required = false) List<MultipartFile> files,
                                       @LoginMemberId Long memberId) throws IOException {
        journalPatchDto.setPetsitterId(memberService.findVerifiedMember(memberId).getPetsitter().getPetsitterId());
        journalPatchDto.setJournalId(journalId);
        Journal journal = mapper.JournalPatchDtoToJournal(journalPatchDto);
        JournalResponseDto response = mapper.JournalToResponse(service.updateJournal(journal, files));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 케어일지 1개 조회
    @GetMapping("/{journal-id}")
    public ResponseEntity getJournal(@PathVariable("journal-id") @Positive long journalId,
                                     @LoginMemberId Long memberId) {
        Journal journal = service.findJournal(journalId, memberId);
        JournalResponseDto response = mapper.JournalToResponse(journal);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 케어일지 전체조회 (멤버)
    @GetMapping
    public ResponseEntity getJournals(@RequestParam("page") @Positive int page,
                                      @RequestParam("size") @Positive int size,
                                      @LoginMemberId Long memberId) {
        Page<Journal> journalPage = service.findMemberJournal(page, size, memberId);
        JournalPageInfo pageInfo = new JournalPageInfo(page, size, (int) journalPage.getTotalElements(), journalPage.getTotalPages());

        List<Journal> journals = journalPage.getContent();
        List<JournalResponseDto> response =
                journals.stream()
                        .map(journal -> mapper.journalsToResponseDto(journal))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new JournalMultiResponseDto(response, pageInfo), HttpStatus.OK);
    }

    // 케어일지 1개 삭제
//    @DeleteMapping("/{journal-id}")
//    public HttpStatus deleteJournal(@PathVariable("journal-id") @Positive long journalId) {
//        service.deleteJournal(journalId, memberService.findVerifiedMember(jwtUtils.getMemberId()).getPetsitter().getPetsitterId());
//        return HttpStatus.NO_CONTENT;
//    }
}
