package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.petmily.domain.member.entity.Customer;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface PetsitterRepository extends JpaRepository<Petsitter, Long> {

    Optional<Petsitter> findByMember(Member member);

    @Query(value = "SELECT DISTINCT p " +
            "FROM Petsitter p " +
            "JOIN p.possibleLocation pl " +
            "WHERE INSTR(p.possibleDay, ?1) > 0 " +
            "AND (p.possiblePetType = ?2 OR p.possiblePetType = 'PET_ALL') " +
            "AND ?3 MEMBER OF pl " +
            "AND p.possibleTimeStart <= ?4 " +
            "AND p.possibleTimeEnd >= ?5 " +
            "AND NOT EXISTS (" +
            "   SELECT 1 " +
            "   FROM Reservation r " +
            "   WHERE r.petsitter = p " +
            "   AND r.reservationDay = ?6 " +
            "   AND r.reservationTimeStart <= ?5 " +
            "   AND r.reservationTimeEnd >= ?4 " +
            "   AND r.progress != 'RESERVATION_CANCELLED' )")
    List<Petsitter> findPossiblePetsitter(String possibleDay,
                                          Petsitter.PossiblePetType possiblePetType,
                                          String possibleLocation,
                                          LocalTime reservationTimeStart,
                                          LocalTime reservationTimeEnd,
                                          LocalDate resrtvationDay);

    @Query("SELECT m FROM Member m WHERE m.petsitterBoolean = true")
    List<Member> findAllMembersWithPetsitterBooleanTrue();
}
