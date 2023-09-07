package shop.petmily.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.dto.PetsitterGetResponseDto;
import shop.petmily.domain.member.dto.PetsitterPossibleResoponseDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.PetsitterRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetsitterService {

    private final PetsitterRepository petsitterRepository;

    @Transactional
    public Petsitter addPetsitterProfile(Petsitter petsitter) {
        return petsitterRepository.save(petsitter);
    }

    @Transactional(readOnly = true)
    public Petsitter findPetsitter(Member member) {
        return petsitterRepository.findByMember(member).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Petsitter updatePetsitter(Petsitter petsitter) {
        Petsitter findPetsitter = findVerifiedPetsitter(petsitter.getPetsitterId());
        Optional.ofNullable(petsitter.getPossibleLocation())
                .ifPresent(possibleLocation -> findPetsitter.setPossibleLocation(possibleLocation));
        Optional.ofNullable(petsitter.getPossibleDay())
                .ifPresent(possibleDay -> findPetsitter.setPossibleDay(possibleDay));
        Optional.ofNullable(petsitter.getPossiblePetType())
                .ifPresent(possiblePetType -> findPetsitter.setPossiblePetType(possiblePetType));
        Optional.ofNullable(petsitter.getPossibleTimeStart())
                .ifPresent(possibleTimeStart -> findPetsitter.setPossibleTimeStart(possibleTimeStart));
        Optional.ofNullable(petsitter.getPossibleTimeEnd())
                .ifPresent(possibleTimeEnd -> findPetsitter.setPossibleTimeEnd(possibleTimeEnd));

        return petsitterRepository.save(findPetsitter);
    }

    @Transactional(readOnly = true)
    public Petsitter findVerifiedPetsitter(Long petsitterId) {
        Optional<Petsitter> optionalPetsitter = petsitterRepository.findById(petsitterId);
        Petsitter findPetsitter = optionalPetsitter.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));
        return findPetsitter;
    }

    public PetsitterPossibleResoponseDto findPossible(Petsitter petsitter) {

        long monthTotalReservation = 0;

        return PetsitterPossibleResoponseDto.builder()
                .petsitterId(petsitter.getPetsitterId())
                .possiblePetType(petsitter.getPossiblePetType())
                .possibleDay(petsitter.getPossibleDay())
                .possibleLocation(petsitter.getPossibleLocation().toString())
                .possibleTimeStart(petsitter.getPossibleTimeStart())
                .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                .star(petsitter.getStar())
                .reviewCount(petsitter.getReviewCount())
//                .monthTotalReservation(monthTotalReservation)
                .build();
    }

    public Page<PetsitterGetResponseDto> findPetsittersWithFilters(Map<String, String> params, Pageable pageable) {
        String nameFilter = params.get("name");
        String starFilter = params.get("star");
        String reviewCountFilter = params.get("reviewCount");

        List<Member> petsitters = getPetsittersWithFilters(nameFilter, starFilter, reviewCountFilter);
        List<PetsitterGetResponseDto> petsitterGetResponseDtos = mapMembersToDto(petsitters, pageable);

        return new PageImpl<>(petsitterGetResponseDtos, pageable, petsitters.size());
    }

    private List<Member> getPetsittersWithFilters(String nameFilter, String starFilter, String reviewCountFilter) {
        List<Member> petsitters = petsitterRepository.findAllMembersWithPetsitterBooleanTrue();

        if (nameFilter != null && !nameFilter.isEmpty()) {
            final String filterText = nameFilter;
            petsitters = petsitters.stream()
                    .filter(member -> member.getName().contains(filterText))
                    .collect(Collectors.toList());
        }

        if (starFilter != null && !starFilter.isEmpty()) {
            double starValue = Double.parseDouble(starFilter);
            petsitters = petsitters.stream()
                    .filter(member -> {
                        double memberStar = member.getPetsitter().getStar();
                        return memberStar >= starValue && memberStar < (starValue + 1.0);
                    })
                    .sorted((member1, member2) -> {
                        double star1 = member1.getPetsitter().getStar();
                        double star2 = member2.getPetsitter().getStar();
                        return Double.compare(star2, star1); // 내림차순 정렬
                    })
                    .collect(Collectors.toList());
        } else {
            petsitters = petsitters.stream()
                    .sorted((member1, member2) -> {
                        double star1 = member1.getPetsitter().getStar();
                        double star2 = member2.getPetsitter().getStar();
                        return Double.compare(star2, star1); // 내림차순 정렬
                    })
                    .collect(Collectors.toList());
        }

        if (reviewCountFilter != null && !reviewCountFilter.isEmpty()) {
            int reviewCountValue = Integer.parseInt(reviewCountFilter);
            petsitters = petsitters.stream()
                    .filter(member -> {
                        int reviewCount = member.getPetsitter().getReviewCount();
                        return reviewCount >= reviewCountValue;
                    })
                    .collect(Collectors.toList());
        }

        return petsitters;
    }

    private List<PetsitterGetResponseDto> mapMembersToDto(List<Member> members, Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > members.size() ? members.size() : (start + pageable.getPageSize());
        List<Member> pagedMembers = members.subList(start, end);

        return pagedMembers.stream()
                .map(this::mapToPetsitterGetResponseDto)
                .collect(Collectors.toList());
    }

    private PetsitterGetResponseDto mapToPetsitterGetResponseDto(Member member) {
        Petsitter petsitter = findPetsitter(member);
        return PetsitterGetResponseDto.builder()
                .petsitterId(petsitter.getPetsitterId())
                .email(member.getEmail())
                .name(member.getName())
                .nickName(member.getNickName())
                .phone(member.getPhone())
                .address(member.getAddress())
                .photo(member.getPhoto())
                .body(member.getBody())
                .possiblePetType(petsitter.getPossiblePetType())
                .possibleDay(petsitter.getPossibleDay())
                .possibleTimeStart(petsitter.getPossibleTimeStart())
                .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                .star(petsitter.getStar())
                .reviewCount(petsitter.getReviewCount())
                .build();
    }
}
