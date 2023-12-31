package shop.petmily.global.security.handler;

import io.jsonwebtoken.Claims;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import shop.petmily.domain.refreshToken.service.RefreshTokenService;
import shop.petmily.global.security.jwt.JwtTokenizer;
import shop.petmily.global.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        String nickName = (String) oAuth2User.getAttributes().get("name");

        Member member = new Member();
        member.setName(nickName);
        member.setNickName(nickName);
        member.setEmail(email);
        member.setPetsitterBoolean(null);
        member.setPassword("google_OAuth2");
        Member saveMember = saveMember(member);

        List<String> authorities = customAuthorityUtils.createRoles(member);

        redirect(request, response, saveMember, authorities);
    }

    private Member saveMember(Member member) {
        return memberService.createMemberOAuth2(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {

        String accessToken = delegateAccessToken(member, authorities);
        String refreshToken = delegateRefreshToken(member);

        Claims claims = jwtTokenizer.parseRefreshToken(refreshToken);

        String uri = createURI(request, accessToken, refreshToken).toString();

        String headerValue = "Bearer "+ accessToken;
        response.setHeader("Authorization",headerValue);
        response.setHeader("Refresh",refreshToken);

        if (refreshTokenService.findRefreshToken(member) != null) refreshTokenService.deleteRefreshToken(member);
        refreshTokenService.createRefreshTokenEntity(member, refreshToken, claims);

        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private String delegateAccessToken(Member member, List<String> authorities){

        Map<String,Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
//        claims.put("nickName", member.getNickName());
        claims.put("id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        String serverName = request.getServerName();

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("petmily.shop")
//                .host("localhost")
//                .port(3000)
                .path("/signup/branch")
//                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
