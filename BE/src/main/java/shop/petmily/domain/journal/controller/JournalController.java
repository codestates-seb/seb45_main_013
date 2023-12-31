package shop.petmily.domain.journal.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.journal.dto.JournalMultiResponseDto;
import shop.petmily.domain.journal.dto.JournalPatchDto;
import shop.petmily.domain.journal.dto.JournalPostDto;
import shop.petmily.domain.journal.dto.JournalResponseDto;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.journal.mapper.JournalMapper;
import shop.petmily.domain.journal.service.JournalService;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.global.argu.LoginMemberId;
import shop.petmily.global.dto.PageInfo;

import javax.validation.constraints.Positive;
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
    public JournalController(JournalService service, MemberService memberService, JournalMapper mapper) {
        this.service = service;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 케어일지 등록
    @PostMapping
    public ResponseEntity<JournalResponseDto> postJournal( @ModelAttribute JournalPostDto journalPostDto,
                                                          @LoginMemberId Long memberId){
        journalPostDto.setPetsitterId(memberId);
        Journal createdJournal = service.createJournal(mapper.JournalPostDtoToJournal(journalPostDto), journalPostDto.getFile());
        JournalResponseDto response = mapper.JournalToResponse(createdJournal);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 케어일지 수정
    @PatchMapping("/{journal-id}")
    public ResponseEntity<JournalResponseDto> patchJournal(@PathVariable("journal-id") @Positive long journalId,
                                                           @ModelAttribute JournalPatchDto journalPatchDto,
                                                           @LoginMemberId Long memberId){
        journalPatchDto.setPetsitterId(memberService.findVerifiedMember(memberId).getPetsitter().getPetsitterId());
        journalPatchDto.setJournalId(journalId);
        Journal journal = mapper.JournalPatchDtoToJournal(journalPatchDto);
        JournalResponseDto response = mapper.JournalToResponse(service.updateJournal(journal, journalPatchDto.getFile()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 케어일지 1개 조회
    @GetMapping("/{journal-id}")
    public ResponseEntity<JournalResponseDto> getJournal(@PathVariable("journal-id") @Positive long journalId,
                                                         @LoginMemberId Long memberId) {
        Journal journal = service.findJournal(journalId, memberId);
        JournalResponseDto response = mapper.JournalToResponse(journal);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 케어일지 전체조회 (멤버)
    @GetMapping
    public ResponseEntity<JournalMultiResponseDto> getJournals(@RequestParam("page") @Positive int page,
                                                               @RequestParam("size") @Positive int size,
                                                               @LoginMemberId Long memberId) {
        Page<Journal> journalPage = service.findMemberJournal(page, size, memberId);
        PageInfo pageInfo = new PageInfo(page, size, (int) journalPage.getTotalElements(), journalPage.getTotalPages());

        List<Journal> journals = journalPage.getContent();
        List<JournalResponseDto> response =
                journals.stream()
                        .map(mapper::JournalToResponse)
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new JournalMultiResponseDto(response, pageInfo), HttpStatus.OK);
    }

//     케어일지 1개 삭제
//    @DeleteMapping("/{journal-id}")
//    public HttpStatus deleteJournal(@PathVariable("journal-id") @Positive long journalId) {
//        service.deleteJournal(journalId);
//        return HttpStatus.NO_CONTENT;
//    }
}
