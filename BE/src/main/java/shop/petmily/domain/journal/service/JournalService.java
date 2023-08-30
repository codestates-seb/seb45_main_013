package shop.petmily.domain.journal.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.journal.repository.JournalRepository;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JournalService {
    private final JournalRepository journalRepository;
    private final ReservationService reservationService;
    private final MemberService memberService;
    private final S3UploadService uploadService;

//    private final PetSitterService petSitterService;

    public JournalService(JournalRepository journalRepository,
                          ReservationService reservationService,
                          MemberService memberService,
                          S3UploadService uploadService) {
        this.journalRepository = journalRepository;
        this.reservationService = reservationService;
        this.memberService = memberService;
        this.uploadService = uploadService;
    }

    public Journal createJournal(Journal journal, List<MultipartFile> files) throws IOException {
//        journal.setPetSitterId;(petSitterService.findVerifiedPetSitter(review.getPetSitter().getPetSitterId()));

        List<String> photos = new ArrayList<>();
        if(files != null) {
            for (MultipartFile file : files) {
                photos.add(uploadService.saveFile(file));
            }
        }
        journal.setPhotos(photos);

        LocalDateTime now = LocalDateTime.now();
        journal.setCreatedAt(now);
        journal.setLastModifiedAt(now);

        journalRepository.save(journal);

        return journal;
    }
    public Journal findJournal(long journalId) {
        Journal journal = findVerifiedJournal(journalId);

        journalRepository.save(journal);
        return journal;
    }

    public Journal updateJournal(Journal journal, List<MultipartFile> files) throws IOException {
        Journal findJournal = findVerifiedJournal(journal.getJournalId());
//        verifiedJournalOwner(journal.getPetSitter().getPetSitterId(), findJournal);

        if(journal.getBody() != null) findJournal.setBody(journal.getBody());

        if(journal.getPhotos() != null && findJournal.getPhotos() != null) findJournal.setPhotos(journal.getPhotos());
        if(files != null) {
            for (MultipartFile file : files) {
                findJournal.addPhotos(uploadService.saveFile(file));
            }
        }

        findJournal.setLastModifiedAt(LocalDateTime.now());

        journalRepository.save(findJournal);
        return findJournal;
    }

    public void deleteJournal(long journalId, long petSitterId) {
        Journal findJournal = findVerifiedJournal(journalId);
        verifiedJournalOwner(petSitterId, findJournal);

        journalRepository.delete(findJournal);
    }


    private Journal findVerifiedJournal(long journalId) {
        Optional<Journal> optionalJournal = journalRepository.findById(journalId);
        Journal journal = optionalJournal.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.JOURNAL_NOT_EXIST)
        );
        return journal;
    }

    public void verifiedJournalOwner(long petSitterId, Journal verifiedJournal){
//        if (petSitterId != verifiedJournal.getPetSitter().getPetSitterId()){
//            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_PETSITTER);
//        }
    }

}
