package shop.petmily.domain.journal.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.journal.dto.JournalPatchDto;
import shop.petmily.domain.journal.dto.JournalPostDto;
import shop.petmily.domain.journal.dto.JournalResponseDto;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.reservation.entity.ReservationPet;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "Spring")
public interface JournalMapper {

    @Mapping(source = "petsitterId", target = "petsitter.petsitterId")
    @Mapping(source = "reservationId", target = "reservation.reservationId")
    Journal JournalPostDtoToJournal(JournalPostDto journalPostDto);

    @Mapping(source = "petsitterId", target = "petsitter.petsitterId")
    Journal JournalPatchDtoToJournal(JournalPatchDto journalPatchDto);

    default JournalResponseDto JournalToResponse(Journal journal) {
        JournalResponseDto response = new JournalResponseDto();
        response.setJournalId(journal.getJournalId());
        response.setReservationId(journal.getReservation().getReservationId());
        response.setPetsitterId(journal.getPetsitter().getPetsitterId());
        response.setMemberId(journal.getMember().getMemberId());

        response.setCreatedAt(journal.getCreatedAt());
        response.setLastModifiedAt(journal.getLastModifiedAt());
        response.setBody(journal.getBody());
        response.setPhotos(journal.getPhotos());
        response.setPetsitterName(journal.getReservation().getPetsitter().getMember().getName());
        response.setPetsitterPhoto(journal.getReservation().getPetsitter().getMember().getPhoto());

        List<String> petNames = new ArrayList<>();
        List<String> petPhotos = new ArrayList<>();

        for (ReservationPet reservationPet : journal.getReservation().getReservationPets()) {
            Pet pet = reservationPet.getPet();
            petNames.add(pet.getName());
                petPhotos.add(pet.getPhoto());
        }

        response.setPetNames(petNames);
        response.setPetPhotos(petPhotos);

        return response;
    }

}
