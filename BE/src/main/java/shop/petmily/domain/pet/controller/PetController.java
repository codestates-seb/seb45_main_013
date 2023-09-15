package shop.petmily.domain.pet.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.pet.dto.PetDetailsDto;
import shop.petmily.domain.pet.dto.PetPatchDto;
import shop.petmily.domain.pet.dto.PetPostDto;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.mapper.PetMapper;
import shop.petmily.domain.pet.service.PetService;
import shop.petmily.global.argu.LoginMemberId;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@Slf4j
@RequestMapping("/pets")
@RestController
public class PetController {
    private final PetMapper mapper;
    private final PetService service;

    public PetController(PetMapper mapper, PetService service) {
        this.mapper = mapper;
        this.service = service;
    }

    //펫등록
    @PostMapping
    public ResponseEntity<String> postPet(@Valid PetPostDto.Request requestBody,
                                          @LoginMemberId Long memberId){
        requestBody.setMemberId(memberId);

        service.createPet(mapper.PetPostDtoToPet(requestBody), requestBody.getFile());

        return new ResponseEntity<>("Create Pet Success", HttpStatus.CREATED);
    }

    //펫수정
    @PatchMapping(value = "/{pet_id}")
    public ResponseEntity<String> patchPet(@PathVariable ("pet_id") @Positive long petId,
                                           @Valid PetPatchDto.Request requestBody,
                                           @LoginMemberId Long memberId){
        requestBody.setMemberId(memberId);
        requestBody.setPetId(petId);

        service.updatePet(mapper.PetPatchDtoToPet(requestBody), requestBody.getFile());

        return new ResponseEntity<>("Patch Pet Success", HttpStatus.OK);
    }

    //펫사진삭제
    @PatchMapping("/{pet_id}/photo")
    public ResponseEntity<String> photoDeletePet(@PathVariable ("pet_id") @Positive long petId,
                                                 @LoginMemberId Long memberId) {
        service.photoDelete(petId, memberId);

        return new ResponseEntity<>("Delete Photo Success", HttpStatus.OK);
    }

    //펫 1마리 정보 찾기
    @GetMapping("/{pet_id}")
    public ResponseEntity<PetDetailsDto.Response> findPet(@PathVariable ("pet_id") @Positive long petId){
        Pet pet = service.findPet(petId);
        return new ResponseEntity<>(mapper.PetToPetDetailsDto(pet), HttpStatus.OK);
    }

    //특정 member의 모든펫정보 찾기
    @GetMapping
    public ResponseEntity<List<PetDetailsDto.Response>> findPetsByMember(@LoginMemberId Long memberId){
        List<Pet> pets = service.findPets(memberId);

        List<PetDetailsDto.Response> response = pets.stream()
                .map(mapper::PetToPetDetailsDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //펫삭제
    @DeleteMapping("/{pet_id}")
    public ResponseEntity<String> deletePet(@PathVariable ("pet_id") @Positive long petId,
                                            @LoginMemberId Long memberId){

        service.deletePet(petId, memberId);

        return new ResponseEntity<>("Delete Pet Success", HttpStatus.NO_CONTENT);
    }
}
