package shop.petmily.domain.review.Dto;

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
public class ReviewResponseDto {
    private long reviewId;

    private long memberId;

    private long reservationId;

    private long petSitterId;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

    private List<String> photos;

    private String body;

    private int star;
}
