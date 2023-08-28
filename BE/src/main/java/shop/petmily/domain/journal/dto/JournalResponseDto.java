package shop.petmily.domain.journal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JournalResponseDto {
    private long journalId;

    private long reservationId;

    private long petSitterId;

    private long memberId;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

    private String body;

}
