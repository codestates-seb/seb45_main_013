package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.dto.PetResponseDto;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ReservationResponseDto {
    private long reservationId;

    private long memberId;

    private String name;

    private Date reservationDay;

    private Time reservationTimeStart;

    private Time reservationTimeEnd;

    private String location;

    private String phone;

    private String memberBody;

    private List<PetResponseDto> pets;

    private long petsitterId;

    private String petsitterName;

    private String petsitterPhone;

    private String petsitterBody;

    private String progress;

    private LocalDateTime createdAt;
    
    private LocalDateTime lastModifiedAt;
}
