package shop.petmily.domain.refreshToken.contorller;

import shop.petmily.domain.member.dto.MemberDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.refreshToken.service.RefreshTokenService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;
import shop.petmily.global.security.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/refreshToken")
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping // refreshToken으로 accessToken 재발급
    public ResponseEntity requestRefresh(@RequestHeader("Refresh") String requestHeader) {
        refreshTokenService.findRefreshToken(requestHeader).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));

        Claims refreshClaims = jwtTokenizer.parseRefreshToken(requestHeader);
        Member member = memberService.findMember(refreshClaims.get("sub").toString());

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("displayName", member.getDisplayName());
        claims.put("id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer" + accessToken);

        MemberDto.LoginResponse loginResponse = MemberDto.LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(requestHeader)
                .memberId(member.getMemberId())
                .displayName(member.getDisplayName())
                .build();

        return ResponseEntity.ok().headers(headers).body(loginResponse);
    }
}
