package shop.petmily.domain.journal.dto;

import lombok.Getter;
import shop.petmily.global.dto.PageInfo;

import java.util.List;

@Getter
public class JournalMultiResponseDto {
    private List<JournalResponseDto> journals;

    private PageInfo pageInfo;

    public JournalMultiResponseDto(List<JournalResponseDto> journals, PageInfo pageInfo) {
        this.journals = journals;
        this.pageInfo = pageInfo;
    }
}
