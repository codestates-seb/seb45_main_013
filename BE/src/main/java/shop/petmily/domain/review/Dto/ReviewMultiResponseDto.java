package shop.petmily.domain.review.Dto;

import lombok.Getter;
import shop.petmily.global.dto.PageInfo;

import java.util.List;

@Getter
public class ReviewMultiResponseDto {
    private List<ReviewResponseDto> reviews;

    private PageInfo pageInfo;

    public ReviewMultiResponseDto(List<ReviewResponseDto> reviews, PageInfo pageInfo) {
        this.reviews = reviews;
        this.pageInfo = pageInfo;
    }
}
