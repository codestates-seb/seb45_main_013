package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.reservation.entity.Progress;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ReservationResponseDto {
    private Long reservationId;

    private Long memberId;

    private String name;

    private LocalDate reservationDay;

    private LocalTime reservationTimeStart;

    private LocalTime reservationTimeEnd;

    private String location;

    private String phone;

    private String memberBody;

    private List<PetResponseDto> pets;

    private Long petsitterId;

    private String petsitterName;

    private String petsitterPhone;

    private String petsitterBody;

    private Progress progress;

    private LocalDateTime createdAt;
    
    private LocalDateTime lastModifiedAt;
}

