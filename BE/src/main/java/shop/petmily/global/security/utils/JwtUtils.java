package shop.petmily.global.security.utils;

import shop.petmily.global.dto.TokenPrincipalDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {
    public Long getMemberId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TokenPrincipalDto castedPrincipal = (TokenPrincipalDto) principal;
        return castedPrincipal.getId();
    }
}
