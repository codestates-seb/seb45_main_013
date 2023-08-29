package shop.petmily.global.security.userdetails;

import org.hibernate.Hibernate;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.repository.MemberRepository;
import shop.petmily.domain.petsitter.entity.Petsitter;
import shop.petmily.domain.petsitter.repository.PetsitterRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;
import shop.petmily.global.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final PetsitterRepository petsitterRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<Member> optionalMember = memberRepository.findByEmail(username);
//        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//
//        return new MemberDetails(findMember);
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Optional<Petsitter> optionalPetsitter = petsitterRepository.findByEmail(username);

        if (optionalMember.isPresent()) {
            Member findMember = optionalMember.get();
            return new MemberDetails(findMember);
        } else if (optionalPetsitter.isPresent()) {
            Petsitter findPetsitter = optionalPetsitter.get();
            return new PetsitterDetails(findPetsitter);
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    @Transactional
    private class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());

            Hibernate.initialize(getRoles()); // roles 컬렉션 강제로 로드
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

    @Transactional
    private class PetsitterDetails extends Petsitter implements UserDetails {
        PetsitterDetails(Petsitter petsitter) {
            setPetsitterId(petsitter.getPetsitterId());
            setEmail(petsitter.getEmail());
            setPassword(petsitter.getPassword());
            setRoles(petsitter.getRoles());

            Hibernate.initialize(getRoles()); // roles 컬렉션 강제로 로드
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
