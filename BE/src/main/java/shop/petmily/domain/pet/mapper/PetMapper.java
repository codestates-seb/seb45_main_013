package shop.petmily.domain.pet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.pet.dto.PetDetailsDto;
import shop.petmily.domain.pet.dto.PetPatchDto;
import shop.petmily.domain.pet.dto.PetPostDto;
import shop.petmily.domain.pet.entity.Pet;

@Mapper(componentModel = "Spring")
public interface PetMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Pet PetPostDtoToPet(PetPostDto.Request petPostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Pet PetPatchDtoToPet(PetPatchDto.Request petPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    PetDetailsDto.Response PetToPetDetailsDto(Pet pet);
}
