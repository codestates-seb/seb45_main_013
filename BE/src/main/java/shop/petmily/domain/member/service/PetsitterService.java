package shop.petmily.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.dto.PetsitterGetResponseDto;
import shop.petmily.domain.member.dto.PetsitterPossibleResoponseDto;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.repository.PetsitterRepository;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.repository.ReservationRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetsitterService {

    private final PetsitterRepository petsitterRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
    public Petsitter addPetsitterProfile(Petsitter petsitter) {
        return petsitterRepository.save(petsitter);
    }

    @Transactional(readOnly = true)
    public Petsitter findPetsitter(Member member) {
        return petsitterRepository.findByMember(member).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Petsitter updatePetsitter(Petsitter petsitter) {
        Petsitter findPetsitter = findVerifiedPetsitter(petsitter.getPetsitterId());
        Optional.ofNullable(petsitter.getPossibleLocation())
                .ifPresent(possibleLocation -> findPetsitter.setPossibleLocation(possibleLocation));
        Optional.ofNullable(petsitter.getPossibleDay())
                .ifPresent(possibleDay -> findPetsitter.setPossibleDay(possibleDay));
        Optional.ofNullable(petsitter.getPossiblePetType())
                .ifPresent(possiblePetType -> findPetsitter.setPossiblePetType(possiblePetType));
        Optional.ofNullable(petsitter.getPossibleTimeStart())
                .ifPresent(possibleTimeStart -> findPetsitter.setPossibleTimeStart(possibleTimeStart));
        Optional.ofNullable(petsitter.getPossibleTimeEnd())
                .ifPresent(possibleTimeEnd -> findPetsitter.setPossibleTimeEnd(possibleTimeEnd));

        return petsitterRepository.save(findPetsitter);
    }

    @Transactional(readOnly = true)
    public Petsitter findVerifiedPetsitter(Long petsitterId) {
        Optional<Petsitter> optionalPetsitter = petsitterRepository.findById(petsitterId);
        Petsitter findPetsitter = optionalPetsitter.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PETSITTER_NOT_FOUND));
        return findPetsitter;
    }

    public PetsitterPossibleResoponseDto findPossible(Petsitter petsitter) {
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        Month currentMonth = now.getMonth();

        LocalDate firstDayOfThisWeek = now.with(DayOfWeek.MONDAY); // 이번 주의 월요일
        LocalDate lastDayOfThisWeek = firstDayOfThisWeek.plusDays(6); // 이번 주의 일요일

        LocalDate today = LocalDate.now();

        List<Reservation> reservations = reservationRepository.findByPetsitter(petsitter);

        long monthTotalReservationCount = getMonthTotalReservation(reservations, year, currentMonth);
        long thisWeekReservationCount = getThisWeekReservationCount(reservations, firstDayOfThisWeek, lastDayOfThisWeek);
        long todayReservationCount = getTodayReservationCount(reservations, today);
        long confirmedReservationCount = getConfirmedReservationCount(reservations, year, currentMonth);
        long requestReservationCount = getRequestReservationCount(reservations, year, currentMonth);
//        long cancelledReservationCount = getCancelledReservationCount(reservations, year, currentMonth);
//        long finishCaringReservationCount = getFinishCaringReservationCount(reservations, year, currentMonth);

        return PetsitterPossibleResoponseDto.builder()
                .petsitterId(petsitter.getPetsitterId())
                .possiblePetType(petsitter.getPossiblePetType())
                .possibleDay(petsitter.getPossibleDay())
                .possibleLocation(petsitter.getPossibleLocation().toString())
                .possibleTimeStart(petsitter.getPossibleTimeStart())
                .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                .star(petsitter.getStar())
                .reviewCount(petsitter.getReviewCount())
                .monthTotalReservationCount(monthTotalReservationCount)
                .thisWeekReservationCount(thisWeekReservationCount)
                .todayReservationCount(todayReservationCount)
                .confirmedReservationCount(confirmedReservationCount)
                .requestReservationCount(requestReservationCount)
//                .cancelledReservationCount(cancelledReservationCount)
//                .finishCaringReservationCount(finishCaringReservationCount)
                .build();
    }

    private long getMonthTotalReservation(List<Reservation> reservations, int year, Month month) {
        return reservations.stream()
                .filter(reservation ->
                        reservation.getProgress() == Progress.RESERVATION_REQUEST ||
                        reservation.getProgress() == Progress.RESERVATION_CONFIRMED &&
                        reservation.getReservationDay().getYear() == year &&
                        reservation.getReservationDay().getMonth() == month
                        )
                .count();
    }

    private long getThisWeekReservationCount(List<Reservation> reservations, LocalDate firstDayOfThisWeek, LocalDate lastDayOfThisWeek) {
        return reservations.stream()
                .filter(reservation -> {
                    LocalDate reservationDate = reservation.getReservationDay();
                    return !reservationDate.isBefore(firstDayOfThisWeek) && !reservationDate.isAfter(lastDayOfThisWeek);
                })
                .count();
    }

    private long getTodayReservationCount(List<Reservation> reservations, LocalDate today) {
        return reservations.stream()
                .filter(reservation -> reservation.getReservationDay().isEqual(today))
                .count();
    }

    private long getReservationCountByStatus(List<Reservation> reservations, int year, Month month, Progress status) {
        return reservations.stream()
                .filter(reservation -> reservation.getProgress() == status &&
                        reservation.getReservationDay().getYear() == year &&
                        reservation.getReservationDay().getMonth() == month)
                .count();
    }

    private long getConfirmedReservationCount(List<Reservation> reservations, int year, Month month) {
        return getReservationCountByStatus(reservations, year, month, Progress.RESERVATION_CONFIRMED);
    }

    private long getRequestReservationCount(List<Reservation> reservations, int year, Month month) {
        return getReservationCountByStatus(reservations, year, month, Progress.RESERVATION_REQUEST);
    }

