package shop.petmily.domain.review.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.domain.review.entity.Review;
import shop.petmily.domain.review.repository.ReviewRepository;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReservationService reservationService;
    private final MemberService memberService;
    private final S3UploadService uploadService;

    public ReviewService(ReviewRepository reviewRepository,
                         ReservationService reservationService,
                         MemberService memberService,
                         S3UploadService uploadService) {
        this.reviewRepository = reviewRepository;
        this.reservationService = reservationService;
        this.memberService = memberService;
        this.uploadService = uploadService;
    }

    public Review createReview(Review review, List<MultipartFile> files) throws IOException {
        review.setMember(memberService.findVerifiedMember(review.getMember().getMemberId()));
        Reservation reservation = reservationService.findVerifiedReservation(review.getReservation().getReservationId());
        review.setReservation(reservation);
//        review.setPetSitterId(reservation.getPetSitter().getPetSitterId);

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


    public Review findReview(long reviewId) {
        Review review = findVerifiedReview(reviewId);
        return review;
    }

    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size, Sort.by("reviewId").descending()));
    }

    public Review updateReview(Review review, List<MultipartFile> files) throws IOException {
        Review findReview = findVerifiedReview(review.getReviewId());

        verifiedReviewOwner(review.getMember().getMemberId(), findReview);

        if(review.getStar() != 0) findReview.setStar(review.getStar());
        if(review.getBody() != null) findReview.setBody(review.getBody());

        if(review.getPhotos() != null && findReview.getPhotos() != null) findReview.setPhotos(review.getPhotos());
        if(files != null) {
            for (MultipartFile file : files) {
                findReview.addPhotos(uploadService.saveFile(file));
            }
        }

        findReview.setLastModifiedAt(LocalDateTime.now());

        reviewRepository.save(findReview);
        return findReview;
    }

    public void deleteReview(long reviewId, long memberId) {
        Review findReview = findVerifiedReview(reviewId);
        verifiedReviewOwner(memberId, findReview);

        reviewRepository.delete(findReview);
    }

    private Review findVerifiedReview(long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        Review review = optionalReview.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_EXIST)
        );
        return review;
    }

    public void verifiedReviewOwner(long memberId, Review verifiedReview) {
        if (memberId != verifiedReview.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }
}
