package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.entity.Pet;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ReservationResponseDto {
    private long reservationId;
    private long memberId;
    private String name;
    private Timestamp reservationTimeStart;
    private Timestamp reservationTimeEnd;
    private String location;
    private String phone;
    private String body;
    private List<PetResponseDto> pets;
    private long petsitterId;
    private String petsitterName;
    private String petsitterPhone;
    private String progress;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
