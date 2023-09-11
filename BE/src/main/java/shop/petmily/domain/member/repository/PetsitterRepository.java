package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;

import java.util.List;
import java.util.Optional;

public interface PetsitterRepository extends JpaRepository<Petsitter, Long> {

    Optional<Petsitter> findByMember(Member member);

    @Query("SELECT m FROM Member m WHERE m.petsitterBoolean = true")
    List<Member> findAllMembersWithPetsitterBooleanTrue();
}
