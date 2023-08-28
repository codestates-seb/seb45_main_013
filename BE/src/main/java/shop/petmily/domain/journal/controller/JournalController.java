package shop.petmily.domain.journal.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.journal.dto.JournalPatchDto;
import shop.petmily.domain.journal.dto.JournalPostDto;
import shop.petmily.domain.journal.dto.JournalResponseDto;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.journal.mapper.JournalMapper;
import shop.petmily.domain.journal.service.JournalService;
import shop.petmily.global.security.utils.JwtUtils;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@Validated
@RestController
@RequestMapping("/journals")
public class JournalController {
    private final JournalService service;
    private final JournalMapper mapper;
    private final JwtUtils jwtUtils;
    public JournalController(JournalService service, JournalMapper mapper, JwtUtils jwtUtils) {
        this.service = service;
        this.mapper = mapper;
        this.jwtUtils = jwtUtils;
    }

    // 일지 등록
    @PostMapping
    public ResponseEntity postJournal(@Valid @RequestBody JournalPostDto journalPostDto) {
        journalPostDto.setPetSitterId(jwtUtils.getMemberId());
        Journal createdJournal = service.createJournal(mapper.JournalPostDtoToJournal(journalPostDto));
        JournalResponseDto response = mapper.JournalToResponse(createdJournal);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 일지 수정
    @PatchMapping("/{journal-id}")
    public ResponseEntity patchJournal(@PathVariable("journal-id") @Positive long journalId,
                                       @Valid @RequestBody JournalPatchDto journalPatchDto) {
//        journalPatchDto.setPetSitterId(jwtUtils.getPetSitterId());
        journalPatchDto.setJournalId(journalId);
        Journal journal = this.mapper.JournalPatchDtoToJournal(journalPatchDto);
        JournalResponseDto response = this.mapper.JournalToResponse(service.updateJournal(journal));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 일지 1개 조회
    @GetMapping("/{journal-id}")
    public ResponseEntity getJournal(@PathVariable("journal-id") @Positive long journalId) {
        Journal journal = service.findJournal(journalId);
        JournalResponseDto response = mapper.JournalToResponse(journal);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/{journal-id}")
    public HttpStatus deleteJournal(@PathVariable("journal-id") @Positive long journalId) {
//        service.deleteJournal(journalId, jwtUtils.getMemberId());
        return HttpStatus.NO_CONTENT;
    }

}
