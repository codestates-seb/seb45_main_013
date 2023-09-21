package shop.petmily.domain.journal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.journal.repository.JournalRepository;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.PetsitterRepository;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.member.service.PetsitterService;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.service.ReservationUtils;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class JournalService {
    private final JournalRepository journalRepository;
    private final ReservationUtils reservationUtils;
    private final S3UploadService uploadService;
    private final PetsitterRepository petsitterRepository;

    // 케어일지 등록
    public Journal createJournal(Journal journal, List<MultipartFile> files){
        Reservation verifiedreservation = reservationUtils.verificationReservation(journal.getReservation().getReservationId());
        journal.setReservation(verifiedreservation);
        journal.setMember(verifiedreservation.getMember());
        journal.setPetsitter(petsitterRepository.findByMember_MemberId(journal.getPetsitter().getPetsitterId()));

        if(journal.getPetsitter().getPetsitterId() != verifiedreservation.getPetsitter().getPetsitterId()){
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }

        if (journalRepository.existsByReservation(verifiedreservation)) {
            throw new BusinessLogicException(ExceptionCode.JOURNAL_ALREADY_EXISTS);
        }

        if (!verifiedreservation.getProgress().equals(Progress.FINISH_CARING)) {
            if (verifiedreservation.getProgress().equals(Progress.RESERVATION_CONFIRMED)) {
                throw new BusinessLogicException(ExceptionCode.BEFORE_FINISH_CARING);
            }
            throw new BusinessLogicException(ExceptionCode.BEFORE_CONFIRMED);
        }

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
    public Journal updateJournal(Journal journal, List<MultipartFile> files){
        Journal findJournal = findVerifiedJournal(journal.getJournalId());
        verifiedJournalOwnerByPetsitterId(journal.getPetsitter().getPetsitterId(), findJournal);

        if(journal.getBody() != null) findJournal.setBody(journal.getBody());

        if(journal.getPhotos().size() != 0) {
            findJournal.setPhotos(journal.getPhotos());
        } else {
            List<String> photos = new ArrayList<>();
            findJournal.setPhotos(photos);
        }

        if (files != null) {
            for (MultipartFile file : files) {
                findJournal.getPhotos().add(uploadService.saveFile(file));
            }
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
        return optionalJournal.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.JOURNAL_NOT_EXIST)
        );
    }

    // 접근자가 케어일지에 권한이 있는지 확인
    public void verifiedJournalOwner(long id, Journal verifiedJournal){
        if (id != verifiedJournal.getReservation().getPetsitter().getMember().getMemberId()
                && (id != verifiedJournal.getMember().getMemberId())) {
                    throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }

    public void verifiedJournalOwnerByPetsitterId(long id, Journal verifiedJournal){
        if (id != verifiedJournal.getReservation().getPetsitter().getPetsitterId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }

    public Long findJournalIdByReservationId(Long reservationId){
        return journalRepository.findJournalIdByReservationId(reservationId);
    }
//     케어일지 삭제(펫시터만)
//    public void deleteJournal(long journalId) {
//        Journal findJournal = findVerifiedJournal(journalId);
//
//        journalRepository.delete(findJournal);
//    }
}
