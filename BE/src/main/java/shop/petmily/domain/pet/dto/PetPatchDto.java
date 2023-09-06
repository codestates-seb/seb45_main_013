package shop.petmily.domain.pet.dto;

import lombok.Getter;

@Getter
public class PetPatchDto {
    private long petId;

    public void setPetId(long petId) {this.petId = petId;}

    private long memberId;

    public void setMemberId(long memberId) {this.memberId = memberId;}

    private int age;

    private int weight;

    private String body;

    private String name;

    private Boolean neutering;
}
