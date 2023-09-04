import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// 추후 UseEffect로 데이터 받아올 데이터 (내가 자주 이용하는 펫시터)
const OftenPetsitterItem = [
  {
    id: 1,
    name: '도희',
    describe: '안녕하세요! 도희입니다.',
    rating: `5.0`,
    review: `1,630`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
  },
];

const RealtimeReviewItem = [
  {
    id: 1,
    location: '서울시 강남구',
    rating: `5.0`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
  },
  {
    id: 2,
    location: '경기 수원시',
    rating: `4.0`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
  },
  {
    id: 3,
    location: '전라도 광주시',
    rating: `2.0`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
  },
];

const Home = () => {
  return (
    <HomeContainer>
      <AdContainer>
        <img src="/imgs/HomeTitleAd.svg" alt="Advertising" width="100%" />
      </AdContainer>
      <SearchInputContainer>
        <SearchInput placeholder="펫시터 검색" />
      </SearchInputContainer>
      <LinkContainer>
        <PetsitterLink>펫시터 보기</PetsitterLink>
        <PetsitterQnaLink>펫시터 Q&A</PetsitterQnaLink>
      </LinkContainer>
      <AdSubContainer>
        <AdSubText>{'첫 만남\n 50% 할인 쿠폰'}</AdSubText>
        <img src="/imgs/HomeSubAd.svg" alt="Advertising" />
      </AdSubContainer>
      <OftenPetsitterText>내가 자주 이용하는 펫시터</OftenPetsitterText>
      {OftenPetsitterItem.map((item) => (
        <OftenPetsitterContainer key={item.id}>
          <Imgbox>
            <img src={item.profileImg} alt="OftenPetsitterImg" />
          </Imgbox>
          <OftenPetsitterbox>
            <OnelineContainer>
              <Namebox>{item.name}</Namebox>
              <ReservationButton>예약하기</ReservationButton>
            </OnelineContainer>
            <DiscriptionText>{item.describe}</DiscriptionText>
            <RatingReviewContainer>
              <RatingImg src={item.ratingImg} alt="ratingImg" />
              {item.rating}
              <ReviewImg src={item.reviewImg} alt="reviewImg" />
              {item.review}
            </RatingReviewContainer>
          </OftenPetsitterbox>
        </OftenPetsitterContainer>
      ))}
      <RealtimeReviewText>실시간 리뷰</RealtimeReviewText>
      <RealtimeReviewContainer>
        <Carousel showThumbs={false}>
          {RealtimeReviewItem.map((item) => (
            <div key={item.id}>
              <img src={item.profileImg} alt="Profile" />
              <p>{item.location}</p>
              <RatingImg src={item.ratingImg} alt="ratingImg" />
              {item.rating}
            </div>
          ))}
        </Carousel>
      </RealtimeReviewContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  border: 1px solid black;
  background-color: #fefdff;
`;

const AdContainer = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 92px 12px 0;
`;

const SearchInputContainer = styled.div`
  height: 28px;
  margin: 16px 12px 0;
`;

const SearchInput = styled.input`
  padding: 10px 0 10px 14px;
  ${(props) => props.theme.fontSize.s14h21};
  color: #a3a3a3;
  font-family: 'Noto Sans KR';
  font-weight: bold;
  border-radius: 8px;
  width: 100%;
  background-color: ${(props) => props.theme.lineColors.coolGray90};
  border: none;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: space-between;
  height: 67px;
  margin: 28px 12px 0;
  background-color: ${(props) => props.theme.colors.white};

  /* margin-top: 20px; */
  gap: 12px;
`;

const PetsitterLink = styled.a`
  width: calc(100% - 162px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s18h27};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const PetsitterQnaLink = styled.a`
  width: calc(100% - 162px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s18h27};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const AdSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
  margin: 16px 12px 0;
  padding-right: 24px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const AdSubText = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding-left: 24px;
  display: flex;
  align-items: center;
  white-space: pre-line;
`;

const OftenPetsitterText = styled.div`
  margin: 36px 12px 0;
  ${(props) => props.theme.fontSize.s18h27};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const OftenPetsitterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 93px;
  margin: 16px 12px 0;
  padding: 8px 12px 0;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const OftenPetsitterbox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Imgbox = styled.div`
  width: 79px;
  height: 77px;
  border-radius: 79px;
`;

const OnelineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 200px;
`;

const Namebox = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const ReservationButton = styled.button`
  ${(props) => props.theme.fontSize.s14h21};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.light};
  background-color: ${(props) => props.theme.colors.mainBlue};
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  padding: 2px 8px;
`;

const DiscriptionText = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.gray40};
  margin-top: 4px;
`;

const RatingReviewContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

const RatingImg = styled.img`
  margin-right: 4px;
  width: 14px;
`;

const ReviewImg = styled.img`
  margin-left: 12px;
  margin-right: 4px;
  padding-top: 2px;
  width: 14px;
`;

const RealtimeReviewText = styled.div`
  margin: 36px 12px 0;
  ${(props) => props.theme.fontSize.s18h27};
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const RealtimeReviewContainer = styled.div`
  border: 1px solid black;
`;

export default Home;
