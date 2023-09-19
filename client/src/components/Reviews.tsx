import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Rating from '@mui/material/Rating';

// const apiUrl = process.env.REACT_APP_API_URL;
// const bucketUrl = process.env.REACT_APP_BUCKET_URL;

//추후 UseEffect로 데이터 받아올 데이터 (이용 후기)
const ReviewsItem = [
  {
    id: 1,
    petName: '코코',
    rating: `5.0`,
    petInformation: `푸들 / 13살`,
    profileImg: '/imgs/PetImg.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `진짜 매일같이 정성스럽게돌봐주시는 덕분에 사람을더 좋아하게 되는거 같아요ㅜㅜ`,
  },
  {
    id: 2,
    petName: '야옹이',
    rating: `4.0`,
    petInformation: `러시안블루 / 9살`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `조금 케어가 부족한거 같아요`,
  },
  {
    id: 3,
    petName: '코리',
    rating: `2.0`,
    petInformation: `진돗개 / 3살`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `펫시터님이 잘 케어해주세요!`,
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/reviews?page=1&size=10&petsitterId=${petsitterId}`);
  //       setReviews(response.data.content);
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchReviews();
  // }, [petsitterId];

  return (
    <MainContainer>
      <TitleContainer>
        <Title>후기</Title>
        <ReviewsCount>{`${ReviewsItem.length}개`}</ReviewsCount>
      </TitleContainer>
      <CustomCarousel
        showThumbs={false}
        showStatus={false}
        autoPlay={false}
        emulateTouch={true}
        stopOnHover={true}
        infiniteLoop={true}
        showArrows={false}
        useKeyboardArrows={false}
      >
        {ReviewsItem.map((item) => (
          <ReviewsWrap key={item.id}>
            <ReviewsContainer>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <StyledImg src={item.profileImg} alt="PetImg" />
                <InformationContainer>
                  <Name>{item.petName}</Name>
                  <PetInformation>{item.petInformation}</PetInformation>
                </InformationContainer>
              </div>
              <StyledRating name="read-only" value={Number(item.rating)} size="medium" readOnly />
            </ReviewsContainer>
            <Description>{item.describe}</Description>
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
  font-size: ${(props) => props.theme.fontSize.s20h30};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const ReviewsCount = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.gray40};
  line-height: 2.4;
  margin-left: 4px;
`;

const ReviewsWrap = styled.div``;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  justify-content: space-between;
`;

const StyledImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 6px 12px 0 0;
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
  font-size: ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.gray40};
`;

const Description = styled.div`
  margin: 12px 0 24px 0;
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
