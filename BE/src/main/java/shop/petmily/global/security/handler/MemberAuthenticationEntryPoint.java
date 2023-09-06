package shop.petmily.global.security.handler;

import com.google.gson.Gson;
import shop.petmily.global.exception.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import shop.petmily.global.exception.ExceptionCode;
import shop.petmily.global.exception.ExceptionCode;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String exception = (String) request.getAttribute("exception");
//        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
//        logExceptionMessage(authException, exception);

//        String exception = (String) request.getAttribute("exception");

        if (exception == null) {
            log.error("entry point >> exception is null");
            setResponse(response, ExceptionCode.NOT_FOUND_TOKEN);
        }
        //잘못된 토큰인 경우
        else if(exception.equals(ExceptionCode.INVALID_TOKEN.getMessage())) {
            log.error("entry point >> invalid token");
            setResponse(response, ExceptionCode.INVALID_TOKEN);
        }
        //토큰 만료된 경우
        else if(exception.equals(ExceptionCode.EXPIRED_TOKEN.getMessage())) {
            log.error("entry point >> expired token");
            setResponse(response, ExceptionCode.EXPIRED_TOKEN);
        }
        //지원되지 않는 토큰인 경우
        else if(exception.equals(ExceptionCode.UNSUPPORTED_TOKEN.getMessage())) {
            log.error("entry point >> unsupported token");
            setResponse(response, ExceptionCode.UNSUPPORTED_TOKEN);
        }
        else if (exception.equals(ExceptionCode.NOT_FOUND_TOKEN.getMessage())) {
            log.error("entry point >> not found token");
            setResponse(response, ExceptionCode.NOT_FOUND_TOKEN);
        }
        else {
            setResponse(response, ExceptionCode.UNKNOWN_ERROR);
        }
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }

    private void setResponse(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        response.setContentType("application/json;charset:UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        HashMap<String, Object> errorInfo = new HashMap<>();
        errorInfo.put("status", exceptionCode.getStatus());
        errorInfo.put("message", exceptionCode.getMessage());
        Gson gson = new Gson();
        String responseJson = gson.toJson(errorInfo);
        response.getWriter().print(responseJson);
    }
}