//    private long getCancelledReservationCount(List<Reservation> reservations, int year, Month month) {
//        return getReservationCountByStatus(reservations, year, month, Progress.RESERVATION_CANCELLED);
//    }

//    private long getFinishCaringReservationCount(List<Reservation> reservations, int year, Month month) {
//        return getReservationCountByStatus(reservations, year, month, Progress.FINISH_CARING);
//    }

    public Page<PetsitterGetResponseDto> findPetsittersWithFilters(Map<String, String> params, Pageable pageable) {
        String nameFilter = params.get("name");
        String starFilter = params.get("star");
        String reviewCountFilter = params.get("reviewCount");

        List<Member> petsitters = getPetsittersWithFilters(nameFilter, starFilter, reviewCountFilter);
        List<PetsitterGetResponseDto> petsitterGetResponseDtos = mapMembersToDto(petsitters, pageable);

        return new PageImpl<>(petsitterGetResponseDtos, pageable, petsitters.size());
    }

    private List<Member> getPetsittersWithFilters(String nameFilter, String starFilter, String reviewCountFilter) {
        List<Member> petsitters = petsitterRepository.findAllMembersWithPetsitterBooleanTrue();

        // 이름 검색 필터
        if (nameFilter != null && !nameFilter.isEmpty()) {
            final String filterText = nameFilter;
            petsitters = petsitters.stream()
                    .filter(member -> member.getName().contains(filterText))
                    .collect(Collectors.toList());
        }

        // 별점 검색 필터
        if (starFilter != null && !starFilter.isEmpty()) { // 별점 3 일때, 3.9 ~ 3.0 조회
            double starValue = Double.parseDouble(starFilter);
            petsitters = petsitters.stream()
                    .filter(member -> {
                        double memberStar = member.getPetsitter().getStar();
                        return memberStar >= starValue && memberStar < (starValue + 1.0);
                    })
                    .sorted((member1, member2) -> {
                        double star1 = member1.getPetsitter().getStar();
                        double star2 = member2.getPetsitter().getStar();
                        return Double.compare(star2, star1);
                    })
                    .collect(Collectors.toList());
        } else { // 별점 null 일때, 5.0 ~ 0.0 조회
            petsitters = petsitters.stream()
                    .sorted((member1, member2) -> {
                        double star1 = member1.getPetsitter().getStar();
                        double star2 = member2.getPetsitter().getStar();
                        return Double.compare(star2, star1);
                    })
                    .collect(Collectors.toList());
        }

        // 리뷰 카운트 검색 필터
        if (reviewCountFilter != null && !reviewCountFilter.isEmpty()) {
            int reviewCountValue = Integer.parseInt(reviewCountFilter);
            petsitters = petsitters.stream()
                    .filter(member -> {
                        int reviewCount = member.getPetsitter().getReviewCount();
                        return reviewCount >= reviewCountValue;
                    })
                    .collect(Collectors.toList());
        }

        return petsitters;
    }

    private List<PetsitterGetResponseDto> mapMembersToDto(List<Member> members, Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > members.size() ? members.size() : (start + pageable.getPageSize());
        List<Member> pagedMembers = members.subList(start, end);

        return pagedMembers.stream()
                .map(this::mapToPetsitterGetResponseDto)
                .collect(Collectors.toList());
    }

    private PetsitterGetResponseDto mapToPetsitterGetResponseDto(Member member) {
        Petsitter petsitter = findPetsitter(member);
        return PetsitterGetResponseDto.builder()
                .petsitterId(petsitter.getPetsitterId())
                .email(member.getEmail())
                .name(member.getName())
                .nickName(member.getNickName())
                .phone(member.getPhone())
                .address(member.getAddress())
                .photo(member.getPhoto())
                .body(member.getBody())
                .possiblePetType(petsitter.getPossiblePetType())
                .possibleDay(petsitter.getPossibleDay())
                .possibleTimeStart(petsitter.getPossibleTimeStart())
                .possibleTimeEnd(petsitter.getPossibleTimeEnd())
                .star(petsitter.getStar())
                .reviewCount(petsitter.getReviewCount())
                .build();
    }
}
