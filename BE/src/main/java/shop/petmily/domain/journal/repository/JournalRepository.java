package shop.petmily.domain.journal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.journal.entity.Journal;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    Page<Journal> findByReservation_Member_MemberId(Long memberId, Pageable pageable);
}
