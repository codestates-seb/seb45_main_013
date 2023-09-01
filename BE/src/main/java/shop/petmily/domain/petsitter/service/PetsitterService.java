package shop.petmily.domain.petsitter.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.petsitter.dto.PetsitterGetResponseDto;
import shop.petmily.domain.petsitter.entity.Petsitter;
import shop.petmily.domain.petsitter.repository.PetsitterRepository;
import shop.petmily.domain.role.Role;
import shop.petmily.domain.role.RoleRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;
import shop.petmily.global.security.utils.CustomAuthorityUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PetsitterService {

    private final PetsitterRepository petsitterRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public Petsitter createPetsitter(Petsitter petsitter) {
        verifyExistsEmail(petsitter.getEmail());

        String encryptedPassword = passwordEncoder.encode(petsitter.getPassword());
        petsitter.setPassword(encryptedPassword);
        List<String> roles = customAuthorityUtils.createRoles(petsitter);
        petsitter.setRoles(roles);
//        Optional<Role> userRole = roleRepository.findByName("ROLE_PETSITTER");
//        petsitter.addRole(userRole.get());
        Petsitter savePetsitter = petsitterRepository.save(petsitter);

        return savePetsitter;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Petsitter updatePetsitter(Petsitter petsitter) {
        Petsitter findPetsitter = findVerifiedPetsitter(petsitter.getPetsitterId());

        Optional.ofNullable(petsitter.getName())
                .ifPresent(name -> findPetsitter.setName(name));
        Optional.ofNullable(petsitter.getDisplayName())
                .ifPresent(displayName -> findPetsitter.setDisplayName(displayName));
        Optional.ofNullable(petsitter.getPassword())
                .ifPresent(password -> findPetsitter.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(petsitter.getPhone())
                .ifPresent(phone -> findPetsitter.setPhone(phone));
        Optional.ofNullable(petsitter.getAddress())
                .ifPresent(address -> findPetsitter.setAddress(address));
        Optional.ofNullable(petsitter.getPossiblePetType())
                .ifPresent(possiblePetType -> findPetsitter.setPossiblePetType(possiblePetType));
        Optional.ofNullable(petsitter.getPossibleDay())
                .ifPresent(possibleDay -> findPetsitter.setPossibleDay(possibleDay));
        Optional.ofNullable(petsitter.getPossibleTimeStart())
                .ifPresent(possibleTimeStart -> findPetsitter.setPossibleTimeStart(possibleTimeStart));
        Optional.ofNullable(petsitter.getPossibleTimeEnd())
                .ifPresent(possibleTimeEnd -> findPetsitter.setPossibleTimeEnd(possibleTimeEnd));
        Optional.ofNullable(petsitter.getPossibleLocation())
                .ifPresent(possibleLocation -> findPetsitter.setPossibleLocation(possibleLocation));

        return petsitterRepository.save(findPetsitter);
    }

    @Transactional(readOnly = true)
    public Petsitter findPetsitter(long petsitterId) {
        return findVerifiedPetsitter(petsitterId);
    }

    @Transactional(readOnly = true)
    public Petsitter findPetsitter(String email) {
        return petsitterRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));
    }

    public void verifyAuthority(Petsitter findPetsitter, Long loginPetsitterId) {
        if (!findPetsitter.getPetsitterId().equals(loginPetsitterId)) {
            throw new BusinessLogicException(ExceptionCode.PETSITTER_NOT_MODIFY);
        }
    }

    @Transactional
    public void removePetsitter(long petsitterId) {
        Petsitter findPetsitter = findVerifiedPetsitter(petsitterId);
        petsitterRepository.delete(findPetsitter);
    }

    private void verifyExistsEmail(String email) {
        Optional<Petsitter> optionalPetsitter = petsitterRepository.findByEmail(email);
        if (optionalPetsitter.isPresent()) throw new BusinessLogicException(ExceptionCode.PETSITTER_EXISTS);
    }

    @Transactional(readOnly = true)
    public Petsitter findVerifiedPetsitter(long petsitterId) {
        Optional<Petsitter> optionalPetsitter =
                petsitterRepository.findById(petsitterId);
        Petsitter findPetsitter =
                optionalPetsitter.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));
        return findPetsitter;
    }

    public Petsitter createPetsitterOAuth2(Petsitter petsitter) {
        Optional<Petsitter> findPetsitter = petsitterRepository.findByEmail(petsitter.getEmail());
        if(findPetsitter.isPresent()){
            return findPetsitter.get();
        }
        List<String> roles = customAuthorityUtils.createRoles(petsitter);
        petsitter.setRoles(roles);
//        Optional<Role> userRole = roleRepository.findByName("ROLE_PETSITTER");
//        petsitter.addRole(userRole.get());
//        verifyExistsEmail(petsitter.getEmail());
        return petsitterRepository.save(petsitter);
    }

    public PetsitterGetResponseDto findProfilePetsitter(Long loginPetsitterId) {
        Petsitter petsitter = findPetsitter(loginPetsitterId);

        return PetsitterGetResponseDto.builder()
                .email(petsitter.getEmail())
                .name(petsitter.getName())
                .displayName(petsitter.getDisplayName())
                .phone(petsitter.getPhone())
                .address(petsitter.getAddress())
                .possiblePetType(petsitter.getPossiblePetType())
                .possibleDay(petsitter.getPossibleDay())
                .possibleTimeStart(petsitter.getPossibleTimeStart())
                .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                .possibleLocation(petsitter.getPossibleLocation())
                .build();
    }


    public void verifyLoginPetsitter(Long loginPetsitterId, Long petsitterId) {
        if(loginPetsitterId != petsitterId){
            throw new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND);
        }
    }
}
