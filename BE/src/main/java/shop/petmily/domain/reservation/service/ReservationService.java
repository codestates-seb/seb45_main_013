package shop.petmily.domain.reservation.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.MemberRepository;
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
import java.sql.Timestamp;
import java.time.*;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final PetsitterRepository petsitterRepository;
    private final ReservationPetRepository reservationPetRepository;
    private final PetService petService;
    private final PetsitterService petsitterService;

    public ReservationService(ReservationRepository reservationRepository,
                              MemberRepository memberRepository,
                              MemberService memberService,
                              PetsitterRepository petsitterRepository,
                              ReservationPetRepository reservationPetRepository,
                              PetService petService,
                              PetsitterService petsitterService) {
        this.reservationRepository = reservationRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.petsitterRepository = petsitterRepository;
        this.reservationPetRepository = reservationPetRepository;
        this.petService = petService;
        this.petsitterService = petsitterService;
    }

    public List<Petsitter> findReservationPossiblePetsitter(Reservation reservation){
        LocalDate localDate = reservation.getReservationDay().toLocalDate();
        String reservationDay = localDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);

        LocalTime reservationStartTime = reservation.getReservationTimeStart().toLocalTime();
        LocalTime reservationEndTime = reservation.getReservationTimeEnd().toLocalTime();

        if (reservationStartTime.isAfter(reservationEndTime)||(reservationStartTime.equals(reservationEndTime))) {
            throw new BusinessLogicException(ExceptionCode.TIME_REQUEST_NOT_ALLOWED);
        }

        String reservationPetType = verifiedReservationPetType(reservation);
        String reservationLocation = reservation.getAdress();
        Date reservationDate = reservation.getReservationDay();

        List<Petsitter> petsitters = petsitterRepository.findPossiblePetsitter(reservationDay, reservationPetType, reservationLocation,
                reservationStartTime, reservationEndTime, reservationDate);

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
                reservationPetRepository.findByReservation_ReservationId(reservation.getReservationId()));

        return reservation;
    }

    public Page<Reservation> findMemberReservations(int page, int size, Long id) {
        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
        Page<Reservation> reservations = reservationRepository.findByMember_MemberId(id, pageRequest);
        return reservations;
    }

    public Page<Reservation> findPetsitterReservations(int page, int size, Long id) {
        Long petsitterId = memberService.findMember(id).getPetsitter().getPetsitterId();

        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
        Page<Reservation> reservations = reservationRepository.findByPetsitter_PetsitterId(petsitterId, pageRequest);
        return reservations;
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


    public String verifiedReservationPetType(Reservation reservation){
        boolean hasCat = false;
        boolean hasDog = false;
        String reservationPetType = "";

        for (ReservationPet reservationPet :reservation.getReservationPets()) {
            Long petId = (Long) reservationPet.getPet().getPetId();
            Pet pet =  petService.findPet(petId);

            if (pet.getType().equals(Pet.PetType.CAT)) hasCat = true;
            if (pet.getType().equals(Pet.PetType.DOG)) hasDog = true;
            if (hasCat && hasDog) break;
        }

        if (hasCat && hasDog) {
            reservationPetType = String.valueOf(Petsitter.PossiblePetType.PET_ALL);
        } else if (hasCat) {
            reservationPetType = String.valueOf(Petsitter.PossiblePetType.PET_CAT);
        } else if (hasDog) {
            reservationPetType = String.valueOf(Petsitter.PossiblePetType.PET_DOG);
        }

        return reservationPetType;

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
