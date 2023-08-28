package shop.petmily.domain.review.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {
    private long reviewId;

    private long memberId;

    private long reservationId;

    private long petSitterId;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

    private String body;

    private int star;
}
