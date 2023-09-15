package shop.petmily.domain.pet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

public class PetPatchDto {

    @Getter
    @AllArgsConstructor
    public static class Request {
        private Long petId;

        public void setPetId(long petId) {
            this.petId = petId;
        }

        private Long memberId;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }

        @Size(max = 50, message = "이름은 50자 이하여야 합니다.")
        private String name;

        @Min(value = 1, message = "나이는 1 이상이어야 합니다.")
        @Max(value = 100, message = "나이는 100 이하여야 합니다.")
        private Integer age;

        @Min(value = 1, message = "몸무게는 1 이상이어야 합니다.")
        @Max(value = 100, message = "몸무게는 100 이하여야 합니다.")
        private Integer weight;

        @Size(max = 1000, message = "소개는 1000자 이하여야 합니다.")
        private String body;

        private Boolean neutering;

        private MultipartFile file;
    }
}
