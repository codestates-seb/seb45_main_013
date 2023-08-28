package shop.petmily.domain.pet.dto;

import lombok.Getter;

@Getter
public class PetPatchDto {
    private long petId;

    public void setPetId(long petId) {this.petId = petId;}

    private int age;

    private int weight;
}
