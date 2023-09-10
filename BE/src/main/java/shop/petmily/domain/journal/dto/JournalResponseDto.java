package shop.petmily.domain.journal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JournalResponseDto {
    private Long journalId;

    private Long reservationId;

    private Long petsitterId;

    private Long memberId;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

    private String body;

    private List<String> photos;

}
