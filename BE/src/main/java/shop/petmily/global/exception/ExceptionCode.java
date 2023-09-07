package shop.petmily.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "존재하지 않는 회원입니다."),
    MEMBER_EXISTS(409, "존재하는 회원입니다."),
    MEMBER_NOT_MODIFY(403, "수정권한이 없습니다."),
    PETSITTER_NOT_FOUND(404, "존재하지 않는 펫시터입니다."),
    PETSITTER_EXISTS(409, "존재하는 펫시터입니다."),
    INVALID_EMAIL_FORMAT("email" ,400, "이메일 형식에 맞지 않습니다."),
    INVALID_PASSWORD_FORMAT("password", 400, "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다."),
    LOGIN_FAIL(400, "이메일 또는 비밀번호가 일치하지 않습니다."),
    NOT_IMPLEMENTATION(501, "구현되지 않은 기능입니다."),
    INVALID_MEMBER_STATUS(400, "잘못된 회원 상태입니다."),
    NOT_ALLOW_MEMBER(401, "올바른 회원이 아닙니다."),
    UNKNOWN_ERROR(500, "예기치 않은 에러입니다."),
    NOT_FOUND_TOKEN(400, "Headers에 토큰 형식의 값 찾을 수 없습니다."),
    INVALID_TOKEN(401, "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(401, "기간이 만료된 토큰입니다."),
    UNSUPPORTED_TOKEN(401, "지원하지 않는 토큰입니다."),
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
    REVIEW_ALREADY_EXISTS(400, "이미 해당 예약에 후기가 존재합니다" ),
    NOT_MY_PET(400, "올바른 보호자와 반려동물이 아닙니다." ),
    BEFORE_FINISH_CARING(400,"일정이 아직 끝나지 않았습니다" );


    @Getter
    private int status;

    @Getter
    private String message;

    @Getter
    private String field;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

    ExceptionCode(String field, int code, String message) {
        this.field = field;
        this.status = code;
        this.message = message;
    }
}
