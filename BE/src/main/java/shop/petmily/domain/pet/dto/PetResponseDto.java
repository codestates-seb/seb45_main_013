package shop.petmily.domain.pet.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.entity.Pet;

import java.time.LocalDateTime;

@Setter
@Getter
public class PetResponseDto {
    private long petId;

    private long memberId;

    private Pet.PetType type;

    private String name;

    private int age;

    private String species;

    private int weight;

    private String photo;

    private String body;

    private Boolean male;

    private Boolean neutering;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;
}
