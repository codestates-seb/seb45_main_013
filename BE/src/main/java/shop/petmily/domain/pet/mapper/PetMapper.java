package shop.petmily.domain.pet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.pet.dto.PetPatchDto;
import shop.petmily.domain.pet.dto.PetPostDto;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.entity.Pet;

@Mapper(componentModel = "Spring")
public interface PetMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Pet PetPostDtoToPet(PetPostDto petPostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Pet PetPatchDtoToPet(PetPatchDto petPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    PetResponseDto PetToPetResponseDto(Pet pet);
}
