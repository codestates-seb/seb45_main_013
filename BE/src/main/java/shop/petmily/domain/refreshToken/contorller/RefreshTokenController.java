package shop.petmily.domain.refreshToken.contorller;

import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.dto.MemberLoginDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.repository.MemberRepository;
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
import shop.petmily.global.security.utils.CustomAuthorityUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/refreshToken")
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;
    private final CustomAuthorityUtils customAuthorityUtils;


    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/petsitterToken") // member에서 petsitter로 토큰 변경
    public ResponseEntity requestPetsitterToken(@RequestHeader("Refresh") String requestHeader) {
        refreshTokenService.findRefreshToken(requestHeader).orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVALID_TOKEN));

        Claims refreshClaims = jwtTokenizer.parseRefreshToken(requestHeader);
        Member member = memberService.findMember(refreshClaims.get("sub").toString());
        member.setRoles(customAuthorityUtils.chageRoles(member));
        member.setPetsitterBoolean(true);

        memberService.updatePetsitterBoolean(member);

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer" + accessToken);

        MemberLoginDto.LoginResponse loginResponse = MemberLoginDto.LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(requestHeader)
                .memberId(member.getMemberId())
                .build();

        return ResponseEntity.ok().headers(headers).body(loginResponse);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping // refreshToken으로 accessToken 재발급
    public ResponseEntity requestRefresh(@RequestHeader("Refresh") String requestHeader) {
        refreshTokenService.findRefreshToken(requestHeader).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_TOKEN));

        Claims refreshClaims = jwtTokenizer.parseRefreshToken(requestHeader);
        Member member = memberService.findMember(refreshClaims.get("sub").toString());

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
//        claims.put("nickName", member.getNickName());
        claims.put("id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer" + accessToken);

        MemberLoginDto.LoginResponse loginResponse = MemberLoginDto.LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(requestHeader)
                .memberId(member.getMemberId())
//                .nickName(member.getNickName())
                .build();

        return ResponseEntity.ok().headers(headers).body(loginResponse);
    }
}
