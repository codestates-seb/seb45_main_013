package shop.petmily.global.security.config;

import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.refreshToken.service.RefreshTokenService;
import shop.petmily.global.security.filter.JwtAuthenticationFilter;
import shop.petmily.global.security.filter.JwtVerificationFilter;
import shop.petmily.global.security.handler.*;
import shop.petmily.global.security.jwt.JwtTokenizer;
import shop.petmily.global.security.utils.CustomAuthorityUtils;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeninedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize

                        .antMatchers(HttpMethod.POST, "/members/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/members/search").permitAll()
                        .antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("MEMBER", "PETSITTER")
                        .antMatchers(HttpMethod.PATCH, "/members/petsitters/**").hasRole("PETSITTER")
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasAnyRole("MEMBER", "PETSITTER")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasAnyRole("MEMBER", "PETSITTER")

                        .antMatchers(HttpMethod.POST, "/pets").hasRole("MEMBER")
                        .antMatchers(HttpMethod.GET, "/pets").hasRole("MEMBER")
                        .antMatchers(HttpMethod.GET, "/pets/**").hasAnyRole("MEMBER", "PETSITTER")
                        .antMatchers(HttpMethod.PATCH, "/pets/**").hasRole("MEMBER")
                        .antMatchers(HttpMethod.DELETE, "/pets/**").hasRole("MEMBER")

                        .antMatchers(HttpMethod.POST, "/reservations/petsitters").hasRole("MEMBER")
                        .antMatchers(HttpMethod.PATCH, "/reservations/petsitters").hasRole("MEMBER")
                        .antMatchers(HttpMethod.GET, "/reservations/petsitters").hasAnyRole("MEMBER", "PETSITTER")
                        .antMatchers(HttpMethod.GET, "/reservations/member/**").hasRole("MEMBER")
                        .antMatchers(HttpMethod.GET, "/reservations/petsitter/**").hasRole("PETSITTER")
                        .antMatchers(HttpMethod.PATCH, "/reservations/*/petsittercancel").hasRole("PETSITTER")
                        .antMatchers(HttpMethod.PATCH, "/reservations/*/membercancel").hasRole("MEMBER")

                        .antMatchers(HttpMethod.POST, "/journals").hasRole("PETSITTER")
                        .antMatchers(HttpMethod.PATCH, "/journals/**").hasRole("PETSITTER")
                        .antMatchers(HttpMethod.GET, "/journals/**").hasAnyRole("MEMBER", "PETSITTER")
                        .antMatchers(HttpMethod.GET, "/journals").hasRole("MEMBER")

                        .antMatchers(HttpMethod.POST, "/reviews").hasRole("MEMBER")
                        .antMatchers(HttpMethod.PATCH, "/reviews/**").hasRole("MEMBER")
                        .antMatchers(HttpMethod.GET, "/reviews").permitAll()
                        .antMatchers(HttpMethod.GET, "/reviews/**").permitAll()

                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, customAuthorityUtils, memberService, refreshTokenService))
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenService);
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils, memberService, refreshTokenService);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
