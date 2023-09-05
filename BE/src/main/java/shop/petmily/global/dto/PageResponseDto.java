package shop.petmily.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@AllArgsConstructor
public class PageResponseDto {

    private Object data;

    private PageInfo pageInfo;

    @Data
    @AllArgsConstructor
    static public class PageInfo {
        private int page;
        private int size;
        private Long totalElements;
        private int totalPages;
    }

    public static PageResponseDto of(Object list, Page page) {
        PageInfo pageInfoResponse = new PageInfo(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );
        return new PageResponseDto(list,pageInfoResponse);
    }
}
