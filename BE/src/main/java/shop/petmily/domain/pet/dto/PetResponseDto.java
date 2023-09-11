package shop.petmily.domain.pet.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.entity.Pet;

import java.time.LocalDateTime;

@Setter
@Getter
public class PetResponseDto {
    private Long petId;

    private Long memberId;

    private Pet.PetType type;

    private String name;

    private Integer age;

    private String species;

    private Integer weight;

    private String photo;

    private String body;

    private Boolean male;

    private Boolean neutering;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;
}
