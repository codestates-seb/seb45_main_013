package shop.petmily.domain.reservation.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ReservationMultiResponseDto {
    private List<ReservationResponseDto> reservations;

    private ReservationPageInfo pageInfo;

    public ReservationMultiResponseDto(List<ReservationResponseDto> reservations, ReservationPageInfo pageInfo) {
        this.reservations = reservations;
        this.pageInfo = pageInfo;
    }
}
