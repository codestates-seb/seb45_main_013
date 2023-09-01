package shop.petmily.domain.review.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class ReviewPostDto {
    private long reservationId;

    private long petSitterId;

    private long memberId;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    @NotBlank(message = "후기 내용은 공백이 아니어야 합니다")
    private String body;

    private int star;
}