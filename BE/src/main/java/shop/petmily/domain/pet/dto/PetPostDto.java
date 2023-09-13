package shop.petmily.domain.pet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.pet.entity.Pet;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class PetPostDto {

    private Long memberId;

    public void setMemberId(long memberId) {this.memberId = memberId;}

    @NotNull
    private Pet.PetType type;

    @NotBlank
    private String name;

    @NotNull
    private Integer age;

    @NotBlank
    private String species;

    @NotNull
    private Integer weight;

    @NotBlank
    private String body;

    @NotNull
    private Boolean male;

    @NotNull
    private Boolean neutering;

    private MultipartFile file;

}
