package shop.petmily.domain.review.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewPatchDto {
    private long reviewId;
    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    private long memberId;
    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    private long petSitterId;

    @Column(length = 10000, nullable = false)
    private String body;

    @Range(min = 1, max = 5)
    private int star;
}
