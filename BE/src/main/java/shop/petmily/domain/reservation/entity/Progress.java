package shop.petmily.domain.reservation.entity;

import lombok.Getter;

public enum Progress {
    RESERVATION_REQUEST("예약 신청"),
    RESERVATION_CONFIRMED("예약 확정"),
    RESERVATION_CANCELLED("예약 취소"),
    FINISH_CARING("일정 종료");

    @Getter
    private String progress;

    Progress(String progress) {
        this.progress = progress;
    }
}
