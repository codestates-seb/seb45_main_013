package shop.petmily.global.security.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import shop.petmily.global.argu.LoginMemberIdResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Getter
    @Value("${jwt.main_ec2_url}")
    private String ec2_url;

    @Getter
    @Value("${jwt.main_buket_url}")
    private String buket_url;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginMemberIdResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:3000", "http://api.petmily.shop/", "http://petmily.shop/", "https://petmily.vercel.app/",ec2_url, buket_url)
                .allowedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
