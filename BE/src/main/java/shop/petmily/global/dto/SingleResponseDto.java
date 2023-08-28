package shop.petmily.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Data
public class SingleResponseDto<T> {
    private T data;
}
