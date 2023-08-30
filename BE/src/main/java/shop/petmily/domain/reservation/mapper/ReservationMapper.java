package shop.petmily.domain.reservation.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.petmily.domain.reservation.dto.ReservationPatchDto;
import shop.petmily.domain.reservation.dto.ReservationPostDto;
import shop.petmily.domain.reservation.dto.ReservationResponseDto;
import shop.petmily.domain.reservation.entity.Reservation;


@Mapper(componentModel = "Spring")
public interface ReservationMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Reservation reservationPostDtoToReservation(ReservationPostDto reservationPostDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);

    @Mapping(source = "member.memberId", target = "memberId")
    ReservationResponseDto reservationToReservationResponseDto(Reservation reservation);
}
