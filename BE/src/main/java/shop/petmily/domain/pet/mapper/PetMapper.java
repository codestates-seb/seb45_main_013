package shop.petmily.domain.pet.mapper;

import org.mapstruct.Mapper;
import shop.petmily.domain.pet.dto.PetPatchDto;
import shop.petmily.domain.pet.dto.PetPostDto;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.entity.Pet;

@Mapper(componentModel = "Spring")
public interface PetMapper {
    Pet PetPostDtoToPet(PetPostDto petPostDto);

    Pet PetPatchDtoToPet(PetPatchDto petPatchDto);

    PetResponseDto PetToPetResponseDto(Pet pet);
}
