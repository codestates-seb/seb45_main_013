package shop.petmily.domain.refreshToken.repository;

import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.petsitter.entity.Petsitter;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByValue(String value);
    Optional<RefreshToken> findByMember(Member member);
    Optional<RefreshToken> findByPetsitter(Petsitter petsitter);
}