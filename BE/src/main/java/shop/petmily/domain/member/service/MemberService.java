package shop.petmily.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.member.dto.MemberGetResponseDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.MemberFavoritePetsitter;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.MemberRepository;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;
import shop.petmily.global.security.utils.CustomAuthorityUtils;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PetsitterService petsitterService;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final S3UploadService uploadService;

    @Transactional
    public Member createMember(Member member) {

        verifyExistsEmail(member.getEmail());
        verifyExistsNickName(member.getNickName());
        verifyExistsPhone(member.getPhone());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        List<String> roles = customAuthorityUtils.createRoles(member);
        member.setRoles(roles);
        Member saveMember = memberRepository.save(member);
        if (member.isPetsitterBoolean()) {
            Petsitter petsitter = new Petsitter(saveMember);
            petsitterService.addPetsitterProfile(petsitter);
        }
        return saveMember;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member, MultipartFile file) throws IOException {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickName())
                .ifPresent(nickName -> findMember.setNickName(verifyExistsNickName(nickName)));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getPhone())
                .ifPresent(phone -> findMember.setPhone(verifyExistsPhone(phone)));
        Optional.ofNullable(member.getAddress())
                .ifPresent(address -> findMember.setAddress(address));
        Optional.ofNullable(member.isPetsitterBoolean())
                .ifPresent(petsitterBoolean -> findMember.setPetsitterBoolean(petsitterBoolean));
        Optional.ofNullable(member.getBody())
                .ifPresent(body -> findMember.setBody(body));

        if(file != null) {
            if(findMember.getPhoto() != null) uploadService.deleteFile(findMember.getPhoto());
            findMember.setPhoto(uploadService.saveFile(file));
        }

//        Optional<MultipartFile> optionalPhoto = Optional.ofNullable(memberPatchRequestDto.getPhoto());
//        if (optionalPhoto.isPresent() && !optionalPhoto.get().isEmpty()) {
//            if(findMember.getPhoto() != null) uploadService.deleteFile(findMember.getPhoto());
//            findMember.setPhoto(uploadService.saveFile(optionalPhoto.get()));
//        }

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

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
    public String verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
        return email;
    }

    @Transactional(readOnly = true)
    public String verifyExistsNickName(String nickName) {
        Optional<Member> optionalMember = memberRepository.findByNickName(nickName);
        if (optionalMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_NICKNAME_EXISTS);
        return nickName;
    }

    @Transactional(readOnly = true)
    public String verifyExistsPhone(String phone) {
        Optional<Member> optionalMember = memberRepository.findByPhone(phone);
        if (optionalMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_PHONE_EXISTS);
        return phone;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional
    public Member createMemberOAuth2(Member member) {
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
        if(findMember.isPresent()){
            return findMember.get();
        }
        List<String> roles = customAuthorityUtils.createRoles(member);
        member.setRoles(roles);
        verifyExistsEmail(member.getEmail());
        return memberRepository.save(member);
    }

    @Transactional
    public MemberGetResponseDto findProfileMember(Long loginMemberId) {
        Member member = findMember(loginMemberId);

        return MemberGetResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .name(member.getName())
                .nickName(member.getNickName())
                .phone(member.getPhone())
                .address(member.getAddress())
                .photo(member.getPhoto())
                .body(member.getBody())
                .petsitterBoolean(member.isPetsitterBoolean())
                .build();
    }


    @Transactional(readOnly = true)
    public void verifyLoginMember(Long loginMemberId, Long memberId) {
        if(loginMemberId != memberId){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    @Transactional
    public Member photoDelete(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        uploadService.deleteFile(findMember.getPhoto());
        findMember.setPhoto(null);

        return memberRepository.save(findMember);
    }

    // 찜 기능
    @Transactional
    public void toggleFavorite(Long memberId, Long petsitterId) {
        Member member = findVerifiedMember(memberId);
        Petsitter petsitter = petsitterService.findVerifiedPetsitter(petsitterId);

        // 이미 찜한 경우 찜하기 취소
        if (isFavorite(member, petsitter)) {
            removeFavorite(member, petsitter);
        } else { // 찜하지 않은 경우 찜하기
            addFavorite(member, petsitter);
        }

        memberRepository.save(member);
    }

    private boolean isFavorite(Member member, Petsitter petsitter) {
        return member.getFavoritePetsitters().stream()
                .anyMatch(favorite -> favorite.getPetsitter().equals(petsitter));
    }

    private void addFavorite(Member member, Petsitter petsitter) {
        MemberFavoritePetsitter favorite = new MemberFavoritePetsitter();
        favorite.setMember(member);
        favorite.setPetsitter(petsitter);
        member.getFavoritePetsitters().add(favorite);
    }

    private void removeFavorite(Member member, Petsitter petsitter) {
        List<MemberFavoritePetsitter> favoritePetSitters = member.getFavoritePetsitters();
        favoritePetSitters.removeIf(favorite -> favorite.getPetsitter().equals(petsitter));
    }
}
