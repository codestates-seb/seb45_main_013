package shop.petmily.domain.petsitter.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.petsitter.dto.PetsitterGetResponseDto;
import shop.petmily.domain.petsitter.dto.PetsitterPatchRequestDto;
import shop.petmily.domain.petsitter.dto.PetsitterPostRequestDto;
import shop.petmily.domain.petsitter.entity.Petsitter;
import shop.petmily.domain.petsitter.mapper.PetsitterMapper;
import shop.petmily.domain.petsitter.service.PetsitterService;
import shop.petmily.global.argu.petsitter.LoginPetsitterId;
import shop.petmily.global.dto.LoginPetsitterResponseDto;
import shop.petmily.global.dto.SingleResponseDto;
import shop.petmily.global.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/petsitters")
@RequiredArgsConstructor
@Validated
@Slf4j
public class PetsitterController {
    private final static String PETSITTER_DEFAULT_URL = "/petsitters";
    private final PetsitterService petsitterService;
    private final PetsitterMapper mapper;

    @PostMapping
    public ResponseEntity postPetsitter(@Valid @RequestBody PetsitterPostRequestDto requestBody) {
        Petsitter petsitter = petsitterService.createPetsitter(mapper.petsitterPostDtoToPetsitter(requestBody));
        URI location = UriCreator.createUri(PETSITTER_DEFAULT_URL, petsitter.getPetsitterId());
        return ResponseEntity.created(location).body(new SingleResponseDto<>("success create petsitter"));
    }

    @PatchMapping("/{petsitter-id}")
    public ResponseEntity patchPetsitter(@PathVariable("petsitter-id") @Positive long petsitterId,
                                      @LoginPetsitterId Long loginPetsitterId,
                                      @Valid @RequestBody PetsitterPatchRequestDto requestBody) {
        Petsitter findPetsitter = petsitterService.findPetsitter(petsitterId);
        petsitterService.verifyAuthority(findPetsitter, loginPetsitterId);

        requestBody.setPetsitterId(findPetsitter.getPetsitterId());
        Petsitter petsitter = petsitterService.updatePetsitter(mapper.petsitterPatchDtoToPetsitter(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>("success modify petsitter"), HttpStatus.OK);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/my-page")
    public ResponseEntity<PetsitterGetResponseDto> getPetsitter(@LoginPetsitterId Long loginPetsitterId) {
        PetsitterGetResponseDto petsitterGetResponseDto = petsitterService.findProfilePetsitter(loginPetsitterId);

        return new ResponseEntity<>(petsitterGetResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{petsitter-id}")
    public ResponseEntity deletePetsitter(@PathVariable("petsitter-id") @Positive long petsitterId, @LoginPetsitterId Long loginPetsitterId) {
        Petsitter findPetsitter = petsitterService.findPetsitter(petsitterId);
        petsitterService.verifyAuthority(findPetsitter, loginPetsitterId);
        petsitterService.removePetsitter(findPetsitter.getPetsitterId());
        return new ResponseEntity<>(new SingleResponseDto<>("success delete petsitter"), HttpStatus.OK);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/user")
    public ResponseEntity accountUserDetails(@LoginPetsitterId Long loginPetsitterId) {
        Petsitter findPetsitter = petsitterService.findPetsitter(loginPetsitterId);

        return new ResponseEntity<>(new LoginPetsitterResponseDto(mapper.petsitterToLoginPetsitterResponseDto(findPetsitter)), HttpStatus.OK);
    }
}