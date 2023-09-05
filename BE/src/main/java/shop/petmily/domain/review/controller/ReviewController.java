package shop.petmily.domain.review.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.pet.dto.PetPatchDto;
import shop.petmily.domain.reservation.dto.ReservationMultiResponseDto;
import shop.petmily.domain.reservation.dto.ReservationResponseDto;
import shop.petmily.domain.review.Dto.*;
import shop.petmily.domain.review.entity.Review;
import shop.petmily.domain.review.mapper.ReviewMapper;
import shop.petmily.domain.review.service.ReviewService;
import shop.petmily.global.security.utils.JwtUtils;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@Slf4j
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewMapper mapper;
    private final ReviewService service;
    private final JwtUtils jwtUtils;

    public ReviewController(ReviewMapper mapper, ReviewService service, JwtUtils jwtUtils) {
        this.mapper = mapper;
        this.service = service;
        this.jwtUtils = jwtUtils;
    }

    // 후기 등록
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postReview(@RequestPart ReviewPostDto reviewPostDto,
                                     @RequestPart(required = false) List<MultipartFile> files) throws IOException {
        reviewPostDto.setMemberId(jwtUtils.getMemberId());
        Review createdReview = service.createReview(mapper.reviewPostToReview(reviewPostDto), files);
        ReviewResponseDto response = mapper.reviewToResponse(createdReview);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 후기 1개 조회
    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") @Positive long reviewId) {
        Review review = service.findReview(reviewId);
        ReviewResponseDto response = mapper.reviewToResponse(review);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 후기 전체 조회
    @GetMapping
    public ResponseEntity getReviews(@RequestParam("page") @Positive int page,
                                     @RequestParam("size") @Positive int size){
        Page<Review> reviewPage = service.findReviews(page, size);
        ReviewPageInfo pageInfo = new ReviewPageInfo(page, size, (int) reviewPage.getTotalElements(), reviewPage.getTotalPages());

        List<Review> reviews = reviewPage.getContent();
        List<ReviewResponseDto> response =
                reviews.stream()
                        .map(review -> mapper.reviewToResponse(review))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ReviewMultiResponseDto(response, pageInfo),HttpStatus.OK);

    }

    // 후기 수정
    @PatchMapping(value = "/{review-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchReview(@PathVariable("review-id") @Positive long reviewId,
                                      @RequestPart(required = false) ReviewPatchDto reviewPatchDto,
                                      @RequestPart(required = false) List<MultipartFile> files) throws IOException {
//        reviewPatchDto = (reviewPatchDto == null) ? new ReviewPatchDto() : reviewPatchDto;
        reviewPatchDto.setMemberId(jwtUtils.getMemberId());
        reviewPatchDto.setReviewId(reviewId);
        Review review = mapper.reviewPatchToReview(reviewPatchDto);
        Review updatedReview = service.updateReview(review, files);
        ReviewResponseDto response = mapper.reviewToResponse(updatedReview);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 후기 삭제
    @DeleteMapping("/{review-id}")
    public HttpStatus deleteReview(@PathVariable("review-id") @Positive long reviewId) {
        service.deleteReview(reviewId, jwtUtils.getMemberId());
        return HttpStatus.NO_CONTENT;
    }

}
