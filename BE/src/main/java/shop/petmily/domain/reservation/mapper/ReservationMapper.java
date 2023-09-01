package shop.petmily.domain.reservation.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.reservation.dto.ReservationPatchDto;
import shop.petmily.domain.reservation.dto.ReservationPostDto;
import shop.petmily.domain.reservation.dto.ReservationResponseDto;
import shop.petmily.domain.reservation.entity.Reservation;

import java.util.ArrayList;
import java.util.List;


@Mapper(componentModel = "Spring")
public interface ReservationMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Reservation reservationPostDtoToReservation(ReservationPostDto reservationPostDto);

//    @Mapping(source = "memberId", target = "member.memberId")
//    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);

    default ReservationResponseDto reservationToReservationResponseDto(Reservation reservation){
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();

        reservationResponseDto.setReservationId(reservation.getReservationId());
        reservationResponseDto.setMemberId(reservation.getMember().getMemberId());
        reservationResponseDto.setName(reservation.getMember().getName());
//        reservationResponseDto.setReservationTimeStart(reservation.getReservationTimeStart());
//        reservationResponseDto.setReservationTimeEnd(reservation.getReservationTimeEnd());
        reservationResponseDto.setLocation(reservation.getMember().getAddress());
        reservationResponseDto.setPhone(reservation.getMember().getPhone());
        reservationResponseDto.setBody(reservation.getBody());
//        reservationResponseDto.setPetsitterId(reservation.getPetsitter().getPetsitterId());
//        reservationResponseDto.setPetsitterName(reservation.getPetsitter().getName());
//        reservationResponseDto.setPetsitterPhone(reservation.getPetsitter().getPhone());
        reservationResponseDto.setCreatedAt(reservation.getCreatedAt());
        reservationResponseDto.setLastModifiedAt(reservation.getLastModifiedAt());
        reservationResponseDto.setProgress(String.valueOf(reservation.getProgress()));

//        List<PetResponseDto> reservationPets = new ArrayList<>();
//        for (Long reservationPetId : reservation.getPet()) {
//            for (Pet memberPets : reservation.getMember().getPets()) {
//                if (memberPets.getPetId() == reservationPetId){
//                    PetResponseDto petResponseDto = new PetResponseDto();
//                    petResponseDto.setPetId(memberPets.getPetId());
//                    petResponseDto.setMemberId(memberPets.getMember().getMemberId());
//                    petResponseDto.setType(memberPets.getType());
//                    petResponseDto.setName(memberPets.getName());
//                    petResponseDto.setAge(memberPets.getAge());
//                    petResponseDto.setSpecies(memberPets.getSpecies());
//                    petResponseDto.setWeight(memberPets.getWeight());
//                    petResponseDto.setPhoto(memberPets.getPhoto());
//                    petResponseDto.setCreatedAt(memberPets.getCreatedAt());
//                    petResponseDto.setLastModifiedAt(memberPets.getLastModifiedAt());
//                    reservationPets.add(petResponseDto);
//                }
//            }
//        }
//        reservationResponseDto.setPets(reservationPets);

        return reservationResponseDto;
    }
}
