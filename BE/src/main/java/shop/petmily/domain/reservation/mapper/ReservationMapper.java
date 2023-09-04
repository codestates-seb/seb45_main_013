package shop.petmily.domain.reservation.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.reservation.dto.ReservationPatchDto;
import shop.petmily.domain.reservation.dto.ReservationPossiblePetsitterReseponseDto;
import shop.petmily.domain.reservation.dto.ReservationPostDto;
import shop.petmily.domain.reservation.dto.ReservationResponseDto;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;

import java.util.ArrayList;
import java.util.List;


@Mapper(componentModel = "Spring")
public interface ReservationMapper {

    default Reservation reservationPostDtoToReservation(ReservationPostDto reservationPostDto){
        Reservation reservation = new Reservation();
        Member member = new Member();
        member.setMemberId(reservationPostDto.getMemberId());
        reservation.setMember(member);

        reservation.setBody(reservationPostDto.getBody());
        reservation.setPhone(reservationPostDto.getPhone());
        reservation.setAdress(reservationPostDto.getAdress());
        reservation.setReservationTimeStart(reservationPostDto.getReservationTimeStart());
        reservation.setReservationTimeEnd(reservationPostDto.getReservationTimeEnd());

        List<ReservationPet> reservationPets = new ArrayList<>();
        for (Long petId: reservationPostDto.getPetId()) {
            ReservationPet reservationPet = new ReservationPet();
            reservationPet.setReservation(reservation);
            Pet pet = new Pet();
            pet.setPetId(petId);
            reservationPet.setPet(pet);
            reservationPets.add(reservationPet);
        }

        reservation.setReservationPets(reservationPets);

        return reservation;
    }

//    @Mapping(source = "memberId", target = "member.memberId")
//    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);

    default ReservationResponseDto reservationToReservationResponseDto(Reservation reservation){
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();

        reservationResponseDto.setReservationId(reservation.getReservationId());
        reservationResponseDto.setMemberId(reservation.getMember().getMemberId());
        reservationResponseDto.setName(reservation.getMember().getName());
        reservationResponseDto.setReservationTimeStart(reservation.getReservationTimeStart());
        reservationResponseDto.setReservationTimeEnd(reservation.getReservationTimeEnd());
        reservationResponseDto.setLocation(reservation.getMember().getAddress());
        reservationResponseDto.setPhone(reservation.getMember().getPhone());
        reservationResponseDto.setBody(reservation.getBody());
        if (reservation.getPetsitter() == null){
            reservationResponseDto.setPetsitterId(0);
            reservationResponseDto.setPetsitterName(null);
            reservationResponseDto.setPetsitterPhone(null);
        }else {
            reservationResponseDto.setPetsitterId(reservation.getPetsitter().getPetsitterId());
            reservationResponseDto.setPetsitterName(reservation.getPetsitter().getMember().getName());
            reservationResponseDto.setPetsitterPhone(reservation.getPetsitter().getMember().getPhone());
        }
//        reservationResponseDto.setCreatedAt(reservation.getCreatedAt());
//        reservationResponseDto.setLastModifiedAt(reservation.getLastModifiedAt());
        reservationResponseDto.setProgress(String.valueOf(reservation.getProgress()));

        List<PetResponseDto> pets = new ArrayList<>();
        for (ReservationPet reservationPet : reservation.getReservationPets()) {
            PetResponseDto petResponseDto = new PetResponseDto();
            petResponseDto.setPetId(reservationPet.getPet().getPetId());
            petResponseDto.setType(reservationPet.getPet().getType());
            petResponseDto.setName(reservationPet.getPet().getName());
            petResponseDto.setAge(reservationPet.getPet().getAge());
            petResponseDto.setSpecies(reservationPet.getPet().getSpecies());
            petResponseDto.setWeight(reservationPet.getPet().getWeight());
            petResponseDto.setPhoto(reservationPet.getPet().getPhoto());
            pets.add(petResponseDto);
        }
        reservationResponseDto.setPets(pets);

        return reservationResponseDto;
    }

    default ReservationPossiblePetsitterReseponseDto petsitterToReservationPossiblePetsitterReseponseDto(Petsitter petsitter){
        ReservationPossiblePetsitterReseponseDto reseponseDto = new ReservationPossiblePetsitterReseponseDto();
        reseponseDto.setMemberId(petsitter.getMember().getMemberId());
        reseponseDto.setPetsitterId(petsitter.getPetsitterId());
        reseponseDto.setName(petsitter.getMember().getName());
        reseponseDto.setNickName(petsitter.getMember().getNickName());
        reseponseDto.setPhone(petsitter.getMember().getPhone());
        reseponseDto.setEmail(petsitter.getMember().getEmail());
        reseponseDto.setAddress(petsitter.getMember().getAddress());
        reseponseDto.setPhoto(petsitter.getMember().getPhoto());
        reseponseDto.setPossiblePetType(String.valueOf(petsitter.getPossiblePetType()));
        reseponseDto.setPossibleLocation(petsitter.getPossibleLocation());
        reseponseDto.setPossibleDay(petsitter.getPossibleDay());
        reseponseDto.setPossibleTimeStart(petsitter.getPossibleTimeStart());
        reseponseDto.setPossibleTimeEnd(petsitter.getPossibleTimeEnd());
        reseponseDto.setStar(petsitter.getStar());
        return reseponseDto;
    }
}
