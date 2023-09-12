package shop.petmily.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import shop.petmily.domain.reservation.entity.Progress;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class ScheduledPetsitterReservationDto {
    private Long reservationId;

    private LocalDate reservationDate;

    private LocalTime reservationTimeStart;

    private LocalTime reservationTimeEnd;

    private Progress progress;
}
