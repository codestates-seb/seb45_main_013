package shop.petmily.domain.journal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@AllArgsConstructor // test 하기 위해 생성함
public class JournalPostDto {
    private Long reservationId;

    private Long petsitterId;
    public void setPetsitterId(Long petsitterId) {
        this.petsitterId = petsitterId;
    }

    @NotBlank(message = "일지 내용은 공백이 아니어야 합니다")
    private String body;

    private List<MultipartFile> file;
}
