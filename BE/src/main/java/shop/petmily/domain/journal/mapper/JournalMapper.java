package shop.petmily.domain.journal.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.journal.dto.JournalPatchDto;
import shop.petmily.domain.journal.dto.JournalPostDto;
import shop.petmily.domain.journal.dto.JournalResponseDto;
import shop.petmily.domain.journal.entity.Journal;

import java.util.ArrayList;

@Mapper(componentModel = "Spring")
public interface JournalMapper {

    @Mapping(source = "petsitterId", target = "petsitter.petsitterId")
    @Mapping(source = "reservationId", target = "reservation.reservationId")
    Journal JournalPostDtoToJournal(JournalPostDto journalPostDto);

    @Mapping(source = "petsitterId", target = "petsitter.petsitterId")
//    @Mapping(source = "reservationId", target = "reservation.reservationId")
    Journal JournalPatchDtoToJournal(JournalPatchDto journalPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "petsitter.petsitterId", target = "petsitterId")
    @Mapping(source = "reservation.reservationId", target = "reservationId")
    JournalResponseDto JournalToResponse(Journal journal);

    default JournalResponseDto journalsToResponseDto(Journal journal) {
        JournalResponseDto dto = new JournalResponseDto();
        dto.setJournalId(journal.getJournalId());
        dto.setReservationId(journal.getReservation().getReservationId());
        dto.setPetsitterId(journal.getReservation().getPetsitter().getPetsitterId());
        dto.setMemberId(journal.getReservation().getMember().getMemberId());
        dto.setCreatedAt(journal.getCreatedAt());
        dto.setLastModifiedAt(journal.getLastModifiedAt());
        dto.setBody(journal.getBody());

        dto.setPhotos(new ArrayList<>(journal.getPhotos()));

        return dto;
    }
}
