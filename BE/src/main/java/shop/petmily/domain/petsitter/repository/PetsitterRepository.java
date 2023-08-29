package shop.petmily.domain.petsitter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.petsitter.entity.Petsitter;

import java.util.Optional;

public interface PetsitterRepository extends JpaRepository<Petsitter, Long> {

    Optional<Petsitter> findByEmail(String email);
}
