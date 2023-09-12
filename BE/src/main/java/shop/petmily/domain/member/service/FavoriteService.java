package shop.petmily.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.dto.FavoriteResponseDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.MemberFavoritePetsitter;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.FavoriteRepository;

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
    public void toggleFavorite(Long memberId, Long petsitterId) {
        Member member = memberService.findVerifiedMember(memberId);
        Petsitter petsitter = petsitterService.findVerifiedPetsitter(petsitterId);

        MemberFavoritePetsitter favorite = favoriteRepository.findByMemberAndPetsitter(member, petsitter);

        if (favorite == null) {
            favorite = new MemberFavoritePetsitter();
            favorite.setMember(member);
            favorite.setPetsitter(petsitter);
            member.getFavoritePetsitters().add(favorite);
            favoriteRepository.save(favorite);
        }
        favoriteRepository.delete(favorite);
    }

    // 찜한 펫시터 목록 조회
    public List<FavoriteResponseDto> findFavoritePetsitters(Long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        List<MemberFavoritePetsitter> favoritePetsitters = favoriteRepository.findByMember(member);

        return favoritePetsitters.stream()
                .map(favorite -> {
                    Petsitter petsitter = favorite.getPetsitter();
                    return FavoriteResponseDto.builder()
                            .petsitterId(petsitter.getPetsitterId())
                            .petsitterName(petsitter.getMember().getName())
                            .possiblePetType(petsitter.getPossiblePetType())
                            .possibleLocation(petsitter.getPossibleLocation())
                            .possibleDay(petsitter.getPossibleDay())
                            .possibleTimeStart(petsitter.getPossibleTimeStart())
                            .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                            .star(petsitter.getStar())
                            .reviewCount(petsitter.getReviewCount())
                            // 필요에 따라 추가 필드를 설정
                            .build();
                })
                .collect(Collectors.toList());
    }
}
