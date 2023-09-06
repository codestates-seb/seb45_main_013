package shop.petmily.domain.pet.dto;

import lombok.Getter;
import shop.petmily.domain.pet.entity.Pet;

@Getter
public class PetPostDto {

    private long memberId;

    public void setMemberId(long memberId) {this.memberId = memberId;}

    private Pet.PetType type;

    private String name;

    private int age;

    private String species;

    private int weight;

    private String body;

    private Boolean male;

    private Boolean neutering;

}
