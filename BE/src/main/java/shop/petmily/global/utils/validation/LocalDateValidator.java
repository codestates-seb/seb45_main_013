package shop.petmily.global.utils.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class LocalDateValidator implements ConstraintValidator<ValidLocalDate, LocalDate> {
    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if (value == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("예약 날짜를 입력해 주세요.")
                    .addConstraintViolation();
            return false;
        }

        if (value.isEqual(LocalDate.now()) || value.isAfter(LocalDate.now())) {
            return true;
        } else {
            return false;
        }
    }
}
