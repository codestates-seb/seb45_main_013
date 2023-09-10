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
    private Long reviewId;

    private Long memberId;

    private Long reservationId;

    private Long petsitterId;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

    private List<String> photos;

    private String body;

    private Integer star;
}
