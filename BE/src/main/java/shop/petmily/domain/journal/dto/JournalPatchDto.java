package shop.petmily.domain.journal.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JournalPatchDto {
    private long journalId;
    public void setJournalId(long journalId) {
        this.journalId = journalId;
    }

    private long petsitterId;
    public void setPetsitterId(long petsitterId) {
        this.petsitterId = petsitterId;
    }

    private String body;

    private List<String> photos;
}
