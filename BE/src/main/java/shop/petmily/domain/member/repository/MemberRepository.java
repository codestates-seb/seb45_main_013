package shop.petmily.domain.member.repository;

import shop.petmily.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(long memberId);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickName(String nickName);
    Optional<Member> findByPhone(String phone);
    Optional<Member> findByPhoto(String photo);

    Member findByEmailAndName(String email, String name);
}
