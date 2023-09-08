package shop.petmily.domain.reservation.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.pet.dto.PetResponseDto;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.reservation.dto.*;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "Spring")
public interface ReservationMapper {

    default Reservation reservationPostDtoToReservation(ReservationPostDto reservationPostDto){
        Reservation reservation = new Reservation();
        Member member = new Member();
        member.setMemberId(reservationPostDto.getMemberId());
        reservation.setMember(member);

        reservation.setBody(reservationPostDto.getBody());
        reservation.setPhone(reservationPostDto.getPhone());
        reservation.setAddress(reservationPostDto.getAddress());
        reservation.setReservationDay(reservationPostDto.getReservationDay());
        reservation.setReservationTimeStart(reservationPostDto.getReservationTimeStart());
        reservation.setReservationTimeEnd(reservationPostDto.getReservationTimeEnd());

        List<ReservationPet> reservationPets = reservationPostDto.getPetId().stream()
                .map(petId -> {
                    ReservationPet reservationPet = new ReservationPet();
                    reservationPet.setReservation(reservation);
                    Pet pet = new Pet();
                    pet.setPetId(petId);
                    reservationPet.setPet(pet);
                    return reservationPet;
                }).collect(Collectors.toList());
        reservation.setReservationPets(reservationPets);

        Petsitter petsitter = new Petsitter();
        petsitter.setPetsitterId(reservationPostDto.getPetsitterId());
        reservation.setPetsitter(petsitter);

        return reservation;
    }

//    @Mapping(source = "memberId", target = "member.memberId")
//    @Mapping(source = "petsitterId", target = "petsitter.petsitterId")
//    Reservation reservationCreateDtoToRservation(ReservationCreateDto reservationCreateDto);

//    @Mapping(source = "memberId", target = "member.memberId")
//    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);

    default ReservationResponseDto reservationToReservationResponseDto(Reservation reservation){
        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();

        reservationResponseDto.setReservationId(reservation.getReservationId());
        reservationResponseDto.setMemberId(reservation.getMember().getMemberId());
        reservationResponseDto.setName(reservation.getMember().getName());
        reservationResponseDto.setReservationDay(reservation.getReservationDay());
        reservationResponseDto.setReservationTimeStart(reservation.getReservationTimeStart());
        reservationResponseDto.setReservationTimeEnd(reservation.getReservationTimeEnd());
        reservationResponseDto.setAddress(reservation.getAddress());
        reservationResponseDto.setPhone(reservation.getPhone());
        reservationResponseDto.setMemberBody(reservation.getBody());

        if (reservation.getPetsitter() == null){
            reservationResponseDto.setPetsitterId(null);
            reservationResponseDto.setPetsitterName(null);
            reservationResponseDto.setPetsitterPhone(null);
            reservationResponseDto.setPetsitterBody(null);
        }else {
            reservationResponseDto.setPetsitterId(reservation.getPetsitter().getPetsitterId());
            reservationResponseDto.setPetsitterName(reservation.getPetsitter().getMember().getName());
            reservationResponseDto.setPetsitterPhone(reservation.getPetsitter().getMember().getPhone());
            reservationResponseDto.setPetsitterBody(reservation.getPetsitter().getMember().getBody());
        }
        reservationResponseDto.setCreatedAt(reservation.getCreatedAt());
        reservationResponseDto.setLastModifiedAt(reservation.getLastModifiedAt());
        reservationResponseDto.setProgress(reservation.getProgress());

        List<PetResponseDto> pets = reservation.getReservationPets().stream()
                .map(reservationPet -> {
                    PetResponseDto petResponseDto = new PetResponseDto();
                    petResponseDto.setPetId(reservationPet.getPet().getPetId());
                    petResponseDto.setMemberId(reservation.getMember().getMemberId());
                    petResponseDto.setType(reservationPet.getPet().getType());
                    petResponseDto.setName(reservationPet.getPet().getName());
                    petResponseDto.setAge(reservationPet.getPet().getAge());
                    petResponseDto.setSpecies(reservationPet.getPet().getSpecies());
                    petResponseDto.setWeight(reservationPet.getPet().getWeight());
                    petResponseDto.setPhoto(reservationPet.getPet().getPhoto());
                    petResponseDto.setBody(reservationPet.getPet().getBody());
                    petResponseDto.setMale(reservationPet.getPet().getMale());
                    petResponseDto.setNeutering(reservationPet.getPet().getNeutering());
                    petResponseDto.setCreatedAt(reservationPet.getPet().getCreatedAt());
                    petResponseDto.setLastModifiedAt(reservationPet.getPet().getLastModifiedAt());
                    return petResponseDto;
                }).collect(Collectors.toList());
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
        reseponseDto.setBody(petsitter.getMember().getBody());
        reseponseDto.setPossiblePetType(String.valueOf(petsitter.getPossiblePetType()));
        reseponseDto.setPossibleLocation(petsitter.getPossibleLocation());
        reseponseDto.setPossibleDay(petsitter.getPossibleDay());
        reseponseDto.setPossibleTimeStart(petsitter.getPossibleTimeStart());
        reseponseDto.setPossibleTimeEnd(petsitter.getPossibleTimeEnd());
        reseponseDto.setStar(petsitter.getStar());
        reseponseDto.setReviewCount(petsitter.getReviewCount());
        return reseponseDto;
    }
}
