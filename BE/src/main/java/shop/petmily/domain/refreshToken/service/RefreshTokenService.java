package shop.petmily.domain.refreshToken.service;

import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.petsitter.entity.Petsitter;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import shop.petmily.domain.refreshToken.repository.RefreshTokenRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public RefreshToken addRefreshToken(RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public void deleteRefreshToken(String refreshToken) {
        refreshTokenRepository.findByValue(refreshToken).ifPresent(refreshTokenRepository::delete);
    }

    @Transactional(readOnly = true)
    public Optional<RefreshToken> findRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByValue(refreshToken);
    }

    @Transactional(readOnly = true)
    public RefreshToken findRefreshToken(Member member) {
        return refreshTokenRepository.findByMember(member).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public RefreshToken findRefreshToken(Petsitter petsitter) {
        return refreshTokenRepository.findByPetsitter(petsitter).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));
    }
}