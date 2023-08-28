package shop.petmily.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReservationPageInfo {
    private int page;
    private int size;
    // 총 예약 수
    private int totalElements;
    // 총 페이지 수
    private int totalPages;
}
