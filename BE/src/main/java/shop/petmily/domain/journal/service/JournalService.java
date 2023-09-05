package shop.petmily.domain.journal.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.journal.repository.JournalRepository;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JournalService {
    private final JournalRepository journalRepository;
    private final ReservationService reservationService;
    private final MemberService memberService;
    private final S3UploadService uploadService;

    public JournalService(JournalRepository journalRepository,
                          ReservationService reservationService,
                          MemberService memberService,
                          S3UploadService uploadService) {
        this.journalRepository = journalRepository;
        this.reservationService = reservationService;
        this.memberService = memberService;
        this.uploadService = uploadService;
    }

    // 케어일지 등록
    public Journal createJournal(Journal journal, List<MultipartFile> files) throws IOException {
        Reservation reservation = reservationService.findVerifiedReservation(journal.getReservation().getReservationId());
        journal.setMember(reservation.getMember());

        if (!reservation.getProgress().equals(Progress.FINISH_CARING))
            throw new BusinessLogicException(ExceptionCode.WARNING);

        List<String> photos = new ArrayList<>();
        if(files != null) {
            for (MultipartFile file : files) {
                photos.add(uploadService.saveFile(file));
            }
        }
        journal.setPhotos(photos);

        journalRepository.save(journal);

        return journal;
    }

    // 케어일지 수정
    public Journal updateJournal(Journal journal, List<MultipartFile> files) throws IOException {
        Journal findJournal = findVerifiedJournal(journal.getJournalId());
        verifiedJournalOwner(journal.getPetsitter().getPetsitterId(), findJournal);

        if(journal.getBody() != null) findJournal.setBody(journal.getBody());

        if (files != null) {
            List<String> newPhotos = new ArrayList<>();
            for (MultipartFile file : files) {
                newPhotos.add(uploadService.saveFile(file));
            }
            findJournal.setPhotos(newPhotos);
        }

        journalRepository.save(findJournal);
        return findJournal;
    }

    // 케어일지 1개 조회
    public Journal findJournal(long journalId) {
        Journal journal = findVerifiedJournal(journalId);

        journalRepository.save(journal);
        return journal;
    }

    // 케어일지 전체 조회
    public Page<Journal> findMemberJournal(int page, int size, Long memberId) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.Direction.DESC, "reservation.reservationId");
        return journalRepository.findByReservation_Member_MemberId(memberId, pageable);
    }

    // 케어일지 삭제
    public void deleteJournal(long journalId, long petsitterId) {
        Journal findJournal = findVerifiedJournal(journalId);
        verifiedJournalOwner(petsitterId, findJournal);

        journalRepository.delete(findJournal);
    }

    // 유효한 케어일지인지 확인
    private Journal findVerifiedJournal(long journalId) {
        Optional<Journal> optionalJournal = journalRepository.findById(journalId);
        Journal journal = optionalJournal.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.JOURNAL_NOT_EXIST)
        );
        return journal;
    }

    // 접근자가 케어일지 작성자인지 확인
    public void verifiedJournalOwner(long petsitterId, Journal verifiedJournal){
        if (petsitterId != verifiedJournal.getPetsitter().getPetsitterId()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MODIFY);
        }
    }
}
