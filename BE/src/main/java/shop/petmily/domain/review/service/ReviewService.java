package shop.petmily.domain.review.service;

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
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.domain.review.entity.Review;
import shop.petmily.domain.review.repository.ReviewRepository;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReservationService reservationService;
    private final PetsitterService petsitterService;
    private final S3UploadService uploadService;

    public ReviewService(ReviewRepository reviewRepository,
                         ReservationService reservationService,
                         S3UploadService uploadService,
                         PetsitterService petsitterService) {
        this.reviewRepository = reviewRepository;
        this.reservationService = reservationService;
        this.uploadService = uploadService;
        this.petsitterService = petsitterService;
    }

    // 후기 등록
    public Review createReview(Review review, List<MultipartFile> files) throws IOException {
        Reservation reservation = reservationService.findVerifiedReservation(review.getReservation().getReservationId());
        review.setPetsitter(reservation.getPetsitter());

        if (reviewRepository.existsByReservation(reservation)) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_ALREADY_EXISTS);
        }
        if (!reservation.getProgress().equals(Progress.FINISH_CARING))
            throw new BusinessLogicException(ExceptionCode.BEFORE_FINISH_CARING);

        List<String> photos = new ArrayList<>();
        if(files != null) {
            for (MultipartFile file : files) {
                photos.add(uploadService.saveFile(file));
            }
        }
        review.setPhotos(photos);

        reviewRepository.save(review);

        return review;
    }

    // 후기 수정
    public Review updateReview(Review review, List<MultipartFile> files) throws IOException {
        Review findReview = findVerifiedReview(review.getReviewId());

        verifiedReviewOwner(review.getMember().getMemberId(), findReview);

        if(review.getStar() != 0) findReview.setStar(review.getStar());
        if(review.getBody() != null) findReview.setBody(review.getBody());

        if (files != null) {
            List<String> newPhotos = new ArrayList<>();
            for (MultipartFile file : files) {
                newPhotos.add(uploadService.saveFile(file));
            }
            findReview.setPhotos(newPhotos);
        }

        reviewRepository.save(findReview);
        return findReview;
    }

    // 후기 1개 조회
    public Review findReview(long reviewId) {
        Review review = findVerifiedReview(reviewId);
        return review;
    }

    // 후기 전체 조회 ( petsitterId : 선택적 )
    public Page<Review> findAllReviews(int page, int size, Long petsitterId) {
        PageRequest pageRequest = PageRequest.of(page - 1, size,  Sort.Direction.DESC, "reviewId");

        if (petsitterId != null) {
            return reviewRepository.findByPetsitter_PetsitterId(petsitterId, pageRequest);
        } else {
            return reviewRepository.findAll(pageRequest);
        }
    }


    // 유효한 후기인지 확인
    private Review findVerifiedReview(long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        Review review = optionalReview.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_EXIST)
        );
        return review;
    }

    // 접근자가 후기 작성자인지 확인
    public void verifiedReviewOwner(long memberId, Review verifiedReview) {
        if (memberId != verifiedReview.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }
    // 후기 삭제
//    public void deleteReview(long reviewId, long memberId) {
//        Review findReview = findVerifiedReview(reviewId);
//        verifiedReviewOwner(memberId, findReview);
//
//        reviewRepository.delete(findReview);
//    }


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
}
