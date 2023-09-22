package shop.petmily.domain.member.mapper;

import org.mapstruct.Mapper;
import shop.petmily.domain.member.dto.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;

@Mapper(componentModel = "spring")
public interface PetsitterMapper {

    Petsitter petstitterPatchDtoToPetsitter(PetsitterPatchRequestDto requestBody);
    Petsitter petstitterToLoginPetsitterResponseDto(Petsitter petstitter);
    PetsitterGetResponseDto petstitterToPetsitterGetResponseDto(Petsitter petstitter);
}
