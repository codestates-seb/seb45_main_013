package shop.petmily.domain.review.Dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ReviewMultiResponseDto {
    private List<ReviewResponseDto> reviews;

    private ReviewPageInfo pageInfo;

    public ReviewMultiResponseDto(List<ReviewResponseDto> reviews, ReviewPageInfo pageInfo) {
        this.reviews = reviews;
        this.pageInfo = pageInfo;
    }
}
