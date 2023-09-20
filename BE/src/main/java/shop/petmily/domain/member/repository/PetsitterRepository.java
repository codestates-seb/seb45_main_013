package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;

import java.util.List;
import java.util.Optional;

public interface PetsitterRepository extends JpaRepository<Petsitter, Long> {

    Optional<Petsitter> findByMember(Member member);

//    @Query("SELECT m FROM Member m WHERE m.petsitterBoolean = true")
        @Query("SELECT DISTINCT m FROM Member m " +
        "JOIN m.petsitter p " +
        "WHERE m.petsitterBoolean = true " +
        "AND p.possibleDay IS NOT NULL " +
        "AND p.possibleTimeStart IS NOT NULL " +
        "AND p.possibleTimeEnd IS NOT NULL " +
        "AND p.possiblePetType IS NOT NULL")
    List<Member> findAllMembersWithPetsitterBooleanTrue();
}
