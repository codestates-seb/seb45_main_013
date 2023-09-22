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

    default PetDetailsDto.Response PetToPetDetailsDto(Pet pet) {
        PetDetailsDto.Response response = new PetDetailsDto.Response();

        response.setPetId(pet.getPetId());
        response.setMemberId(pet.getMember().getMemberId());
        response.setType(pet.getType());
        response.setName(pet.getName());
        response.setAge(pet.getAge());
        response.setSpecies(pet.getSpecies());
        response.setWeight(pet.getWeight());
        response.setPhoto(pet.getPhoto());
        response.setBody(pet.getBody());
        response.setMale(pet.getMale());
        response.setNeutering(pet.getNeutering());

        return response;
    }
}
