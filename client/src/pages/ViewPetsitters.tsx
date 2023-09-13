import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PetsittersItem = [
  // 추후 DB에서 받아올 예정
  {
    id: 1,
    name: '도희',
    rating: `5.0`,
    review: `1,630`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
  },
  {
    id: 2,
    name: '소희',
    rating: `4.0`,
    review: `1,200`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
  },
  {
    id: 3,
    name: '지선',
    rating: `2.0`,
    review: `900`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
  },
  {
    id: 4,
    name: '지선',
    rating: `2.0`,
    review: `900`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
  },
];

const NewPetsitterItem = [
  // 추후 DB에서 받아올 예정
  {
    id: 1,
    name: '홍길동',
    location: '서울시 강남구',
    rating: `5.0`,
    shortContent: `강아지가 너무 귀여워요!`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `진짜 매일같이 정성스럽게돌봐주시는 덕분에 사람을더 좋아하게 되는거 같아요ㅜㅜ`,
  },
  {
    id: 2,
    name: '펫당근',
    location: '경기 수원시',
    rating: `4.0`,
    shortContent: `제가 너무 귀여워요!`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `조금 케어가 부족한거 같아요`,
  },
  {
    id: 3,
    name: '문단속',
    location: '전라도 광주시',
    rating: `2.0`,
    shortContent: `펫시터님이 너무 귀여워요!`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `펫시터님이 잘 케어해주세요!`,
  },
];

const chunkArray = (myArray: any[], chunk_size: number) => {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
};

const PetsitterItemChunks = chunkArray(PetsittersItem, 3);

const ViewPetsitters = () => {
  return (
    <MainContainer>
      <StatusHeader>
        <StatusTitleText>펫시터 보기</StatusTitleText>
      </StatusHeader>
      <NewPetsitterText>새로 온 펫시터</NewPetsitterText>
      <NewIntroContainer>
        <StyledCarousel
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          emulateTouch={true}
          stopOnHover={true}
          infiniteLoop={true}
          showArrows={false}
          useKeyboardArrows={false}
          showIndicators={false}
        >
          {NewPetsitterItem.map((item) => (
            <NewWrap key={item.id}>
              <NewPetsitterImg src={item.profileImg} alt="Profile" />
              <NewFaceBox>
                <OnelineWrap>
                  <NewPetsitterLocation>{item.location}</NewPetsitterLocation>
                  <Rating name="read-only" value={Number(item.rating)} size="small" readOnly />
                </OnelineWrap>
                <NewPetsitterDescription>
                  {item.describe.length > 20
                    ? item.describe.substring(0, 19) + '\n' + item.describe.substring(19)
                    : item.describe}
                </NewPetsitterDescription>
              </NewFaceBox>
            </NewWrap>
          ))}
        </StyledCarousel>
      </NewIntroContainer>
      <PetsitterContainer>
        <RequestPetsitterContainer>
          <RequestPetsitterText>{`내가 찜한 펫시터`}</RequestPetsitterText>
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
            {PetsitterItemChunks.map((chunk, idx) => (
              <RequestContainer key={idx}>
                {chunk.map((item) => (
                  <StyledLink to={`/petsitters/${item.id}`} key={item.id}>
                    <RequestPetsitterBox key={item.id}>
                      <ProfileImg src={item.profileImg} alt="RequestPetsitterImg" />
                      <Petsitterbox>
                        <Nameox>{item.name}</Nameox>
                        <RatingReviewContainer>
                          <RatingImg src={item.ratingImg} alt="ratingImg" />
                          {item.rating}
                          <ReviewImg src={item.reviewImg} alt="reviewImg" />
                          {item.review}
                        </RatingReviewContainer>
                      </Petsitterbox>
                    </RequestPetsitterBox>
                  </StyledLink>
                ))}
              </RequestContainer>
            ))}
          </CustomCarousel>
        </RequestPetsitterContainer>
        <RequestPetsitterContainer>
          <RequestPetsitterText>{`별점이 높은 펫시터`}</RequestPetsitterText>
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
            {PetsitterItemChunks.map((chunk, idx) => (
              <RequestContainer key={idx}>
                {chunk.map((item) => (
                  <StyledLink to={`/petsitters/${item.id}`} key={item.id}>
                    <RequestPetsitterBox key={item.id}>
                      <ProfileImg src={item.profileImg} alt="RequestPetsitterImg" />
                      <Petsitterbox>
                        <Nameox>{item.name}</Nameox>
                        <RatingReviewContainer>
                          <RatingImg src={item.ratingImg} alt="ratingImg" />
                          {item.rating}
                          <ReviewImg src={item.reviewImg} alt="reviewImg" />
                          {item.review}
                        </RatingReviewContainer>
                      </Petsitterbox>
                    </RequestPetsitterBox>
                  </StyledLink>
                ))}
              </RequestContainer>
            ))}
          </CustomCarousel>
        </RequestPetsitterContainer>
        <RequestPetsitterContainer>
          <RequestPetsitterText>{`리뷰가 많은 펫시터`}</RequestPetsitterText>
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
            {PetsitterItemChunks.map((chunk, idx) => (
              <RequestContainer key={idx}>
                {chunk.map((item) => (
                  <StyledLink to={`/petsitters/${item.id}`} key={item.id}>
                    <RequestPetsitterBox key={item.id}>
                      <ProfileImg src={item.profileImg} alt="RequestPetsitterImg" />
                      <Petsitterbox>
                        <Nameox>{item.name}</Nameox>
                        <RatingReviewContainer>
                          <RatingImg src={item.ratingImg} alt="ratingImg" />
                          {item.rating}
                          <ReviewImg src={item.reviewImg} alt="reviewImg" />
                          {item.review}
                        </RatingReviewContainer>
                      </Petsitterbox>
                    </RequestPetsitterBox>
                  </StyledLink>
                ))}
              </RequestContainer>
            ))}
          </CustomCarousel>
        </RequestPetsitterContainer>
      </PetsitterContainer>
    </MainContainer>
  );
};

