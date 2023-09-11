package shop.petmily.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Petsitter;

import java.sql.Time;
import java.time.LocalTime;

@Getter
@Setter
@Builder
public class PetsitterPossibleResoponseDto {
    private Long petsitterId;
    private Petsitter.PossiblePetType possiblePetType;
    private String possibleLocation;
    private String possibleDay;
    private LocalTime possibleTimeStart;
    private LocalTime possibleTimeEnd;
    private double star;
    private Integer reviewCount;
    private Long monthTotalReservationCount;
    private Long thisWeekReservationCount;
    private Long todayReservationCount;
    private Long confirmedReservationCount;
    private Long requestReservationCount;
//    private Long cancelledReservationCount;
//    private Long finishCaringReservationCount;
}
