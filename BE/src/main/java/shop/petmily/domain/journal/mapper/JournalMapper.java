package shop.petmily.domain.journal.mapper;

import shop.petmily.domain.journal.dto.JournalPatchDto;
import shop.petmily.domain.journal.dto.JournalPostDto;
import shop.petmily.domain.journal.dto.JournalResponseDto;
import shop.petmily.domain.journal.entity.Journal;

public interface JournalMapper {
    Journal JournalPostDtoToJournal(JournalPostDto journalPostDto);

    JournalResponseDto JournalToResponse(Journal journal);

    Journal JournalPatchDtoToJournal(JournalPatchDto journalPatchDto);
}
