package shop.petmily.domain.journal.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class JournalMultiResponseDto {
    private List<JournalResponseDto> journals;

    private JournalPageInfo pageInfo;

    public JournalMultiResponseDto(List<JournalResponseDto> journals, JournalPageInfo pageInfo) {
        this.journals = journals;
        this.pageInfo = pageInfo;
    }
}
