package shop.petmily.domain.journal.service;

import org.springframework.stereotype.Service;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.journal.repository.JournalRepository;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class JournalService {
    private final JournalRepository journalRepository;
    private final ReservationService reservationService;
    private final MemberService memberService;

//    private final PetSitterService petSitterService;

    public JournalService(JournalRepository journalRepository, ReservationService reservationService, MemberService memberService) {
        this.journalRepository = journalRepository;
        this.reservationService = reservationService;
        this.memberService = memberService;
    }

    public Journal createJournal(Journal journal) {
//        journal.setPetSitterId;(petSitterService.findVerifiedPetSitter(review.getPetSitter().getPetSitterId()));
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

    public Journal updateJournal(Journal journal) {
        Journal findJournal = findVerifiedJournal(journal.getJournalId());

//        verifiedJournalOwner(journal.getPetSitter().getPetSitterId(), findJournal);
        Optional.ofNullable(journal.getBody())
                .ifPresent(findJournal::setBody);

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
