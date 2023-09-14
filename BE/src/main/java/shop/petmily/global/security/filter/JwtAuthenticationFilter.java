package shop.petmily.global.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import io.jsonwebtoken.Claims;
import shop.petmily.domain.member.dto.MemberLoginDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import shop.petmily.domain.refreshToken.service.RefreshTokenService;
import shop.petmily.global.exception.ExceptionCode;
import shop.petmily.global.exception.ErrorResponse;
import shop.petmily.global.security.dto.LoginDto;
import shop.petmily.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static shop.petmily.global.security.utils.AuthenticationUtils.isValidPassword;
import static shop.petmily.global.security.utils.AuthenticationUtils.isValidEmail;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenService refreshTokenService;

    // 인증 시도
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        boolean isValidEmail = isValidEmail(loginDto.getEmail());
        boolean isValidPassword = isValidPassword(loginDto.getPassword());

        List<ErrorResponse> errorResponses = new ArrayList<>();

        if (!isValidEmail) {
            ErrorResponse emailErrorResponse = ErrorResponse.of(ExceptionCode.INVALID_EMAIL_FORMAT);
            errorResponses.add(emailErrorResponse);
        }

        if (!isValidPassword) {
            ErrorResponse passwordErrorResponse = ErrorResponse.of(ExceptionCode.INVALID_PASSWORD_FORMAT);
            errorResponses.add(passwordErrorResponse);
        }

        if (!errorResponses.isEmpty()) {
            Gson gson = new Gson();
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            response.getWriter().write(gson.toJson(errorResponses));
            return null;
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        return authenticationManager.authenticate(authenticationToken);
    }

    // 인증 성공시
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        Claims claims = jwtTokenizer.parseRefreshToken(refreshToken);

        response.setHeader("Authorization", "Bearer" + accessToken);
        response.setHeader("Refresh", refreshToken);

        if (refreshTokenService.findRefreshToken(member) != null) refreshTokenService.deleteRefreshToken(member);

        refreshTokenService.createRefreshTokenEntity(member, refreshToken, claims);

        MemberLoginDto.LoginResponse loginResponse = MemberLoginDto.LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        String body = new Gson().toJson(loginResponse);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(body);

    }

    // Access Token 생성 로직
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        return accessToken;
    }

    // Refresh Token 생성 로직
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base63EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,base63EncodedSecretKey);
        return refreshToken;
    }
}