export default ViewPetsitters;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fefdff;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.textColors.secondary};
  min-height: 48px;
  gap: 120px;
  position: relative;
`;

const StatusTitleText = styled.div`
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const NewPetsitterText = styled.h2`
  margin-top: 36px;
  padding: 0 12px;
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const NewIntroContainer = styled.div`
  margin: 16px 12px 0 12px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
  width: 90%;
`;

const NewWrap = styled.div`
  display: flex;
  padding: 28px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const NewPetsitterImg = styled.img`
  width: 80px !important;
  height: 80px;
`;

const NewFaceBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 12px;
`;

const OnelineWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const NewPetsitterLocation = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  white-space: nowrap;
`;

const NewPetsitterDescription = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  margin-top: 8px;
  text-align: left;
  display: box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  flex-wrap: wrap;
`;

const PetsitterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  padding: 12px;
`;

const RequestPetsitterContainer = styled.div`
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};

  &:last-child {
    margin-bottom: 0;
  }
`;

const RequestContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 14px 0;
`;

const RequestPetsitterText = styled.h2`
  margin: 8px 0 4px;
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  white-space: pre-line;
`;

const RequestPetsitterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 79px;
  height: 77px;
  margin-bottom: 4px;
  border-radius: 79px;
`;

const Petsitterbox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  text-align: center;
`;

const Nameox = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const RatingReviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const RatingImg = styled.img`
  width: 14px;
  margin-right: 4px;
`;

const ReviewImg = styled.img`
  width: 14px;
  margin-right: 4px;
  margin-left: 4px;
  padding-top: 2px;
`;

const StyledCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: visible;
  }

  .dot {
    background: #279eff !important;
  }
`;

const CustomCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: visible;
  }

  .control-dots {
    top: 130px !important;
  }

  .dot {
    background: #279eff !important;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
