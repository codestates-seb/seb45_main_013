package shop.petmily.global.utils.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class AddressValidator implements ConstraintValidator<ValidAddress, String> {
    private final static String BIGCITY_ADDRESS_PATTERN =
            ".*((서울|인천|대전|대구|울산|부산|광주)\\s([가-힣]+[구군])|([가-힣]+[시군])\\s([가-힣]+[구])).*";

    private final static String MIDDLE_CITY_ADDRESS_PATTERN =
            ".*(수원시|성남시|안양시|용인시|고양시|안산시|전주시|청주시|천안시|포항시|창원시).*";

    private final static String SMALLCITY_ADDRESS_PATTERN =
                ".*([가-힣]+[시군]).*";

    @Override
    public boolean isValid(String address, ConstraintValidatorContext context) {
        if (address == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("예약 주소를 입력해 주세요.")
                    .addConstraintViolation();
            return false;
        }
        if(Pattern.matches(BIGCITY_ADDRESS_PATTERN, address)) return true;
        if(Pattern.matches(MIDDLE_CITY_ADDRESS_PATTERN, address)) return false;
        return Pattern.matches(SMALLCITY_ADDRESS_PATTERN, address);
    }
}