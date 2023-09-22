package shop.petmily.domain.journal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.petmily.domain.journal.entity.Journal;
import shop.petmily.domain.reservation.entity.Reservation;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    Page<Journal> findByMember_MemberId(Long memberId, Pageable pageable);

    boolean existsByReservation(Reservation reservation);

    @Query("SELECT j.journalId FROM Journal j WHERE j.reservation.reservationId = :reservationId")
    Long findJournalIdByReservationId(Long reservationId);

}
