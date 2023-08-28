package shop.petmily.domain.review.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewPageInfo {
    private int page;
    private int size;
    // 총 후기 수
    private int totalElements;
    // 총 페이지 수
    private int totalPages;
}
