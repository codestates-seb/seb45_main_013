package shop.petmily.domain.pet.dto;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.entity.Pet;

public class PetDetailsDto {

    @Getter
    @Setter
    public static class Response {
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
    }
}
