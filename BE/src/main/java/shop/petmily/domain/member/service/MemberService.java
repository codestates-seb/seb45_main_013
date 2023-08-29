package shop.petmily.domain.member.service;

import shop.petmily.domain.member.dto.MemberGetResponseDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.repository.MemberRepository;
import shop.petmily.domain.role.Role;
import shop.petmily.domain.role.RoleRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;
import shop.petmily.global.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        List<String> roles = customAuthorityUtils.createRoles(member);
        member.setRoles(roles);
//        Optional<Role> userRole = roleRepository.findByName("ROLE_MEMBER");
//        member.addRole(userRole.get());
        Member saveMember = memberRepository.save(member);

        return saveMember;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(name -> findMember.setDisplayName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    @Transactional(readOnly = true)
    public Member findMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void verifyAuthority(Member findMember, Long loginMemberId) {
        if (!findMember.getMemberId().equals(loginMemberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MODIFY);
        }
    }

    @Transactional
    public void removeMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public Member createMemberOAuth2(Member member) {
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
        if(findMember.isPresent()){
            return findMember.get();
        }
//        List<String> roles = customAuthorityUtils.createRoles(member);
//        member.setRoles(roles);
        verifyExistsEmail(member.getEmail());
        return memberRepository.save(member);
    }

    public MemberGetResponseDto findProfileMember(Long loginMemberId) {
        Member member = findMember(loginMemberId);

        return MemberGetResponseDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .displayName(member.getDisplayName())
                .phone(member.getPhone())
                .address(member.getAddress())
                .build();
    }


    public void verifyLoginMember(Long loginMemberId, Long memberId) {
        if(loginMemberId != memberId){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }
}
