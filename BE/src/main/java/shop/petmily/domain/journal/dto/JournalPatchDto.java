package shop.petmily.domain.journal.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class JournalPatchDto {
    private Long journalId;
    public void setJournalId(long journalId) {
        this.journalId = journalId;
    }

    private Long petsitterId;
    public void setPetsitterId(long petsitterId) {
        this.petsitterId = petsitterId;
    }

    private String body;

    private List<String> photos;

    private List<MultipartFile> file;
}
