// * Slide Custom, 기타 css 변경, 불필요한 css 제거, Link로 변경
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

// 추후 UseEffect로 데이터 받아올 데이터 (내가 자주 이용하는 펫시터)
const OftenPetsitterItem = [
  {
    id: 1,
    name: '도희',
    describe: '안녕하세요! 도희입니다. 펫시터를 시작한지 3년이 되었어요.',
    rating: `5.0`,
    review: `1,630`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
  },
];

// 추후 UseEffect로 데이터 받아올 데이터 (실시간 리뷰)
const RealtimeReviewItem = [
  {
    id: 1,
    location: '서울시 강남구',
    rating: `5.0`,
    shortContent: `강아지가 너무 귀여워요!`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `진짜 매일같이 정성스럽게돌봐주시는 덕분에 사람을더 좋아하게 되는거 같아요ㅜㅜ`,
  },
  {
    id: 2,
    location: '경기 수원시',
    rating: `4.0`,
    shortContent: `제가 너무 귀여워요!`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `조금 케어가 부족한거 같아요`,
  },
  {
    id: 3,
    location: '전라도 광주시',
    rating: `2.0`,
    shortContent: `펫시터님이 너무 귀여워요!`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    describe: `펫시터님이 잘 케어해주세요!`,
  },
];

const Home = () => {
  return (
    <HomeContainer>
      <img src="/imgs/HomeTitleAd.svg" alt="Advertising" width="100%" />
      <CustomLink to={'/search'}>펫시터 검색</CustomLink>
      <LinkContainer>
        <PetsitterLink>
          <StyledLink to={'/petsitters'}>펫시터 보기</StyledLink>
        </PetsitterLink>
        <PetsitterLink>
          <StyledLink to={'/qna'}>펫시터QnA</StyledLink>
        </PetsitterLink>
      </LinkContainer>
      <AdSubContainer>
        <AdSubText>{'첫 만남\n 50% 할인 쿠폰'}</AdSubText>
        <img src="/imgs/HomeSubAd.svg" alt="Advertising" />
      </AdSubContainer>
      <OftenPetsitterText>내가 자주 이용하는 펫시터</OftenPetsitterText>
      {OftenPetsitterItem.map((item) => (
        <OftenPetsitterContainer key={item.id}>
          <ProfileImg src={item.profileImg} alt="OftenPetsitterImg" />
          <OftenPetsitterbox>
            <Nameox>{item.name}</Nameox>
            <DiscriptionText>{item.describe}</DiscriptionText>
            <RatingReviewContainer>
              <RatingImg src={item.ratingImg} alt="ratingImg" />
              {item.rating}
              <ReviewImg src={item.reviewImg} alt="reviewImg" />
              {item.review}
            </RatingReviewContainer>
          </OftenPetsitterbox>
          <ReservationButton>예약하기</ReservationButton>
        </OftenPetsitterContainer>
      ))}
      <OftenPetsitterText>실시간 리뷰</OftenPetsitterText>
      <RealtimeReviewContainer>
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
          {RealtimeReviewItem.map((item) => (
            <RealtimeReviewWrap key={item.id}>
              <RealtimeImg src={item.profileImg} alt="Profile" />
              <RealtimeBox>
                <OnelineWrap>
                  <RealtimeLocation>{item.location}</RealtimeLocation>
                  <Rating name="read-only" value={Number(item.rating)} size="small" readOnly />
                </OnelineWrap>
                <RealtimeDescription>
                  {item.describe.length > 20
                    ? item.describe.substring(0, 19) + '\n' + item.describe.substring(19)
                    : item.describe}
                </RealtimeDescription>
              </RealtimeBox>
            </RealtimeReviewWrap>
          ))}
        </CustomCarousel>
      </RealtimeReviewContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 84px;
  background-color: #fefdff;
`;

const AdContainer = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
`;

const CustomLink = styled(Link)`
  margin-top: 16px;
  text-decoration: none;
  color: #a3a3a3;
  background-color: ${(props) => props.theme.lineColors.coolGray90};
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s12h18};
`;

const LinkContainer = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
`;

const PetsitterLink = styled.a`
  display: flex;
  flex: 1;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s16h24};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AdSubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 16px 24px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const AdSubText = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: 600;
  white-space: pre-line;
`;

const OftenPetsitterText = styled.h2`
  margin-top: 36px;
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const OftenPetsitterContainer = styled.div`
  display: flex;
  margin-top: 16px;
  cursor: pointer;
  padding: 8px 12px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const OftenPetsitterbox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  margin-left: 24px;
`;

const ProfileImg = styled.img`
  width: 79px;
  height: 77px;
  border-radius: 79px;
`;

const Nameox = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const ReservationButton = styled.button`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
  background-color: ${(props) => props.theme.colors.mainBlue};
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  padding: 2px 8px;
  white-space: nowrap;
  margin-left: auto;
  margin-bottom: auto;
  cursor: pointer;
`;

const DiscriptionText = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  margin-top: 4px;
  color: ${(props) => props.theme.textColors.gray40};
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

const RatingReviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const RatingImg = styled.img`
  width: 14px;
  margin-right: 4px;
`;

const ReviewImg = styled.img`
  width: 14px;
  margin-right: 4px;
  margin-left: 12px;
  padding-top: 2px;

const RealtimeReviewContainer = styled.div`
  margin-top: 16px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const RealtimeReviewWrap = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 8px;
`;

const RealtimeBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 12px;
`;

const OnelineWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const RealtimeImg = styled.img`
  width: 80px !important;
  height: 80px;
`;

const RealtimeDescription = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  margin-top: 8px;
  text-align: left;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  flex-wrap: wrap;
`;

const RealtimeLocation = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  white-space: nowrap;
`;

const CustomCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: visible;
  }

  .control-dots {
    bottom: -30px !important;
  }

  .dot {
    background: #279eff !important;
  }
`;

export default Home;
