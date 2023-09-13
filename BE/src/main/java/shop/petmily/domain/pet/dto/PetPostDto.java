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

    @NotNull(message = "'CAT' or 'DOG' 입력해 주세요")
    private Pet.PetType type;

    @NotBlank(message = "이름을 입력해 주세요")
    private String name;

    @NotNull(message = "나이를 입력해 주세요.")
    private Integer age;

    @NotBlank(message = "종을 입력해 주세요.")
    private String species;

    @NotNull(message = "몸무게를 입력해 주세요.")
    private Integer weight;

    private String body;

    @NotNull(message = "성별을 입력해 주세요.")
    private Boolean male;

    @NotNull(message = "중성화 여부를 입력해 주세요.")
    private Boolean neutering;

    private MultipartFile file;

}
