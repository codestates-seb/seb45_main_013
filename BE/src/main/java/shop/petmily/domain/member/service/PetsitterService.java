package shop.petmily.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.dto.MemberGetResponseDto;
import shop.petmily.domain.member.dto.PetsitterPossibleResoponseDto;
import shop.petmily.domain.member.entity.Customer;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.CustomerRepository;
import shop.petmily.domain.member.repository.PetsitterRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.util.Optional;

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
        Optional.ofNullable(petsitter.getStar())
                .ifPresent(star -> findPetsitter.setStar(star));

        return petsitterRepository.save(findPetsitter);
    }

    @Transactional(readOnly = true)
    public Petsitter findVerifiedPetsitter(Long petsitterId) {
        Optional<Petsitter> optionalPetsitter = petsitterRepository.findById(petsitterId);
        Petsitter findPetsitter = optionalPetsitter.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));
        return findPetsitter;
    }

    public PetsitterPossibleResoponseDto findPossible(Petsitter petsitter) {

        return PetsitterPossibleResoponseDto.builder()
                .possiblePetType(petsitter.getPossiblePetType())
                .possibleDay(petsitter.getPossibleDay())
                .possibleLocation(petsitter.getPossibleLocation())
                .possibleTimeStart(petsitter.getPossibleTimeStart())
                .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                .star(petsitter.getStar())
                .build();
    }
}
