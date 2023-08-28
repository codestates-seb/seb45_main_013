package shop.petmily.domain.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.pet.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
