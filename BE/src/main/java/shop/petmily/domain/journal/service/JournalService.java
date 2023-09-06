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

        // 이미 예약에 대한 일지가 하나라도 있는 경우 예외를 던집니다.
        if (journalRepository.existsByReservation(reservation)) {
            throw new BusinessLogicException(ExceptionCode.JOURNAL_ALREADY_EXISTS);
        }
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
    public Journal findJournal(long journalId, Long memberId) {
        Journal journal = findVerifiedJournal(journalId);
        verifiedJournalOwner(memberId, journal);
        journalRepository.save(journal);
        return journal;
    }

    // 케어일지 전체 조회
    public Page<Journal> findMemberJournal(int page, int size, Long memberId) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.Direction.DESC, "reservation.reservationId");
        return journalRepository.findByMember_MemberId(memberId, pageable);
    }


    // 유효한 케어일지인지 확인
    private Journal findVerifiedJournal(long journalId) {
        Optional<Journal> optionalJournal = journalRepository.findById(journalId);
        Journal journal = optionalJournal.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.JOURNAL_NOT_EXIST)
        );
        return journal;
    }

    // 접근자가 케어일지에 권한이 있는지 확인
    public void verifiedJournalOwner(long id, Journal verifiedJournal){
        if (id != verifiedJournal.getReservation().getPetsitter().getPetsitterId()
            && id!= verifiedJournal.getMember().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }
//     케어일지 삭제(펫시터만)
//    public void deleteJournal(long journalId, long petsitterId) {
//        Journal findJournal = findVerifiedJournal(journalId);
//        verifiedJournalOwner(petsitterId, findJournal);
//
//        journalRepository.delete(findJournal);
//    }
}
