package shop.petmily.domain.reservation.dto;

import lombok.Getter;
import lombok.Setter;
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
    private List<Pet> pets;
    private String body;
    private long petSitterId;
    private String petSitterName;
    private String petSitterPhone;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
    private String progress;
}
