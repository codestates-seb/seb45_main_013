import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Rating from '@mui/material/Rating';
import { useInView } from 'react-intersection-observer';
import { CircularProgress } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL || '';

type ReviewType = {
  memberId: number;
  memberNickName: string;
  memberPhoto: string;
  body: string;
  createdAt: string;
  lastModifiedAt: string;
  petsitterId: number;
  petsitterName: string;
  petsitterPhoto: string;
  reviewPhotos: string[];
  reservationId: number;
  reviewId: number;
  star: number;
};

//   <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
const userDefaultImage = '/imgs/DefaultUser.svg';

const Reviews = () => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isEnd, setIsEnd] = useState(false);

  const { ref, inView } = useInView();

  // ref로 연결된 엘리먼트가 보일때마다 이 useEffect를 실행한다.
  // 한 페이지 응답이 끝날때 마다 page + 1
  // 서버에서 응답 받은 totalPages와 page의 수가 같을 때 통신이 중단  => isEnd = true
  useEffect(() => {
    if (inView) {
      const fetchReview = async () => {
        try {
          const response = await axios.get(`${apiUrl}/reviews?page=${page}&size=8`);

          if (response.data && response.data.reviews) {
            setReviews((prev) => [...prev, ...response.data.reviews]);
            setPage((page) => page + 1);
            if (response.data.pageInfo.totalPages === page || response.data.pageInfo.totalPages === 0) {
              setIsEnd(true);
            }
          }
        } catch (error) {
          console.error(error);
          if (error) {
            setIsEnd(true);
          }
        }
      };
      fetchReview();
    }
  }, [inView]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <ReviewPage>
        <Title>펫밀리 이용 후기</Title>

        <ReviewCard>
          {Array.isArray(reviews) &&
            reviews.map((review, index) => (
              <ReviewWrapper key={index}>
                <ReviewContainer>
                  <Review>
                    <ImageContainer>
                      {review.memberPhoto ? (
                        <UserProfile bgImage={review.memberPhoto.replace('https://bucketUrl', bucketUrl)} />
                      ) : (
                        <UserProfile bgImage={userDefaultImage} />
                      )}
                    </ImageContainer>
                    <ReviewInfo>
                      <First>
                        <NickName>{review.memberNickName}</NickName>
                        <Star>
                          <StyledRating name="half-rating-read" defaultValue={review.star} precision={0.5} readOnly />
                        </Star>
                      </First>
                      <When>{formatDate(review.createdAt)}</When>
                    </ReviewInfo>
                  </Review>
                  <CarouselContainer>
                    <StyledCarousel showThumbs={false} showStatus={false}>
                      {review.reviewPhotos && review.reviewPhotos.length > 0
                        ? review.reviewPhotos.map((photo, photoIndex) => (
                            <ImageWrapper key={photoIndex}>
                              {photo && <img src={photo.replace('https://bucketUrl', bucketUrl)} alt="Review Photos" />}
                            </ImageWrapper>
                          ))
                        : [
                            <div key="no photos">
                              <StyledImage src="/imgs/Petmily.svg" alt="Default review placeholder" />
                            </div>,
                          ]}
                    </StyledCarousel>
                  </CarouselContainer>
                  <BodyContainer>{review.body}</BodyContainer>
                </ReviewContainer>
              </ReviewWrapper>
            ))}
        </ReviewCard>

        {!isEnd ? (
          <LoadingContainer ref={ref}>
            <CircularProgress />
          </LoadingContainer>
        ) : null}
      </ReviewPage>
    </>
  );
};

export default Reviews;

const ReviewPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
`;

const Title = styled.div`
  margin-top: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSize.s18h27};
`;

const ReviewCard = styled.div`
  margin-top: 24px;
`;

const ReviewWrapper = styled.div`
  width: 100%;
  margin-bottom: 36px;
  border-radius: 8px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Review = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const UserProfile = styled.div<{ bgImage: string }>`
  display: inline-block;
  overflow: hidden !important;
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 50% !important;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Star = styled.div`
  display: inline-block;
`;

const StyledRating = styled(Rating)`
  & .MuiRating-iconFilled {
    color: #279eff;
  }
`;

const NickName = styled.div`
  display: inline-block;
  font-weight: 800;
  font-size: 16px;
`;

const When = styled.div`
  color: #8d8d8d;
  font-size: 14px;
`;

const First = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CarouselContainer = styled.div`
  display: flex;

  /* justify-content: center; */
  width: 100%;
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: auto;

  .carousel .slider-wrapper.axis-horizontal .slider .slide {
    overflow: visible !important;
    height: auto;

    allow parts of the image to overflow img {
      width: 100%;
      height: auto;
      object-fit: cover;
      margin: 0 auto;
    }
  }

  .dot {
    background: #279eff !important;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 8px;

  overflow: hidden;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow.dp04};
`;

const BodyContainer = styled.div`
  display: flex;
  margin-top: 20px;
  line-height: 1.5;
`;

const StyledImage = styled.img`
  width: 100px;
  height: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;
