package shop.petmily.global.security.utils;

import org.springframework.stereotype.Component;

@Component
public class AuthenticationUtils {
    private static final String USERNAME_PATTERN = "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
    private static final String PASSWORD_PATTERN = "(?=.*\\d)(?=.*[a-zA-Z]).{8,}";

    public static boolean isValidEmail(String email) {
        return email.matches(USERNAME_PATTERN);
    }

    public static boolean isValidPassword(String password) {
        return password.matches(PASSWORD_PATTERN);
    }
}
