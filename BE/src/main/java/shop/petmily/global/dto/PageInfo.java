package shop.petmily.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfo {
    private int page;
    private int size;
    // 총 케어일지 수
    private int totalElements;
    // 총 페이지 수
    private int totalPages;
}
