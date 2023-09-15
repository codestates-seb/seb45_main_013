package shop.petmily.domain.reservation.mapper;

import org.mapstruct.Mapper;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.reservation.dto.PossiblePetsitterDto;
import shop.petmily.domain.reservation.dto.ReservationPostDto;
import shop.petmily.domain.reservation.dto.ReservationsDto;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface ReservationMapper {

    default Reservation possiblePetsitterDtoToReservation(PossiblePetsitterDto.Request requestBody){
        Reservation reservation = new Reservation();

        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        reservation.setMember(member);

        reservation.setReservationDay(requestBody.getReservationDay());
        reservation.setReservationTimeStart(requestBody.getReservationTimeStart());
        reservation.setReservationTimeEnd(requestBody.getReservationTimeEnd());
        reservation.setAddress(requestBody.getAddress());

        List<ReservationPet> reservationPets = requestBody.getPetId().stream()
                .map(petId -> {
                    ReservationPet reservationPet = new ReservationPet();
                    reservationPet.setReservation(reservation);
                    Pet pet = new Pet();
                    pet.setPetId(petId);
                    reservationPet.setPet(pet);
                    return reservationPet;
                }).collect(Collectors.toList());
        reservation.setReservationPets(reservationPets);

        return reservation;
    }

    default Reservation reservationPostDtoToReservation(ReservationPostDto.Request requestBody){
        Reservation reservation = new Reservation();

        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        reservation.setMember(member);

        reservation.setBody(requestBody.getBody());
        reservation.setPhone(requestBody.getPhone());
        reservation.setAddress(requestBody.getAddress());
        reservation.setReservationDay(requestBody.getReservationDay());
        reservation.setReservationTimeStart(requestBody.getReservationTimeStart());
        reservation.setReservationTimeEnd(requestBody.getReservationTimeEnd());

        List<ReservationPet> reservationPets = requestBody.getPetId().stream()
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
        petsitter.setPetsitterId(requestBody.getPetsitterId());
        reservation.setPetsitter(petsitter);

        return reservation;
    }

    default ReservationsDto.MemberResponse reservationToReservationMemberResponseDto(Reservation reservation){
        ReservationsDto.MemberResponse response = new ReservationsDto.MemberResponse();

        response.setReservationId(reservation.getReservationId());
        response.setReservationDay(reservation.getReservationDay());
        response.setReservationTimeStart(reservation.getReservationTimeStart());
        response.setReservationTimeEnd(reservation.getReservationTimeEnd());
        response.setAddress(reservation.getAddress());
        response.setReservationPhone(reservation.getPhone());
        response.setReservationBody(reservation.getBody());
        response.setProgress(reservation.getProgress());

        response.setPetsitterId(reservation.getPetsitter().getPetsitterId());
        response.setPetsitterName(reservation.getPetsitter().getMember().getName());
        response.setPetsitterPhone(reservation.getPetsitter().getMember().getPhone());
        response.setPetsitterPhoto(reservation.getPetsitter().getMember().getPhoto());
        response.setPetsitterNickName(reservation.getPetsitter().getMember().getNickName());

        List<ReservationsDto.PetResponse> pets = reservation.getReservationPets().stream()
                .map(reservationPet -> {
                    ReservationsDto.PetResponse petResponseDto = new ReservationsDto.PetResponse();
                    petResponseDto.setPetId(reservationPet.getPet().getPetId());
                    petResponseDto.setName(reservationPet.getPet().getName());
                    return petResponseDto;
                }).collect(Collectors.toList());
        response.setPets(pets);

        return response;
    }

    default ReservationsDto.PetsitterResponse reservationToReservationPetsitterResponseDto(Reservation reservation){
        ReservationsDto.PetsitterResponse response = new ReservationsDto.PetsitterResponse();

        response.setReservationId(reservation.getReservationId());
        response.setReservationDay(reservation.getReservationDay());
        response.setReservationTimeStart(reservation.getReservationTimeStart());
        response.setReservationTimeEnd(reservation.getReservationTimeEnd());
        response.setAddress(reservation.getAddress());
        response.setReservationPhone(reservation.getPhone());
        response.setReservationBody(reservation.getBody());
        response.setProgress(reservation.getProgress());

        response.setMemberId(reservation.getMember().getMemberId());
        response.setMemberName(reservation.getMember().getName());
        response.setMemberNickName(reservation.getMember().getNickName());
        response.setMemberPhoto(reservation.getMember().getPhoto());
        response.setMemberPhoto(reservation.getMember().getBody());

        List<ReservationsDto.PetResponse> pets = reservation.getReservationPets().stream()
                .map(reservationPet -> {
                    ReservationsDto.PetResponse petResponseDto = new ReservationsDto.PetResponse();
                    petResponseDto.setPetId(reservationPet.getPet().getPetId());
                    petResponseDto.setName(reservationPet.getPet().getName());
                    return petResponseDto;
                }).collect(Collectors.toList());
        response.setPets(pets);

        return response;
    }
}
