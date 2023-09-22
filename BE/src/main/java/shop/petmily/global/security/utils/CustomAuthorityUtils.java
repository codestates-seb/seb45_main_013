package shop.petmily.global.security.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import shop.petmily.domain.member.entity.Member;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

    private String adminMailAddress = "admin@google.com";

    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_MEMBER", "ROLE_PETSITTER");
    private final List<GrantedAuthority> MEMBER_ROLES = AuthorityUtils.createAuthorityList("ROLE_MEMBER");
    private final List<GrantedAuthority> PETSITTER_ROLES = AuthorityUtils.createAuthorityList("ROLE_PETSITTER");
    private final List<GrantedAuthority> GUEST_ROLES = AuthorityUtils.createAuthorityList("ROLE_GUEST");
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "MEMBER", "PETSITTER");
    private final List<String> MEMBER_ROLES_STRING = List.of("MEMBER");
    private final List<String> PETSITTER_ROLES_STRING = List.of("PETSITTER");
    private final List<String> GUEST_ROLES_STRING = List.of("GUEST");

    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    public List<String> createRoles(Member member) {
        if (member.getPetsitterBoolean() != null) {
            if (member.getPetsitterBoolean()) {
                return PETSITTER_ROLES_STRING;
            } else {
                return MEMBER_ROLES_STRING;
            }
        } else {
            return GUEST_ROLES_STRING;
        }
    }

    public List<String> createMemberRoles(Member member) {
        if (member.getPetsitterBoolean() == null) {
            return MEMBER_ROLES_STRING;
        } else {
            return GUEST_ROLES_STRING;
        }
    }

    public List<String> createPetsitterRoles(Member member) {
        if (member.getPetsitterBoolean() == null) {
            return PETSITTER_ROLES_STRING;
        } else {
            return GUEST_ROLES_STRING;
        }
    }

    public List<String> chageRoles(Member member) {

        if (member.getPetsitterBoolean()) {
            return MEMBER_ROLES_STRING;
        } else if (member.getPetsitterBoolean() == false) {
            return PETSITTER_ROLES_STRING;
        } else {
            return ADMIN_ROLES_STRING;
        }
    }
}
