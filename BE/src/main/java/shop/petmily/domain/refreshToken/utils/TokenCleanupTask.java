package shop.petmily.domain.refreshToken.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import shop.petmily.domain.refreshToken.service.RefreshTokenService;

@Component
@RequiredArgsConstructor
public class TokenCleanupTask {

    private final RefreshTokenService refreshTokenService;

    @Scheduled(fixedRate = 60000) // 60초마다 실행 (단위: 밀리초)
    public void cleanupExpiredTokens() {
        // 만료된 토큰을 DB에서 삭제
        refreshTokenService.deleteExpiredTokens();
    }
}