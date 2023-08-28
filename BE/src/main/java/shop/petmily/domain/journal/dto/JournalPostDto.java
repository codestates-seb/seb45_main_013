package shop.petmily.domain.journal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor // test 하기 위해 생성함
public class JournalPostDto {
    private long reservationId;
    private long memberId;
    private long petSitterId;

    @NotBlank(message = "일지 내용은 공백이 아니어야 합니다")
    private String body;
    public void setPetSitterId(long petSitterId) {
        this.petSitterId = petSitterId;
    }
}
