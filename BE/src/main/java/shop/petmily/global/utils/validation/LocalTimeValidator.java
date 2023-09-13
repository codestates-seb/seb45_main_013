package shop.petmily.global.utils.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalTime;

public class LocalTimeValidator implements ConstraintValidator<ValidLocalTime, LocalTime> {
    @Override
    public boolean isValid(LocalTime value, ConstraintValidatorContext context) {
        if (value == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("예약 시간을 입력해 주세요.")
                    .addConstraintViolation();
            return false;
        }

        if ((value.equals(LocalTime.of(8, 0)) || value.isAfter(LocalTime.of(8, 0))) &&
                (value.isBefore(LocalTime.of(22, 00)) || value.equals(LocalTime.of(22, 00)))) {
            return true;
        } else {
            return false;
        }
    }
}
