package shop.petmily.domain.pet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.pet.entity.Pet;

import javax.validation.constraints.*;

public class PetPostDto {

    @Getter
    @AllArgsConstructor
    public static class Request {
        private Long memberId;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }

        @NotNull(message = "'CAT' or 'DOG' 입력해 주세요")
        private Pet.PetType type;

        @NotBlank(message = "이름을 입력해 주세요")
        @Size(max = 50, message = "이름은 50자 이하여야 합니다.")
        private String name;

        @NotNull(message = "나이를 입력해 주세요.")
        @Min(value = 1, message = "나이는 1 이상이어야 합니다.")
        @Max(value = 100, message = "나이는 100 이하여야 합니다.")
        private Integer age;

        @NotBlank(message = "종을 입력해 주세요.")
        @Size(max = 1000, message = "종은 50자 이하여야 합니다.")
        private String species;

        @NotNull(message = "몸무게를 입력해 주세요.")
        @Min(value = 1, message = "몸무게는 1 이상이어야 합니다.")
        @Max(value = 100, message = "몸무게는 100 이하여야 합니다.")
        private Double weight;

        @Size(max = 1000, message = "소개는 1000자 이하여야 합니다.")
        private String body;

        @NotNull(message = "성별을 입력해 주세요.")
        private Boolean male;

        @NotNull(message = "중성화 여부를 입력해 주세요.")
        private Boolean neutering;

        private MultipartFile file;

        private Boolean Active;

        public void setActive(Boolean active) {Active = active;}
    }
}
