package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.petmily.domain.member.entity.Customer;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;

import java.util.List;
import java.util.Optional;

public interface PetsitterRepository extends JpaRepository<Petsitter, Long> {

    Optional<Petsitter> findByMember(Member member);

    @Query(value = "SELECT * FROM petsitter WHERE INSTR(possible_day, ?1) > 0", nativeQuery = true)
    List<Petsitter> findByPossibleDayContaining(String keyword);
}
