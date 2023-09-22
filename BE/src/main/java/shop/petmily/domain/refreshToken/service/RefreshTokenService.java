package shop.petmily.domain.refreshToken.service;

import io.jsonwebtoken.Claims;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import shop.petmily.domain.refreshToken.repository.RefreshTokenRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public RefreshToken addRefreshToken(RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }

//    @Transactional
//    public void deleteRefreshToken(String refreshToken) {
//        refreshTokenRepository.findByValue(refreshToken).ifPresent(refreshTokenRepository::delete);
//    }
    @Transactional
    public void deleteRefreshToken(Member member) {
        refreshTokenRepository.delete(findRefreshToken(member));
    }

    @Transactional(readOnly = true)
    public Optional<RefreshToken> findRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByValue(refreshToken);
    }

    @Transactional(readOnly = true)
    public RefreshToken findRefreshToken(Member member) {
        return refreshTokenRepository.findByMember(member);
    }

    public void deleteExpiredTokens() {
        Date now = new Date();
        List<RefreshToken> expiredTokens = refreshTokenRepository.findByExpirationDateBefore(now);
        refreshTokenRepository.deleteAll(expiredTokens);
    }

    public void createRefreshTokenEntity(Member member, String refreshToken, Claims claims) {
        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setValue(refreshToken);
        refreshTokenEntity.setMember(member);
        refreshTokenEntity.setExpirationDate(claims.getExpiration());
        refreshTokenRepository.save(refreshTokenEntity);
    }


}