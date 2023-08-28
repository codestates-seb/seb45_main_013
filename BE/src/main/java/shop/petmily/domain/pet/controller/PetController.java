package shop.petmily.domain.pet.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.pet.dto.PetPatchDto;
import shop.petmily.domain.pet.dto.PetPostDto;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.mapper.PetMapper;
import shop.petmily.domain.pet.service.PetService;

import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

@RequestMapping("/pets")
@RestController
public class PetController {
    private final PetMapper mapper;

    private final PetService service;

    public PetController(PetMapper mapper, PetService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity PostPet(@RequestPart PetPostDto petPostDto,
                                  @RequestPart MultipartFile file) throws IOException {
        Pet pet = service.createPet(mapper.PetPostDtoToPet(petPostDto), file);
        return new ResponseEntity(mapper.PetToPetResponseDto(pet), HttpStatus.CREATED);
    }

    @PatchMapping(value = "/{pet_id}",
                  consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity PatchPet(@PathVariable ("pet_id") @Positive long petId,
                                   @RequestPart PetPatchDto petPatchDto,
                                   @RequestPart MultipartFile file) throws IOException {
        petPatchDto.setPetId(petId);
        Pet pet = service.updatePet(mapper.PetPatchDtoToPet(petPatchDto), file);
        return new ResponseEntity(mapper.PetToPetResponseDto(pet), HttpStatus.CREATED);
    }

    @DeleteMapping("/{qet_id}")
    public void DeletePet(@PathVariable ("pet_id") @Positive long petId){
        service.deletePet(petId);
    }
}
