package shop.petmily.domain.pet.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class PetResponseDto {
    private long petId;

    private long memberId;

    private String type;

    private String name;

    private int age;

    private String species;

    private int weight;

    private String photo;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;
}
