package shop.petmily.global.exception;

import lombok.Getter;

public enum JwtExceptionCode {
    UNKNOWN_ERROR(401, "UNKNOWN_ERROR"),
    NOT_FOUND_TOKEN(401, "Headers에 토큰 형식의 값 찾을 수 없음"),
    INVALID_TOKEN(401, "유효하지 않은 토큰"),
    EXPIRED_TOKEN(401, "기간이 만료된 토큰"),
    UNSUPPORTED_TOKEN(401, "지원하지 않는 토큰");


    @Getter
    private int status;

    @Getter
    private String message;

    JwtExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
