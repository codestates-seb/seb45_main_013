import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Start } from '@mui/icons-material';
import { getCookieValue } from 'hooks/getCookie';

const apiUrl = process.env.REACT_APP_API_URL;
const BucketUrl = process.env.REACT_APP_BUCKET_URL || '';

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

type Page = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

//   <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />

const Reviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<Page | null>(null);
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reviews?page=1&size=10`);
        if (response.data && response.data.reviews) {
          setReviews(response.data.reviews);
          setPage(response.data.pageInfo);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchReview();
  }, []);
  console.log(reviews);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      {!isLoading && (
        <ReviewPage>
          <Title>펫밀리 이용 후기</Title>
          {Array.isArray(reviews) &&
            reviews.map((review, index) => (
              <Reviewwrapper key={index}>
                <ReviewContainer>
                  <Review>
                    <ImageContainer>
                      <UserProfile bgImage={review.memberPhoto.replace(/https:\/\/bucketUrl/g, BucketUrl)} />
                    </ImageContainer>
                    <ReviewInfo>
                      <First>
                        <NickName>{review.memberNickName}</NickName>
                        <Star>
                          <StyledRating name="half-rating-read" defaultValue={review.star} precision={0.5} readOnly />
                        </Star>
                      </First>
                      <When>{formatDate(review.createdAt)}</When>{' '}
                    </ReviewInfo>
                  </Review>
                  <CarouselContainer>
                    <StyledCarousel showThumbs={false}>
                      {review.reviewPhotos && review.reviewPhotos.length > 0
                        ? review.reviewPhotos.map((photo, photoIndex) => (
                            <div key={photoIndex}>
                              <img src={photo.replace(/https:\/\/bucketUrl/g, BucketUrl)} alt="Review Photos" />
                            </div>
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
              </Reviewwrapper>
            ))}
        </ReviewPage>
      )}
    </>
  );
};

const ReviewPage = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
`;

const Reviewwrapper = styled.div`
  width: 100%;
  margin-bottom: 36px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 72px;
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
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 50% !important;
  overflow: hidden !important;
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
  font-size: 16px;
  font-weight: 800;
`;

const When = styled.div`
  font-size: 14px;
  color: #8d8d8d;
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    height: auto;
    overflow: visible !important;
    Allow parts of the image to overflow img {
      width: 100%;
      height: auto;
      object-fit: cover;
      margin: 0 auto;
    }
  }
`;

const BodyContainer = styled.div`
  display: flex;
  line-height: 1.5;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 100px;
  height: auto;
`;

export default Reviews;
