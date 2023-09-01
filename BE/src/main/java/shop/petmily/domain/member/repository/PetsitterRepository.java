package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.member.entity.Customer;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;

import java.util.Optional;

public interface PetsitterRepository extends JpaRepository<Petsitter, Long> {

    Optional<Petsitter> findByMember(Member member);
}
