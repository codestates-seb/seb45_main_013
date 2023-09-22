package shop.petmily.domain.reservation.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Page<Reservation> findByMember(Member member, PageRequest pageRequest);

    Page<Reservation> findByMemberAndProgressIn(Member member, List<Progress> progressList, PageRequest pageRequest);

    Page<Reservation> findByMemberAndProgressNotIn(Member member, List<Progress> progressList, PageRequest pageRequest);

    Page<Reservation> findByPetsitter(Petsitter petsitter, PageRequest pageRequest);

    Page<Reservation> findByPetsitterAndProgressIn(Petsitter petsitter, List<Progress> progressList, PageRequest pageRequest);

    Page<Reservation> findByPetsitterAndProgressNotIn(Petsitter petsitter, List<Progress> progressList, PageRequest pageRequest);

    List<Reservation> findByPetsitter(Petsitter petsitter);
}
