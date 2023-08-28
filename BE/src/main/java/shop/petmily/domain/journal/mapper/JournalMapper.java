package shop.petmily.domain.journal.mapper;

import org.mapstruct.Mapper;
import shop.petmily.domain.journal.dto.JournalPatchDto;
import shop.petmily.domain.journal.dto.JournalPostDto;
import shop.petmily.domain.journal.dto.JournalResponseDto;
import shop.petmily.domain.journal.entity.Journal;

@Mapper(componentModel = "Spring")
public interface JournalMapper {
    Journal JournalPostDtoToJournal(JournalPostDto journalPostDto);

    JournalResponseDto JournalToResponse(Journal journal);

    Journal JournalPatchDtoToJournal(JournalPatchDto journalPatchDto);
}
