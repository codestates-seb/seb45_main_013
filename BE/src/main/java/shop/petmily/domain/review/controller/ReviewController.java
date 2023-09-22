package shop.petmily.domain.review.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.member.service.PetsitterService;
import shop.petmily.domain.review.Dto.ReviewMultiResponseDto;
import shop.petmily.domain.review.Dto.ReviewPatchDto;
import shop.petmily.domain.review.Dto.ReviewPostDto;
import shop.petmily.domain.review.Dto.ReviewResponseDto;
import shop.petmily.domain.review.entity.Review;
import shop.petmily.domain.review.mapper.ReviewMapper;
import shop.petmily.domain.review.service.ReviewService;
import shop.petmily.global.argu.LoginMemberId;
import shop.petmily.global.dto.PageInfo;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@Slf4j
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewMapper mapper;
    private final ReviewService service;
    private final PetsitterService petsitterService;

    public ReviewController(ReviewMapper mapper, ReviewService service, PetsitterService petsitterService) {
        this.mapper = mapper;
        this.service = service;
        this.petsitterService = petsitterService;
    }

    // 후기 등록
    @PostMapping
    public ResponseEntity<ReviewResponseDto> postReview( @ModelAttribute ReviewPostDto reviewPostDto,
                                                        @LoginMemberId Long memberId)  {
        reviewPostDto.setMemberId(memberId);
        Review createdReview = service.createReview(mapper.reviewPostToReview(reviewPostDto), reviewPostDto.getFile());
        ReviewResponseDto response = mapper.reviewToResponse(createdReview);

        Petsitter findPetsitter = createdReview.getPetsitter();
        findPetsitter.setStar(service.averageStar(findPetsitter));
        petsitterService.addPetsitterProfile(findPetsitter);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 후기 수정
    @PatchMapping("/{review-id}")
    public ResponseEntity<ReviewResponseDto> patchReview(@PathVariable("review-id") @Positive long reviewId,
                                                         @ModelAttribute ReviewPatchDto reviewPatchDto,
                                                         @LoginMemberId Long memberId) {
        reviewPatchDto.setMemberId(memberId);
        reviewPatchDto.setReviewId(reviewId);
        Review review = mapper.reviewPatchToReview(reviewPatchDto);
        Review updatedReview = service.updateReview(review, reviewPatchDto.getFile());
        ReviewResponseDto response = mapper.reviewToResponse(updatedReview);

        Petsitter findPetsitter = updatedReview.getPetsitter();
        findPetsitter.setStar(service.averageStar(findPetsitter));
        petsitterService.addPetsitterProfile(findPetsitter);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 후기 1개 조회
    @GetMapping("/{review-id}")
    public ResponseEntity<ReviewResponseDto> getReview(@PathVariable("review-id") @Positive long reviewId) {
        Review review = service.findReview(reviewId);
        ReviewResponseDto response = mapper.reviewToResponse(review);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 후기 전체 조회 (+펫시터별)
    @GetMapping
    public ResponseEntity<ReviewMultiResponseDto> getReviews(@RequestParam("page") @Positive int page,
                                                             @RequestParam("size") @Positive int size,
                                                             @RequestParam(value = "petsitterId", required = false) Long petsitterId) {
        Page<Review> reviewPage;

        reviewPage = service.findAllReviews(page, size, petsitterId);

        PageInfo pageInfo = new PageInfo(page, size, (int) reviewPage.getTotalElements(), reviewPage.getTotalPages());

        List<Review> reviews = reviewPage.getContent();
        List<ReviewResponseDto> response =
                reviews.stream()
                        .map(mapper::reviewToResponse)
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ReviewMultiResponseDto(response, pageInfo), HttpStatus.OK);
    }

    // 후기 삭제
//    @DeleteMapping("/{review-id}")
//    public HttpStatus deleteReview(@PathVariable("review-id") @Positive long reviewId) {
//        service.deleteReview(reviewId, jwtUtils.getMemberId());
//        return HttpStatus.NO_CONTENT;
//    }
//
}
