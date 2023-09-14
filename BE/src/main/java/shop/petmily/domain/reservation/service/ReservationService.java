package shop.petmily.domain.reservation.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.PetsitterQueryDsl;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.member.service.PetsitterService;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.service.PetService;
import shop.petmily.domain.reservation.dto.PetsitterScheduledResponseDto;
import shop.petmily.domain.reservation.dto.PossiblePetsitterDto;
import shop.petmily.domain.reservation.dto.ReservationDetailsDto;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.entity.ReservationPet;
import shop.petmily.domain.reservation.repository.ReservationQueryDsl;
import shop.petmily.domain.reservation.repository.ReservationRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberService memberService;
    private final PetService petService;
    private final PetsitterService petsitterService;
    private final PetsitterQueryDsl petsitterQueryDsl;
    private final ReservationQueryDsl reservationQueryDsl;

    public ReservationService(ReservationRepository reservationRepository,
                              MemberService memberService,
                              PetService petService,
                              PetsitterService petsitterService,
                              PetsitterQueryDsl petsitterQueryDsl,
                              ReservationQueryDsl reservationQueryDsl) {
        this.reservationRepository = reservationRepository;
        this.memberService = memberService;
        this.petService = petService;
        this.petsitterService = petsitterService;
        this.petsitterQueryDsl = petsitterQueryDsl;
        this.reservationQueryDsl = reservationQueryDsl;
    }

    //예약정보로 예약이 가능한 펫시터를 찾는다
    public List<PossiblePetsitterDto.Response> findReservationPossiblePetsitter(Reservation reservation){

        verificationReservationTime(reservation.getReservationTimeStart(), reservation.getReservationTimeEnd());
        List<ReservationPet> verifiedReservationPets = verificationReservationPets(reservation);

        Petsitter.PossiblePetType reservationPetType = verificationReservationPetType(verifiedReservationPets);
        String reservationWeekDay = getReservationWeekDay(reservation.getReservationDay());
        String reservationLocation = extractionAddress(reservation.getAddress());

        return petsitterQueryDsl.findPossiblePetsitters(reservationWeekDay, reservationPetType, reservationLocation,
        reservation.getReservationTimeStart(), reservation.getReservationTimeEnd(), reservation.getReservationDay());
    }

    //예약정보와 펫시터정보를 검증하고 예약을 생성한다.
    public void createReservation(Reservation reservation) {

        verificationReservationTime(reservation.getReservationTimeStart(), reservation.getReservationTimeEnd());

        Member findedMember = memberService.findMember(reservation.getMember().getMemberId());
        reservation.setMember(findedMember);

        List<ReservationPet> verifiedReservationPet = verificationReservationPets(reservation);
        reservation.setReservationPets(verifiedReservationPet);

        Petsitter petsitter = petsitterService.findVerifiedPetsitter(reservation.getPetsitter().getPetsitterId());
        petsitterReservationCheck(petsitter, reservation);
        petsitterPossibleCheck(petsitter, reservation);

        reservation.setPetsitter(petsitter);
        reservation.setProgress(Progress.RESERVATION_REQUEST);

        reservationRepository.save(reservation);
    }

    //예약정보 1개찾기
    public ReservationDetailsDto.Response findReservation(Long reservationId) {
        Reservation reservation = findVerifiedReservation(reservationId);

        ReservationDetailsDto.Response response = reservationQueryDsl.findReservationDetails(reservation);
        response.setMember(reservationQueryDsl.findReservationMember(reservation));
        response.setPetsitter(reservationQueryDsl.findReservationPetsitter(reservation));
        response.setPets(reservationQueryDsl.findReservationPets(reservation));

        return response;
    }

    //멤버의 예약정보 전체조회 or 조건에따라 조회
    public Page<Reservation> findMemberReservations(int page, int size, Long id, String condition) {
        Member member = memberService.findMember(id);

        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
        List<Progress> progressList = Arrays.asList(Progress.RESERVATION_CANCELLED, Progress.FINISH_CARING);

        if(condition == null){
            return reservationRepository.findByMember(member, pageRequest);
        } else if (condition.equals("expected")) {
            return reservationRepository.findByMemberAndProgressNotIn(member, progressList, pageRequest);
        } else if (condition.equals("finish")) {
            return reservationRepository.findByMemberAndProgressIn(member, progressList, pageRequest);
        } else {
            throw new BusinessLogicException(ExceptionCode.WARNING);
        }

    }

    //펫시터의 예약정보 전체조회 or 조건에따라 조회
    public Page<Reservation> findPetsitterReservations(int page, int size, Long id, String condition) {
        Petsitter petsitter= memberService.findMember(id).getPetsitter();

        PageRequest pageRequest = PageRequest.of(page-1, size, Sort.Direction.DESC,("reservationId"));
        List<Progress> progressList = Arrays.asList(Progress.RESERVATION_CANCELLED, Progress.FINISH_CARING);

        if(condition == null) {
            return reservationRepository.findByPetsitter(petsitter, pageRequest);
        } else if (condition.equals("expected")) {
            return reservationRepository.findByPetsitterAndProgressNotIn(petsitter, progressList, pageRequest);
        } else if (condition.equals("finish")) {
            return reservationRepository.findByPetsitterAndProgressIn(petsitter, progressList, pageRequest);
        } else {
            throw new BusinessLogicException(ExceptionCode.WARNING);
        }

    }

    //펫시터 예약정보만 조회
    public List<PetsitterScheduledResponseDto> getPetsitterSchedule(long petsitterId) {
        Petsitter petsitter = petsitterService.findVerifiedPetsitter(petsitterId);
        return reservationQueryDsl.findPetsitterSchedule(petsitter);
    }

    //예약 확정 (펫시터)
    public void confirmReservationStatus(Long reservationId, Long id) {
        Reservation reservation = findVerifiedReservation(reservationId);
        Long petsitterId = memberService.findMember(id).getPetsitter().getPetsitterId();
        verifiedReservationOwnerPetSitter(petsitterId, reservation);

        if (reservation.getProgress() != Progress.RESERVATION_REQUEST) {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CONFIRM);
        }

        reservation.setProgress(Progress.RESERVATION_CONFIRMED);
        reservationRepository.save(reservation);
    }

    //예약 취소 (펫시터)
    public void cancelReservationPetsitter(Long reservationId, Long id) {
        Reservation reservation = findVerifiedReservation(reservationId);
        Long petsitterId = memberService.findMember(id).getPetsitter().getPetsitterId();

        verifiedReservationOwnerPetSitter(petsitterId, reservation);

        if (reservation.getProgress() == Progress.RESERVATION_CONFIRMED) {
            reservation.setProgress(Progress.RESERVATION_CANCELLED);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CANCEL);
        }
        reservationRepository.save(reservation);
    }

    //예약취소(회원)
    public void cancelReservationMember(Long reservationId, Long id) {
        Reservation reservation = findVerifiedReservation(reservationId);

        verifiedReservationOwnerMember(id, reservation);

        if (reservation.getProgress() == Progress.RESERVATION_REQUEST) {
            reservation.setProgress(Progress.RESERVATION_CANCELLED);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CANCEL);
        }
        reservationRepository.save(reservation);
    }

    // 유효한 예약인지 확인
    public Reservation findVerifiedReservation(Long reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);

        return optionalReservation.orElseThrow(() -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_EXIST));
    }

    // 예약에 해당하는 회원인지 확인
    public void verifiedReservationOwnerMember(Long memberId, Reservation verifiedReservation){
        if (!memberId.equals(verifiedReservation.getMember().getMemberId()))
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
    }

    //     예약에 해당하는 펫시터인지 확인
    public void verifiedReservationOwnerPetSitter(Long petSitterId, Reservation verifiedReservation) {
        if (!petSitterId.equals(verifiedReservation.getPetsitter().getPetsitterId()))
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
    }

    private String getReservationWeekDay(LocalDate reservationDate){
        return reservationDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);
    }

    // 0분, 30분마다 예약체크
    @Scheduled(cron = "1 0,30 * * * *")
    public void reservationCompleteCheck() {
        List<Reservation> reservations = reservationQueryDsl.findReservationsByDateTime();

        reservations
                .forEach(reservation -> {
                    if(reservation.getProgress() == Progress.RESERVATION_REQUEST) reservation.setProgress(Progress.RESERVATION_CANCELLED);
                    if(reservation.getProgress() == Progress.RESERVATION_CONFIRMED) reservation.setProgress(Progress.FINISH_CARING);
                    reservationRepository.save(reservation);
                });
    }

    private void verificationReservationTime(LocalTime reservationTimeStart, LocalTime reservationTimeEnd) {
        if (reservationTimeStart.isAfter(reservationTimeEnd)
                ||(reservationTimeStart.equals(reservationTimeEnd))) {
            throw new BusinessLogicException(ExceptionCode.TIME_REQUEST_NOT_ALLOWED);
        }
    }

    private void petsitterReservationCheck(Petsitter petsitter, Reservation reservation){
        if (petsitterQueryDsl.petsitterReservationCheck(petsitter, reservation.getReservationTimeStart(),
                reservation.getReservationTimeEnd(), reservation.getReservationDay()))
            throw new BusinessLogicException(ExceptionCode.ALREADY_RESERVATION);
    }

    private void petsitterPossibleCheck(Petsitter petsitter, Reservation reservation){
        String reservationWeekDay = getReservationWeekDay(reservation.getReservationDay());
        String reservationLocation = extractionAddress(reservation.getAddress());
        Petsitter.PossiblePetType reservationPetType = verificationReservationPetType(reservation.getReservationPets());

        if (petsitterQueryDsl.petsitterPossibleCheck(petsitter, reservationWeekDay, reservationPetType, reservationLocation,
                reservation.getReservationTimeStart(), reservation.getReservationTimeEnd()))
            throw new BusinessLogicException(ExceptionCode.NOT_AVAILABLE_PETSITTER);
    }

    private List<ReservationPet> verificationReservationPets(Reservation reservation){
        return reservation.getReservationPets().stream()
                .peek(reservationPet -> {
                    Long reservationPetId = reservationPet.getPet().getPetId();
                    Pet findedReservationPet = petService.findPet(reservationPetId);
                    petService.verifiedPetOwner(findedReservationPet.getMember().getMemberId(), reservation.getMember().getMemberId());
                    reservationPet.setPet(findedReservationPet);
                }).collect(Collectors.toList());
    }

    //예약으로 들어온 pet 타입 확인
    private Petsitter.PossiblePetType verificationReservationPetType(List<ReservationPet> reservationPets) {
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

    //예약주소에서 시,군,구 만 추출
    private String extractionAddress(String originAddress){
        Pattern pattern = Pattern.compile("(서울|대전|대구|울산|부산|광주|세종특별자치시)\\s([가-힣]+[구군])?|([가-힣]+[시군])\\s([가-힣]+구)?");
        Matcher matcher = pattern.matcher(originAddress);

        if (matcher.find()) {
            return matcher.group().trim();
        }

        throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_ADDRESS);
    }
}
