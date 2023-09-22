package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.member.entity.Customer;
import shop.petmily.domain.member.entity.Member;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByMember(Member member);
}
