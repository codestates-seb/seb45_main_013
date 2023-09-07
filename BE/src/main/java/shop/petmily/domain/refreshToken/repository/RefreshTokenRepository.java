package shop.petmily.domain.refreshToken.repository;

import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByValue(String value);
    Optional<RefreshToken> findByMember(Member member);
    List<RefreshToken> findByExpirationDateBefore(Date now);
    void deleteByExpirationDateBefore(Date now);

}