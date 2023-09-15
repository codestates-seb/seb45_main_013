package shop.petmily.domain.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.pet.entity.Pet;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findByMemberAndActive(Member member, Boolean active);
}
