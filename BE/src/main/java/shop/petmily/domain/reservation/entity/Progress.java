package shop.petmily.domain.reservation.entity;

import lombok.Getter;

public enum Progress {
    CONTINUE_RESERVATION("예약 이어하기"),
    RESERVATION_REQUEST("예약 신청"),
    RESERVATION_CONFIRMED("예약 확정"),
    RESERVATION_CANCELLED("예약 취소"),
    WRITE_JOURNAL("케어일지 작성하기"),
    VIEW_JOURNAL("케어일지 보기"),
    EDIT_JOURNAL("케어일지 수정하기"),
    DELETE_JOURNAL("케어일지 삭제하기"),
    WRITE_REVIEW("후기 작성하기"),
    EDIT_REVIEW("후기 수정하기")
    ;
    @Getter
    private String progress;

    Progress(String progress) {
        this.progress = progress;
    }
}
