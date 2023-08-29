package shop.petmily.domain.petsitter.mapper;

import org.mapstruct.Mapper;
import shop.petmily.domain.petsitter.dto.*;
import shop.petmily.domain.petsitter.entity.Petsitter;

@Mapper(componentModel = "spring")
public interface PetsitterMapper {

    Petsitter petsitterPostDtoToPetsitter(PetsitterPostRequestDto requestBody);
    Petsitter petsitterPatchDtoToPetsitter(PetsitterPatchRequestDto requestBody);
    Petsitter petsitterToLoginPetsitterResponseDto(Petsitter petsitter);
    PetsitterPostResponseDto petsitterToPetsitterPostResponseDto(Petsitter petsitter);
    PetsitterPatchResponseDto petsitterToPetsitterPatchResponseDto(Petsitter petsitter);
    PetsitterGetResponseDto petsitterToPetsitterGetResponseDto(Petsitter petsitter);
}
