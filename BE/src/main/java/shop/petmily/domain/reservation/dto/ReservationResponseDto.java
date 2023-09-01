package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.entity.Pet;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ReservationResponseDto {
    private long reservationId;
    private long memberId;
    private String name;
    private String reservationTimeStart;
    private String reservationTimeEnd;
    private String location;
    private String phone;
    private String body;
    private long petsitterId;
    private String petsitterName;
    private String petsitterPhone;
    private List<PetResponseDto> pets;
    private String progress;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
