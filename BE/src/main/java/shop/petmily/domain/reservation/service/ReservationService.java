package shop.petmily.domain.reservation.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.PetsitterRepository;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.member.service.PetsitterService;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.service.PetService;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;
import shop.petmily.domain.reservation.repository.ReservationPetRepository;
import shop.petmily.domain.reservation.repository.ReservationRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberService memberService;
    private final PetsitterRepository petsitterRepository;
    private final ReservationPetRepository reservationPetRepository;
    private final PetService petService;
    private final PetsitterService petsitterService;

    public ReservationService(ReservationRepository reservationRepository,
                              MemberService memberService,
                              PetsitterRepository petsitterRepository,
                              ReservationPetRepository reservationPetRepository,
                              PetService petService,
                              PetsitterService petsitterService) {
        this.reservationRepository = reservationRepository;
        this.memberService = memberService;
        this.petsitterRepository = petsitterRepository;
        this.reservationPetRepository = reservationPetRepository;
        this.petService = petService;
        this.petsitterService = petsitterService;
    }

    public List<Petsitter> findReservationPossiblePetsitter(Reservation reservation){

        for (ReservationPet reservationPet : reservation.getReservationPets()) {
            Long reservationPetId = reservationPet.getPet().getPetId();
            Pet findedreservationPet = petService.findPet(reservationPetId);
            petService.verifiedPetOwner(findedreservationPet.getMember().getMemberId(), reservation.getMember().getMemberId());
        }

        LocalDate localDate = reservation.getReservationDay().toLocalDate();
        String reservationDay = localDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);

        LocalTime reservationStartTime = reservation.getReservationTimeStart().toLocalTime();
        LocalTime reservationEndTime = reservation.getReservationTimeEnd().toLocalTime();

        if (reservationStartTime.isAfter(reservationEndTime)||(reservationStartTime.equals(reservationEndTime))) {
            throw new BusinessLogicException(ExceptionCode.TIME_REQUEST_NOT_ALLOWED);
        }

        Petsitter.PossiblePetType reservationPetType = verifiedReservationPetType(reservation);
        String reservationLocation = extractionAddress(reservation.getAdress());
        Date reservationDate = reservation.getReservationDay();

        List<Petsitter> petsitters = petsitterRepository.findPossiblePetsitter(reservationDay, reservationPetType, reservationLocation,
                reservation.getReservationTimeStart(), reservation.getReservationTimeEnd(), reservationDate);

        return petsitters;
    }

    public Reservation createTemporaryReservation(Reservation reservation){
        reservation.setProgress(Progress.BEFORE_PETSITTER_SELECTION);

        return reservationRepository.save(reservation);
    }

    public Reservation createReservation(Reservation reservation) {
        Reservation verifiedReservation = findVerifiedReservation(reservation.getReservationId());
        verifiedReservationOwnerMember(reservation.getMember().getMemberId(), verifiedReservation);

        Petsitter petsitter = petsitterService.findVerifiedPetsitter(reservation.getPetsitter().getPetsitterId());
        verifiedReservation.setPetsitter(petsitter);
        verifiedReservation.setProgress(Progress.RESERVATION_REQUEST);
        reservationRepository.save(verifiedReservation);

        return verifiedReservation;
    }

    public Reservation findReservation(Long reservationId) {
        Reservation reservation = findVerifiedReservation(reservationId);

        reservation.setReservationPets(
                reservationPetRepository.findByReservation(reservation));

        return reservation;
    }

    public Page<Reservation> findMemberReservations(int page, int size, Long id, String condition) {
        Member member = memberService.findMember(id);

        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
        List<Progress> progressList = Arrays.asList(Progress.RESERVATION_CANCELLED, Progress.FINISH_CARING);
        if(condition == null){
            Page<Reservation> reservations = reservationRepository.findByMember(member, pageRequest);
            return reservations;
        } else if (condition.equals("expected")) {
            Page<Reservation> expectedReservations = reservationRepository.findByMemberAndProgressNotIn(member, progressList, pageRequest);
            return expectedReservations;
        } else if (condition.equals("finish")) {
            Page<Reservation> finishReservations = reservationRepository.findByMemberAndProgressIn(member, progressList, pageRequest);
            return finishReservations;
        } else {
            Page<Reservation> reservations = reservationRepository.findByMember(member, pageRequest);
            return reservations;
        }
    }

    public Page<Reservation> findPetsitterReservations(int page, int size, Long id, String condition) {
        Petsitter petsitter= memberService.findMember(id).getPetsitter();

        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
        List<Progress> progressList = Arrays.asList(Progress.RESERVATION_CANCELLED, Progress.FINISH_CARING);

        if(condition == null) {
            Page<Reservation> reservations = reservationRepository.findByPetsitter(petsitter, pageRequest);
            return reservations;
        } else if (condition.equals("expected")) {
            Page<Reservation> expectedReservations = reservationRepository.findByPetsitterAndProgressNotIn(petsitter, progressList, pageRequest);
            return expectedReservations;
        } else if (condition.equals("finish")) {
            Page<Reservation> finishReservations = reservationRepository.findByPetsitterAndProgressIn(petsitter, progressList, pageRequest);
            return finishReservations;
        } else {
            Page<Reservation> reservations = reservationRepository.findByPetsitter(petsitter, pageRequest);
            return reservations;
        }
    }

