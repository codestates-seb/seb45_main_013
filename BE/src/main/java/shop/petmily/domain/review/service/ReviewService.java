package shop.petmily.domain.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.service.PetsitterService;
import shop.petmily.domain.reservation.entity.Progress;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.service.ReservationUtils;
import shop.petmily.domain.review.entity.Review;
import shop.petmily.domain.review.repository.ReviewRepository;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReservationUtils reservationUtils;
    private final PetsitterService petsitterService;
    private final S3UploadService uploadService;

    // 후기 등록
    public Review createReview(Review review, List<MultipartFile> files){
        Reservation reservation = reservationUtils.verificationReservation(review.getReservation().getReservationId());
        review.setReservation(reservation);

        if (reviewRepository.existsByReservation(reservation)) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_ALREADY_EXISTS);
        }
        if (!reservation.getProgress().equals(Progress.FINISH_CARING)) {
            if (reservation.getProgress().equals(Progress.RESERVATION_CONFIRMED)) {
                throw new BusinessLogicException(ExceptionCode.BEFORE_FINISH_CARING);
            }
            throw new BusinessLogicException(ExceptionCode.BEFORE_CONFIRMED);
        }
        List<String> photos = new ArrayList<>();
        if(files != null) {
            for (MultipartFile file : files) {
                photos.add(uploadService.saveFile(file));
            }
        }
        review.setPhotos(photos);

        Petsitter petsitter = reservation.getPetsitter();
        review.setPetsitter(petsitter);
        petsitter.setReviewCount(petsitter.getReviewCount()+1);

        reviewRepository.save(review);

        return review;
    }

    // 후기 수정
    public Review updateReview(Review review, List<MultipartFile> files){
        Review findReview = findVerifiedReview(review.getReviewId());

        verifiedReviewOwner(review.getMember().getMemberId(), findReview);

        if(review.getStar() != 0) findReview.setStar(review.getStar());
        if(review.getBody() != null) findReview.setBody(review.getBody());

        if(review.getPhotos().size() != 0) {
            findReview.setPhotos(review.getPhotos());
        } else {
            List<String> photos = new ArrayList<>();
            findReview.setPhotos(photos);
        }

        if (files != null) {
            for (MultipartFile file : files) {
                findReview.getPhotos().add(uploadService.saveFile(file));
            }
        }

        reviewRepository.save(findReview);
        return findReview;
    }

    // 후기 1개 조회
    public Review findReview(long reviewId) {
        return findVerifiedReview(reviewId);
    }

    // 후기 전체 조회 ( petsitterId : 선택적 )
    public Page<Review> findAllReviews(int page, int size, Long petsitterId) {
        PageRequest pageRequest = PageRequest.of(page - 1, size,  Sort.Direction.DESC, "reviewId");

        if (petsitterId != null) {
            Petsitter findPetsitter = petsitterService.findVerifiedPetsitter(petsitterId);
            return reviewRepository.findByPetsitter(findPetsitter, pageRequest);
        } else {
            return reviewRepository.findAll(pageRequest);
        }
    }

    // 유효한 후기인지 확인
    private Review findVerifiedReview(long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        return optionalReview.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_EXIST)
        );
    }

    // 접근자가 후기 작성자인지 확인
    public void verifiedReviewOwner(long memberId, Review verifiedReview) {
        if (memberId != verifiedReview.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }

    // 별점 평균 계산
    public double averageStar(Petsitter petsitter) {
        Petsitter findPetsitter = petsitterService.findVerifiedPetsitter(petsitter.getPetsitterId());
        List<Review> findReview = reviewRepository.findAllByPetsitter(findPetsitter);
        int totalStars = 0;
        int reviewCount = findReview.size();

        for (Review review : findReview) {
            totalStars += review.getStar();
        }

        double averageStar = (reviewCount > 0) ? ((double) totalStars / reviewCount) : 0.0;

        String formattedAverage = String.format("%.1f", averageStar);

        return Double.parseDouble(formattedAverage);
    }

    // 후기 삭제
//    public void deleteReview(long reviewId, long memberId) {
//        Review findReview = findVerifiedReview(reviewId);
//        verifiedReviewOwner(memberId, findReview);
//
//        reviewRepository.delete(findReview);
//    }

}
