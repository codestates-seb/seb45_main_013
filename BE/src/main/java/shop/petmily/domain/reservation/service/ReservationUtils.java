package shop.petmily.domain.reservation.service;

import org.springframework.stereotype.Component;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.PetsitterQueryDsl;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.service.PetService;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;
import shop.petmily.domain.reservation.repository.ReservationRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class ReservationUtils {
    private final ReservationRepository reservationRepository;
    private final PetsitterQueryDsl petsitterQueryDsl;
    private final PetService petService;

    public ReservationUtils(ReservationRepository reservationRepository,
                            PetsitterQueryDsl petsitterQueryDsl,
                            PetService petService) {
        this.reservationRepository = reservationRepository;
        this.petsitterQueryDsl = petsitterQueryDsl;
        this.petService = petService;
    }

    // 유효한 예약인지 확인
    public Reservation verificationReservation(Long reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);

        return optionalReservation.orElseThrow(() -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_EXIST));
    }

    // 예약에 해당하는 회원인지 확인
    public void verificationReservationOwnerMember(Long memberId, Reservation verifiedReservation){
        if (!memberId.equals(verifiedReservation.getMember().getMemberId()))
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
    }

    // 예약에 해당하는 펫시터인지 확인
    public void verificationReservationOwnerPetSitter(Long petSitterId, Reservation verifiedReservation) {
        if (!petSitterId.equals(verifiedReservation.getPetsitter().getPetsitterId()))
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
    }

    //펫시터의 예약이 중복되지 않는지 확인
    public void petsitterScheduleCheck(Petsitter petsitter, Reservation reservation){
        String reservationWeekDay = getReservationWeekDay(reservation.getReservationDay());
        String reservationLocation = extractionAddress(reservation.getAddress());
        Petsitter.PossiblePetType reservationPetType = verificationReservationPetType(reservation.getReservationPets());

        if (petsitterQueryDsl.petsitterPossibleCheck(petsitter, reservationWeekDay, reservationPetType, reservationLocation,
                reservation.getReservationTimeStart(), reservation.getReservationTimeEnd()))
            throw new BusinessLogicException(ExceptionCode.NOT_AVAILABLE_PETSITTER);
    }

    //해당 예약이 가능한 펫시터인지 확인
    public void petsitterPossibleCheck(Petsitter petsitter, Reservation reservation){
        if (petsitterQueryDsl.petsitterReservationCheck(petsitter, reservation.getReservationTimeStart(),
                reservation.getReservationTimeEnd(), reservation.getReservationDay()))
            throw new BusinessLogicException(ExceptionCode.ALREADY_RESERVATION);
    }

    //예약신청이 들어온 펫 검증
    public List<ReservationPet> verificationReservationPets(Reservation reservation){
        return reservation.getReservationPets().stream()
                .peek(reservationPet -> {
                    Long reservationPetId = reservationPet.getPet().getPetId();
                    Pet findedReservationPet = petService.findPet(reservationPetId);
                    petService.verifiedPetOwner(findedReservationPet.getMember().getMemberId(), reservation.getMember().getMemberId());
                    reservationPet.setPet(findedReservationPet);
                }).collect(Collectors.toList());
    }

    //예약으로 들어온 펫 타입 확인
    public Petsitter.PossiblePetType verificationReservationPetType(List<ReservationPet> reservationPets) {
        boolean hasCat = reservationPets.stream()
                .anyMatch(reservationPet -> reservationPet.getPet().getType() == Pet.PetType.CAT);

        boolean hasDog = reservationPets.stream()
                .anyMatch(reservationPet -> reservationPet.getPet().getType() == Pet.PetType.DOG);

        if (hasCat && hasDog) {
            return Petsitter.PossiblePetType.PET_ALL;
        } else if (hasCat) {
            return Petsitter.PossiblePetType.PET_CAT;
        } else if (hasDog) {
            return Petsitter.PossiblePetType.PET_DOG;
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_CAT_DOG);
        }
    }

    //예약 시간 검증
    public void verificationReservationTime(LocalTime reservationTimeStart, LocalTime reservationTimeEnd) {
        if (reservationTimeStart.isAfter(reservationTimeEnd)
                ||(reservationTimeStart.equals(reservationTimeEnd))) {
            throw new BusinessLogicException(ExceptionCode.TIME_REQUEST_NOT_ALLOWED);
        }
    }

    //예약주소에서 시,군,구 만 추출
    public String extractionAddress(String originAddress){
        Pattern pattern = Pattern.compile("(서울|대전|대구|울산|부산|광주|세종특별자치시)\\s([가-힣]+[구군])?|([가-힣]+[시군])\\s([가-힣]+구)?");
        Matcher matcher = pattern.matcher(originAddress);

        if (matcher.find()) {
            return matcher.group().trim();
        }

        throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_ADDRESS);
    }

    //예약날짜를 요일로 바꿈
    public String getReservationWeekDay(LocalDate reservationDate){
        return reservationDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);
    }
}
