import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Rating from '@mui/material/Rating';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  const { petsitterId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reviews?page=1&size=10&petsitterId=${petsitterId}`);
        // reviews 배열의 각 아이템에 대해 formattedDate 필드 추가
        const formattedReviews = response.data.reviews.map((review: { createdAt: string | number | Date }) => {
          const date = new Date(review.createdAt);
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            date.getDate(),
          ).padStart(2, '0')} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

          return { ...review, formattedDate }; // 기존 review 객체에 formattedDate 추가
        });

        setReviews(formattedReviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [petsitterId]);

  return (
    <MainContainer>
      <TitleContainer>
        <Title>후기</Title>
        <ReviewsCount>{`${(reviews && reviews.length) || 0}개`}</ReviewsCount>
      </TitleContainer>
      <CustomCarousel
        showThumbs={false}
        showStatus={false}
        autoPlay={false}
        emulateTouch={true}
        stopOnHover={true}
        infiniteLoop={true}
        showArrows={false}
        showIndicators={false}
        useKeyboardArrows={false}
      >
        {reviews &&
          reviews.map((review) => (
            <ReviewsWrap key={review.reviewId}>
              <ReviewsContainer>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {review.petPhotos && review.petPhotos.length > 0 ? (
                    <StyledImg src={review.petPhotos[0].replace('https://bucketUrl', bucketUrl)} alt="PetImg" />
                  ) : (
                    <DefaultImg src="/imgs/User.svg" alt="default img" />
                  )}
                  <InformationContainer>
                    {review.petNames && review.petNames.length > 0 ? (
                      <Name>{review.petNames[0]}</Name>
                    ) : (
                      <Name>알 수 없음</Name>
                    )}
                    <PetInformation>{review.formattedDate}</PetInformation>
                  </InformationContainer>
                </div>
                <StyledRating name="read-only" value={Number(review.star)} size="medium" readOnly />
              </ReviewsContainer>
              <Description>{review.body}</Description>
            </ReviewsWrap>
          ))}
      </CustomCarousel>
    </MainContainer>
  );
};

export default Reviews;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const Title = styled.h2`
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  font-size: ${(props) => props.theme.fontSize.s20h30};
`;

const ReviewsCount = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.gray40};
  line-height: 2.4;
  margin-left: 4px;
`;

const ReviewsWrap = styled.div`
  cursor: pointer;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

const StyledImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 6px 12px 0 0;
  border-radius: 50%;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
`;

const Name = styled.div`
  display: flex;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s20h30};
`;

const PetInformation = styled.div`
  color: ${(props) => props.theme.textColors.gray40};
  font-weight: ${(props) => props.theme.fontWeights.light};
  font-size: ${(props) => props.theme.fontSize.s12h18};
`;

const Description = styled.div`
  margin: 12px 0 24px;
`;

const CustomCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: transparent;
  }

  .control-dots {
    top: 100px !important;
  }

  .dot {
    background: #279eff !important;
  }
`;

const StyledRating = styled(Rating)`
  & .MuiRating-iconFilled {
    color: #279eff;
  }

  & .MuiRating-iconHover {
    color: #1d8ce7;
  }
`;

const DefaultImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColors.primary};
`;
