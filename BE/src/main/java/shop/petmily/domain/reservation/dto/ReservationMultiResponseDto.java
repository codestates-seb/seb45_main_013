package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import shop.petmily.global.dto.PageInfo;

import java.util.List;

@Getter
public class ReservationMultiResponseDto {
    private List<ReservationResponseDto> reservations;

    private PageInfo pageInfo;

    public ReservationMultiResponseDto(List<ReservationResponseDto> reservations, PageInfo pageInfo) {
        this.reservations = reservations;
        this.pageInfo = pageInfo;
    }
}
