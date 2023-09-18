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

    private String memberNickName;

    private String memberPhoto;

    private Long reservationId;

    private List<String> petNames;

    private List<String> petPhotos;

    private List<String> reviewPhotos;

    private String body;

    private Long petsitterId;

    private String petsitterName;

    private String petsitterPhoto;

    private Integer star;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

}
