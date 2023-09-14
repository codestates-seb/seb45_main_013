package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import shop.petmily.global.dto.PageInfo;

import java.util.List;


public class ReservationMultiDto {

    @Getter
    public static class MemberResponse {
        private List<ReservationsDto.MemberResponse> reservations;

        private PageInfo pageInfo;

        public MemberResponse(List<ReservationsDto.MemberResponse> reservations, PageInfo pageInfo) {
            this.reservations = reservations;
            this.pageInfo = pageInfo;
        }
    }

    @Getter
    public static class PetsitterResponse {
        private List<ReservationsDto.PetsitterResponse> reservations;

        private PageInfo pageInfo;

        public PetsitterResponse(List<ReservationsDto.PetsitterResponse> reservations, PageInfo pageInfo) {
            this.reservations = reservations;
            this.pageInfo = pageInfo;
        }
    }
}
