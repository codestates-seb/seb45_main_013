package shop.petmily.domain.pet.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class PetPostDto {

    private long memberId;

    public void setMemberId(long memberId) {this.memberId = memberId;}

    private String type;

    private String name;

    private int age;

    private String species;

    private int weight;
}
