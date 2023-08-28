package shop.petmily.domain.review.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.reservation.service.ReservationService;
import shop.petmily.domain.review.entity.Review;
import shop.petmily.domain.review.repository.ReviewRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReservationService reservationService;
    private final MemberService memberService;

    public ReviewService(ReviewRepository reviewRepository, ReservationService reservationService, MemberService memberService) {
        this.reviewRepository = reviewRepository;
        this.reservationService = reservationService;
        this.memberService = memberService;
    }

    public Review createReview(Review review) {
        review.setMember(memberService.findVerifiedMember(review.getMember().getMemberId()));
        LocalDateTime now = LocalDateTime.now();
        review.setCreatedAt(now);
        review.setLastModifiedAt(now);

        reviewRepository.save(review);

        return review;
    }


    public Review findReview(long reviewId) {
        Review review = findVerifiedReview(reviewId);

        reviewRepository.save(review);
        return review;
    }

    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size, Sort.by("reviewId").descending()));
    }

    public Review updateReview(Review review) {
        Review findReview = findVerifiedReview(review.getReviewId());

        verifiedReviewOwner(review.getMember().getMemberId(), findReview);

        Optional.ofNullable(review.getStar())
                .ifPresent(findReview::setStar);
        Optional.ofNullable(review.getBody())
                .ifPresent(findReview::setBody);

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
//        }
        }
    }
}
