package shop.petmily.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.dto.PetsitterGetResponseDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.MemberFavoritePetsitter;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.FavoriteRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteService {
    private final MemberService memberService;
    private final PetsitterService petsitterService;
    private final FavoriteRepository favoriteRepository;

    // 찜 기능
    public boolean toggleFavorite(Long memberId, Long petsitterId) {
        Member member = memberService.findVerifiedMember(memberId);
        Petsitter petsitter = petsitterService.findVerifiedPetsitter(petsitterId);

        MemberFavoritePetsitter favorite = favoriteRepository.findByMemberAndPetsitter(member, petsitter);

        if (favorite == null) {
            favorite = new MemberFavoritePetsitter();
            favorite.setMember(member);
            favorite.setPetsitter(petsitter);
            member.getFavoritePetsitters().add(favorite);
            favoriteRepository.save(favorite);
            return true;
        }
        favoriteRepository.delete(favorite);
        return false;
    }

    // 찜한 펫시터 목록 조회
    public List<PetsitterGetResponseDto> findFavoritePetsitters(Long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        List<MemberFavoritePetsitter> favoritePetsitters = favoriteRepository.findByMember(member);

        return favoritePetsitters.stream()
                .sorted(Comparator.comparingLong(MemberFavoritePetsitter::getId).reversed())
                .map(favorite -> {
                    Petsitter petsitter = favorite.getPetsitter();
                    return PetsitterGetResponseDto.builder()
                            .petsitterId(petsitter.getPetsitterId())
                            .email(petsitter.getMember().getEmail())
                            .name(petsitter.getMember().getName())
                            .nickName(petsitter.getMember().getNickName())
                            .phone(petsitter.getMember().getPhone())
                            .address(petsitter.getMember().getAddress())
                            .photo(petsitter.getMember().getPhoto())
                            .possiblePetType(petsitter.getPossiblePetType())
                            .possibleLocation(petsitter.getPossibleLocation())
                            .possibleDay(petsitter.getPossibleDay())
                            .possibleTimeStart(petsitter.getPossibleTimeStart())
                            .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                            .body(petsitter.getMember().getBody())
                            .star(petsitter.getStar())
                            .reviewCount(petsitter.getReviewCount())
                            .build();
                })
                .collect(Collectors.toList());
    }

    // 특정 펫시터가 찜 되었는지 확인
    public boolean findFavoriteBoolean(Long memberId, Long petsitterId) {
        Member member = memberService.findVerifiedMember(memberId);
        Petsitter petsitter = petsitterService.findVerifiedPetsitter(petsitterId);
        MemberFavoritePetsitter favorite = favoriteRepository.findByMemberAndPetsitter(member, petsitter);

        return favorite != null;
    }
}
