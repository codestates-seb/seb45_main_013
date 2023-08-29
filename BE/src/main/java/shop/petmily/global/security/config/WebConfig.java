package shop.petmily.global.security.config;

import shop.petmily.global.argu.member.LoginMemberIdResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import shop.petmily.global.argu.petsitter.LoginPetsitterIdResolver;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginMemberIdResolver());
        resolvers.add(new LoginPetsitterIdResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:3000")
                .allowedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
