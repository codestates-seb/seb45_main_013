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
import shop.petmily.domain.reservation.dto.PetsitterScheduleDto;
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
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberService memberService;
    private final PetsitterService petsitterService;
    private final PetsitterQueryDsl petsitterQueryDsl;
    private final ReservationQueryDsl reservationQueryDsl;
    private final ReservationUtils reservationUtils;

    public ReservationService(ReservationRepository reservationRepository,
                              MemberService memberService,
                              PetsitterService petsitterService,
                              PetsitterQueryDsl petsitterQueryDsl,
                              ReservationQueryDsl reservationQueryDsl,
                              ReservationUtils reservationUtils) {
        this.reservationRepository = reservationRepository;
        this.memberService = memberService;
        this.petsitterService = petsitterService;
        this.petsitterQueryDsl = petsitterQueryDsl;
        this.reservationQueryDsl = reservationQueryDsl;
        this.reservationUtils = reservationUtils;
    }

    //예약정보로 예약이 가능한 펫시터를 찾는다
    public List<PossiblePetsitterDto.Response> findReservationPossiblePetsitter(Reservation reservation){

        reservationUtils.verificationReservationTime(reservation.getReservationTimeStart(), reservation.getReservationTimeEnd());
        List<ReservationPet> verifiedReservationPets = reservationUtils.verificationReservationPets(reservation);

        Petsitter.PossiblePetType reservationPetType = reservationUtils.verificationReservationPetType(verifiedReservationPets);
        String reservationWeekDay = reservationUtils.getReservationWeekDay(reservation.getReservationDay());
        String reservationLocation = reservationUtils.extractionAddress(reservation.getAddress());

        return petsitterQueryDsl.findPossiblePetsitters(reservationWeekDay, reservationPetType, reservationLocation,
        reservation.getReservationTimeStart(), reservation.getReservationTimeEnd(), reservation.getReservationDay());
    }

    //예약정보와 펫시터정보를 검증하고 예약을 생성한다.
    public void createReservation(Reservation reservation) {

        reservationUtils.verificationReservationTime(reservation.getReservationTimeStart(), reservation.getReservationTimeEnd());

        Member findedMember = memberService.findMember(reservation.getMember().getMemberId());
        reservation.setMember(findedMember);

        List<ReservationPet> verifiedReservationPet = reservationUtils.verificationReservationPets(reservation);
        reservation.setReservationPets(verifiedReservationPet);

        Petsitter petsitter = petsitterService.findVerifiedPetsitter(reservation.getPetsitter().getPetsitterId());
        reservationUtils.petsitterPossibleCheck(petsitter, reservation);
        reservationUtils.petsitterScheduleCheck(petsitter, reservation);

        reservation.setPetsitter(petsitter);
        reservation.setProgress(Progress.RESERVATION_REQUEST);

        reservationRepository.save(reservation);
    }

    //예약정보 1개찾기
    public ReservationDetailsDto.Response findReservation(Long reservationId) {
        Reservation reservation = reservationUtils.verificationReservation(reservationId);

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

    //펫시터 오늘이후 스케쥴 조회
    public List<PetsitterScheduleDto.Response> getPetsitterSchedule(long petsitterId) {
        Petsitter petsitter = petsitterService.findVerifiedPetsitter(petsitterId);
        return reservationQueryDsl.findPetsitterSchedule(petsitter);
    }

    //예약 확정 (펫시터)
    public void confirmReservationStatus(Long reservationId, Long id) {
        Reservation reservation = reservationUtils.verificationReservation(reservationId);

        Long petsitterId = memberService.findMember(id).getPetsitter().getPetsitterId();
        reservationUtils.verificationReservationOwnerPetSitter(petsitterId, reservation);

        if (reservation.getProgress() != Progress.RESERVATION_REQUEST) {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CONFIRM);
        }

        reservation.setProgress(Progress.RESERVATION_CONFIRMED);
        reservationRepository.save(reservation);
    }

    //예약 취소 (펫시터)
    public void cancelReservationPetsitter(Long reservationId, Long id) {
        Reservation reservation = reservationUtils.verificationReservation(reservationId);

        Long petsitterId = memberService.findMember(id).getPetsitter().getPetsitterId();
        reservationUtils.verificationReservationOwnerPetSitter(petsitterId, reservation);

        if (reservation.getProgress() == Progress.RESERVATION_CONFIRMED) {
            reservation.setProgress(Progress.RESERVATION_CANCELLED);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CANCEL);
        }

        reservationRepository.save(reservation);
    }

    //예약취소(회원)
    public void cancelReservationMember(Long reservationId, Long id) {
        Reservation reservation = reservationUtils.verificationReservation(reservationId);

        reservationUtils.verificationReservationOwnerMember(id, reservation);

        if (reservation.getProgress() == Progress.RESERVATION_REQUEST) {
            reservation.setProgress(Progress.RESERVATION_CANCELLED);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_STATUS_CANCEL);
        }

        reservationRepository.save(reservation);
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
}
