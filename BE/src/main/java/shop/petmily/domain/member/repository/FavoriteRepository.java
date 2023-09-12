package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.MemberFavoritePetsitter;
import shop.petmily.domain.member.entity.Petsitter;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<MemberFavoritePetsitter, Long> {
    MemberFavoritePetsitter findByMemberAndPetsitter(Member member, Petsitter petsitter);
    List<MemberFavoritePetsitter> findByMember(Member member);
}
