package shop.petmily.domain.reservation.mapper;

import org.mapstruct.Mapper;
import shop.petmily.domain.reservation.dto.ReservationPatchDto;
import shop.petmily.domain.reservation.dto.ReservationPostDto;
import shop.petmily.domain.reservation.dto.ReservationResponseDto;
import shop.petmily.domain.reservation.entity.Reservation;


@Mapper(componentModel = "Spring")
public interface ReservationMapper {
    Reservation reservationPostDtoToReservation(ReservationPostDto reservationPostDto);

    Reservation reservationPatchDtoToReservation(ReservationPatchDto reservationPatchDto);

    ReservationResponseDto reservationToReservationResponseDto(Reservation reservation);
}
