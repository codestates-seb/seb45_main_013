package shop.petmily.domain.pet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.pet.entity.Pet;

@Getter
@AllArgsConstructor
public class PetPostDto {

    private Long memberId;

    public void setMemberId(long memberId) {this.memberId = memberId;}

    private Pet.PetType type;

    private String name;

    private Integer age;

    private String species;

    private Integer weight;

    private String body;

    private Boolean male;

    private Boolean neutering;

    private MultipartFile file;

}