//     예약 확정 (펫시터)
    public Reservation confirmReservationStatus(Long reservationId, Long id) {
        Reservation reservation = findVerifiedReservation(reservationId);
        Long petsitterId = memberService.findMember(id).getPetsitter().getPetsitterId();
        verifiedReservationOwnerPetSitter(petsitterId, reservation);

        if (reservation.getProgress() != Progress.RESERVATION_REQUEST) {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CONFIRM);
        }

        reservation.setProgress(Progress.RESERVATION_CONFIRMED);
        return reservationRepository.save(reservation);
    }

//     예약 취소 (펫시터)
    public Reservation cancelReservationPetsitter(Long reservationId, Long id) {
        Reservation reservation = findVerifiedReservation(reservationId);
        Long petsitterId = memberService.findMember(id).getPetsitter().getPetsitterId();

        verifiedReservationOwnerPetSitter(petsitterId, reservation);

        if (reservation.getProgress() == Progress.RESERVATION_CONFIRMED) {
            reservation.setProgress(Progress.RESERVATION_CANCELLED);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CANCEL);
        }
        return reservationRepository.save(reservation);
    }

    //예약취소(회원)
    public Reservation cancelReservationMember(Long reservationId, Long id) {
        Reservation reservation = findVerifiedReservation(reservationId);

        verifiedReservationOwnerMember(id, reservation);

        if (reservation.getProgress() == Progress.RESERVATION_REQUEST) {
            reservation.setProgress(Progress.RESERVATION_CANCELLED);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CANCEL);
        }
        return reservationRepository.save(reservation);
    }


    // 유효한 예약인지 확인
    public Reservation findVerifiedReservation(Long reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Reservation findReservation = optionalReservation.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_EXIST)
        );

        return findReservation;
    }

    // 예약에 해당하는 회원인지 확인
    public void verifiedReservationOwnerMember(Long memberId, Reservation verifiedReservation){
        if (memberId != verifiedReservation.getMember().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }

//     예약에 해당하는 펫시터인지 확인
    public void verifiedReservationOwnerPetSitter(Long petSitterId, Reservation verifiedReservation) {
        if (petSitterId != verifiedReservation.getPetsitter().getPetsitterId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }

    @Scheduled(cron = "0 1,31 * * * *") // 1분, 31분마다 예약체크 > 취소가아나면서 시간지낫으면 예약완료
    public void reservationCompleteCheck() {
        Date today = Date.valueOf(LocalDateTime.now().toLocalDate());

        List<Reservation> reservations = reservationRepository.findByReservationDay(today);

        for (Reservation reservation : reservations) {
            LocalTime reservationEndTime = reservation.getReservationTimeEnd().toLocalTime();

            if (reservationEndTime.isBefore(LocalTime.now()) && reservation.getProgress() != Progress.RESERVATION_CANCELLED) {
                reservation.setProgress(Progress.FINISH_CARING);
                reservationRepository.save(reservation);
            }
        }
    }


    public Petsitter.PossiblePetType verifiedReservationPetType(Reservation reservation){
        boolean hasCat = false;
        boolean hasDog = false;
        Petsitter.PossiblePetType reservationPetType = null;

        for (ReservationPet reservationPet :reservation.getReservationPets()) {
            Long petId = (Long) reservationPet.getPet().getPetId();
            Pet pet =  petService.findPet(petId);

            if (pet.getType().equals(Pet.PetType.CAT)) hasCat = true;
            if (pet.getType().equals(Pet.PetType.DOG)) hasDog = true;
            if (hasCat && hasDog) break;
        }

        if (hasCat && hasDog) {
            reservationPetType = Petsitter.PossiblePetType.PET_ALL;
        } else if (hasCat) {
            reservationPetType = Petsitter.PossiblePetType.PET_CAT;
        } else if (hasDog) {
            reservationPetType = Petsitter.PossiblePetType.PET_DOG;
        }

        return reservationPetType;

    }

    public String extractionAddress(String originAdress){
        Pattern pattern = Pattern.compile("(서울|대전|대구|울산|부산|광주|세종특별자치시)\\s([가-힣]+[구군])?|([가-힣]+[시군])\\s([가-힣]+[구])?");
        Matcher matcher = pattern.matcher(originAdress);

        if (matcher.find()) {
            return matcher.group().trim();
        }

        throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_ADDRESS);
    }

    // 예약 내용 수정
//    public Reservation updateReservation(Reservation reservation) {
//        Reservation findReservation = findVerifiedReservation(reservation.getReservationId());
//
//        verifiedReservationOwnerMember(reservation.getMember().getMemberId(), findReservation);
//
//        Optional.ofNullable(reservation.getReservationTimeStart())
//                .ifPresent(findReservation::setReservationTimeStart);
//        Optional.ofNullable(reservation.getReservationTimeEnd())
//                .ifPresent(findReservation::setReservationTimeEnd);
//        Optional.ofNullable(reservation.getBody())
//                .ifPresent(findReservation::setBody);
//
//        reservationRepository.save(findReservation);
//        findReservation.setLastModifiedAt(LocalDateTime.now());
//        return findReservation;
//    }

    //    예약 삭제
//    public void deleteReservation(long reservationId, long memberId) {
//        Reservation findReservation = findVerifiedReservation(reservationId);
//        verifiedReservationOwner(memberId, findReservation);
//
//        reservationRepository.delete(findReservation);
//    }

//    public List<Petsitter> findDayTimePossiblePetsitters(Reservation reservation, String type, String location){

//        List<Petsitter> dayTimePossiblePetsitters = new ArrayList<>();
//        for (Petsitter petsitter : dayPossiblePetsitters) {
//            LocalTime petsitterPossibleTimeStart = petsitter.getPossibleTimeStart().toLocalTime();
//            LocalTime petsitterPossibleTimeEnd = petsitter.getPossibleTimeEnd().toLocalTime();
//
//            if ((petsitterPossibleTimeStart.equals(reservationStartTime) || petsitterPossibleTimeStart.isBefore(reservationStartTime)) &&
//                    (petsitterPossibleTimeEnd.equals(reservationEndTime) || petsitterPossibleTimeEnd.isAfter(reservationEndTime))) {
//                dayTimePossiblePetsitters.add(petsitter);
//            }
//        }

    //        return dayPossiblePetsitters;
//    }
}
