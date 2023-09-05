import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handlePetsitterClick = () => {
    navigate('/petsitters');
  };

  const handlePetsitterQnaClick = () => {
    navigate('/qna');
  };

  return (
    <HomeContainer>
      <AdContainer>
        <img src="/imgs/HomeTitleAd.svg" alt="Advertising" width="100%" />
      </AdContainer>
      <SearchInputContainer onClick={handleSearchClick}>
        <SearchInput placeholder="펫시터 검색" />
      </SearchInputContainer>
      <LinkContainer>
        <PetsitterLink onClick={handlePetsitterClick}>펫시터 보기</PetsitterLink>
        <PetsitterQnaLink onClick={handlePetsitterQnaClick}>펫시터 Q&A</PetsitterQnaLink>
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
              <Nameox>{item.name}</Nameox>
              <ReservationButton>예약하기</ReservationButton>
            </OnelineContainer>
            <DiscriptionText>
              {item.describe.length > 20 ? item.describe.substring(0, 20) + '...' : item.describe}
            </DiscriptionText>
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
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          emulateTouch={true}
          stopOnHover={true}
          infiniteLoop={true}
          useKeyboardArrows={false}
        >
          {RealtimeReviewItem.map((item) => (
            <RealtimeReviewWrap key={item.id}>
              <RealtimeImgWrap>
                <RealtimeImg src={item.profileImg} alt="Profile" />
              </RealtimeImgWrap>
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
        </Carousel>
      </RealtimeReviewContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  margin-top: 84px;
  flex-direction: column;
  justify-content: flex-start;
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
  ${(props) => props.theme.fontSize.s12h18};
  color: #a3a3a3;
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
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
  min-height: 67px;
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s16h24};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const PetsitterQnaLink = styled.a`
  width: calc(100% - 162px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 67px;
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s16h24};
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
  min-height: 93px;
  margin: 16px 12px 0;
  padding: 8px 12px 12px;
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
  gap: 140px;
`;

const Nameox = styled.div`
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
  display: flex;
  justify-content: space-around;
  min-height: 160px;
  margin: 16px 12px 48px;
  padding: 18px 22px 14px 22px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const RealtimeReviewWrap = styled.div`
  display: flex;
  min-height: 140px;
  justify-content: space-around;
`;

const RealtimeImgWrap = styled.div``;

const RealtimeBox = styled.div``;

const OnelineWrap = styled.div`
  display: flex;
`;

const RealtimeImg = styled.img`
  width: 80px;
  height: 80px;
`;

const RealtimeDescription = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  margin-top: 8px;
  white-space: pre-line;
  text-align: left;
`;

const RealtimeLocation = styled.div`
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export default Home;
