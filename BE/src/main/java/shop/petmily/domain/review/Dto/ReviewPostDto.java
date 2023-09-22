package shop.petmily.domain.review.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@AllArgsConstructor
public class ReviewPostDto {
    private Long reservationId;

    private Long petsitterId;

    private Long memberId;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    @NotBlank(message = "후기 내용은 공백이 아니어야 합니다")
    private String body;

    private Integer star;

    private List<MultipartFile> file;
}
