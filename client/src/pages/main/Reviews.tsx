import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Rating from '@mui/material/Rating';

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
const userDefaultImage = '/imgs/DefaultUser.svg';

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
                      {review.memberPhoto ? (
                        <UserProfile bgImage={review.memberPhoto.replace(/https:\/\/bucketUrl/g, BucketUrl)} />
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
                    <StyledCarousel showThumbs={false}>
                      {review.reviewPhotos && review.reviewPhotos.length > 0
                        ? review.reviewPhotos.map((photo, photoIndex) => (
                            <div key={photoIndex}>
                              {photo && (
                                <img src={photo.replace(/https:\/\/bucketUrl/g, BucketUrl)} alt="Review Photos" />
                              )}
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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 36px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 18px;
`;

const Reviewwrapper = styled.div`
  width: 100%;
  margin-bottom: 36px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 72px;
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

export default Reviews;
