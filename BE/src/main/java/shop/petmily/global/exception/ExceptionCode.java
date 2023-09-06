package shop.petmily.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "존재하지 않는 회원입니다."),
    MEMBER_EXISTS(409, "존재하는 회원입니다."),
    MEMBER_NOT_MODIFY(400, "수정권한이 없습니다."),
    PETSITTER_NOT_FOUND(404, "존재하지 않는 펫시터입니다."),
    PETSITTER_EXISTS(409, "존재하는 펫시터입니다."),
    INVALID_EMAIL_FORMAT(400, "이메일 형식에 맞지 않습니다."),
    INVALID_PASSWORD_FORMAT(400, "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다."),
    LOGIN_FAIL(400, "이메일 또는 비밀번호가 일치하지 않습니다."),
    NOT_IMPLEMENTATION(501, "구현되지 않은 기능입니다."),
    INVALID_MEMBER_STATUS(400, "잘못된 회원 상태입니다."),
    NOT_ALLOW_MEMBER(401, "올바른 회원이 아닙니다."),
    TOKEN_NOT_FOUND(404, "토큰이 존재하지 않습니다."),
    RESERVATION_NOT_EXIST(404, "존재하지 않는 예약정보입니다."),
    JOURNAL_NOT_EXIST(404, "존재하지 않는 펫시터 일지입니다."),
    REVIEW_NOT_EXIST(404, "존재하지 않는 리뷰 입니다."),
    PET_NOT_EXIST(404,"존재하지 않는 펫 입니다."),
    TIME_REQUEST_NOT_ALLOWED(400,"올바르지 않은 시간요청입니다."),
    NOT_STATUS_CONFIRM(400, "예약확정 가능한 상태가 아닙니다."),
    NOT_STATUS_CANCEL(400,"예약취소 가능한 상태가 아닙니다."),
    WARNING(400, "잘못된 접근입니다."),
    NOT_ALLOW_ADDRESS(400,"올바른 주소가 아닙니다."),
    JOURNAL_ALREADY_EXISTS(400, "이미 해당 예약에 케어일지가 존재합니다" ),
    REVIEW_ALREADY_EXISTS(400, "이미 해당 예약에 후기가 존재합니다" );

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
