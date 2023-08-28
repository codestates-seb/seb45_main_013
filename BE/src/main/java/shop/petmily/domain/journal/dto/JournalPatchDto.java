package shop.petmily.domain.journal.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JournalPatchDto {
    private long journalId;
    public void setJournalId(long journalId) {
        this.journalId = journalId;
    }

    private long memberId;

    private long petSitterId;

    public void setPetSitterId(long petSitterId) {
        this.petSitterId = petSitterId;
    }

    @Column(length = 10000, nullable = false)
    private String body;
}
