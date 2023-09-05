package shop.petmily.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.petmily.domain.member.entity.Customer;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface PetsitterRepository extends JpaRepository<Petsitter, Long> {

    Optional<Petsitter> findByMember(Member member);

    @Query(value = "SELECT * FROM petsitter WHERE INSTR(possible_day, ?1) > 0", nativeQuery = true)
    List<Petsitter> findByPossibleDayContaining(String keyword);


    @Query(value = "SELECT * FROM petsitter WHERE INSTR(possible_day, ?1) > 0 AND possible_location = ?2", nativeQuery = true)
    List<Petsitter> findByPossibleDayAndLocationContaining(String possibleDay, String possibleLocation);

    @Query(value = "SELECT * FROM petsitter WHERE INSTR(possible_day, ?1) > 0 " +
            "AND possible_pet_type = ?2 " +
            "AND possible_location LIKE %?3%  " +
            "AND possible_time_start <= ?4 " +
            "AND possible_time_end >= ?5 " +
            "AND NOT EXISTS (" +
            "   SELECT 1 " +
            "   FROM reservation " +
            "   WHERE reservation.petsitter_id = petsitter.petsitter_id " +
            "   AND reservation.reservation_day = ?6 " +
            "   AND reservation.reservation_time_start <= ?5 " +
            "   AND reservation.reservation_time_end >= ?4 " +
            "   AND reservation.progress != 'BEFORE_PETSITTER_SELECTION' " +
            "   AND reservation.progress != 'RESERVATION_CANCELLED' )", nativeQuery = true)
    List<Petsitter> findPossiblePetsitter(String possibleDay,
                                          String possiblePetType,
                                          String possibleLocation,
                                          LocalTime reservationTimeStart,
                                          LocalTime reservationTimeEnd,
                                          Date resrtvationDay);

    @Query("SELECT m FROM Member m WHERE m.petsitterBoolean = true")
    List<Member> findAllMembersWithPetsitterBooleanTrue();
}
