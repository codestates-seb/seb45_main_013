package shop.petmily.global.security.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import shop.petmily.domain.petsitter.entity.Petsitter;
import shop.petmily.domain.petsitter.service.PetsitterService;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import shop.petmily.domain.refreshToken.service.RefreshTokenService;
import shop.petmily.global.security.jwt.JwtTokenizer;
import shop.petmily.global.security.utils.CustomAuthorityUtils;

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
public class OAuth2PetsitterSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PetsitterService petsitterService;
    private final RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        String displayName = (String) oAuth2User.getAttributes().get("name");

        Petsitter petsitter = new Petsitter();
        petsitter.setName("이름입력필요");
        petsitter.setAddress("주소입력필요");
        petsitter.setPhone("핸드폰번호입력필요");
        petsitter.setPossiblePetType("케어가능한펫종류입력필요");
        petsitter.setPossibleDay("케어가능한요일입력필요");
        petsitter.setPossibleTimeStart("케어가능한시작시간입력필요");
        petsitter.setPossibleTimeEnd("케어가능한끝시간입력필요");
        petsitter.setPossibleLocation("케어가능한지역입력필요");
        petsitter.setPetSitter(true);
        petsitter.setDisplayName(displayName);
        petsitter.setEmail(email);
        petsitter.setPassword("google_OAuth2");
        petsitter.setCreateAt(LocalDateTime.now());
        petsitter.setLastModifiedAt(LocalDateTime.now());

        List<String> authorities = customAuthorityUtils.createRoles(petsitter);
        petsitter.setRoles(authorities);
        Petsitter savePetsitter = savePetsitter(petsitter);


        redirect(request, response, savePetsitter, authorities);
    }

    private Petsitter savePetsitter(Petsitter petsitter) {
        return petsitterService.createPetsitterOAuth2(petsitter);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Petsitter petsitter, List<String> authorities) throws IOException {

        String accessToken = delegateAccessToken(petsitter, authorities);
        String refreshToken = delegateRefreshToken(petsitter);

        String uri = createURI(request, accessToken, refreshToken).toString();

        String headerValue = "Bearer "+ accessToken;
        response.setHeader("Authorization",headerValue);
        response.setHeader("Refresh",refreshToken);

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setValue(refreshToken);
        refreshTokenEntity.setPetsitter(petsitter);
        refreshTokenService.addRefreshToken(refreshTokenEntity);

        getRedirectStrategy().sendRedirect(request,response,uri);

//        PetsitterDto.LoginResponse loginResponse = PetsitterDto.LoginResponse.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .petsitterId(petsitter.getPetsitterId())
//                .displayName(petsitter.getDisplayName())
//                .build();
//
//        String body = new Gson().toJson(loginResponse);
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write(body);

//        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
//                .httpOnly(true)
//                .secure(true)
//                .maxAge(TimeUnit.MINUTES.toSeconds(30))
//                .build();
//
//        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private String delegateAccessToken(Petsitter petsitter, List<String> authorities){

        Map<String,Object> claims = new HashMap<>();
        claims.put("username", petsitter.getEmail());
        claims.put("roles", petsitter.getRoles());
        claims.put("displayName", petsitter.getDisplayName());
        claims.put("id", petsitter.getPetsitterId());

        String subject = petsitter.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(Petsitter petsitter){
        String subject = petsitter.getEmail();
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
//                .host("petmily.shop")
                .host("localhost")
                .port(3000)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
