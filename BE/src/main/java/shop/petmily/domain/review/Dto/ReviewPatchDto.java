package shop.petmily.domain.review.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class ReviewPatchDto {
    private Long reviewId;
    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    private Long memberId;
    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    private String body;

    @Range(min = 1, max = 5)
    private Integer star;

    private List<String> photos;
}
