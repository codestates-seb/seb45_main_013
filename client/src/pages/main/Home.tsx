// * Slide Custom, 기타 css 변경, 불필요한 css 제거, Link로 변경
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { refreshAccessToken } from 'hooks/refreshAcessToken';
import { useDispatch } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import { styled as styledMui } from '@mui/material/styles';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favoritePetsitter, setFavoritePetsitter] = useState<any>('');
  const [newestReviews, setNewestReviews] = useState<any[]>([]);

  const onErrorImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/imgs/DefaultUser.svg';
  };

  // 내가 자주 이용하는 펫시터
  useEffect(() => {
    const getFavoritePetsitter = async () => {
      const accessToken = getCookieValue('access_token');
      try {
        const response = await axios.get(`${apiUrl}/members/favorite`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setFavoritePetsitter(response.data[0]);
      } catch (error: any) {
        setFavoritePetsitter('');
        console.log(error);
        if (error.response.status === 401 && error.response.status === 500) {
          try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              const response = await axios.get(`${apiUrl}/members/favorite`, {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              });

              setFavoritePetsitter(response.data[0]);
            }
          } catch (refreshError) {
            console.log(refreshError);
            // alert('로그인 세션이 만료되었습니다. 안전한 서비스 이용을 위해 다시 로그인해 주시기 바랍니다.');
            // dispatch(deleteUser());
            // deleteCookie('access_token');
            // deleteCookie('refresh_token');
          }
        }
      }
    };
    getFavoritePetsitter();
  }, []);

  useEffect(() => {
    const getNewestReview = async () => {
      try {
        const response = await axios(`${apiUrl}/reviews?page=1&size=10`);

        setNewestReviews(response.data.reviews);
      } catch (error) {
        setNewestReviews([]);
      }
    };
    getNewestReview();
  }, []);

  return (
    <HomeContainer>
      <Helmet>
        <title>Petmily - Home</title>
        <meta name="description" content="펫시터 방문 돌봄 서비스, 우리는 펫밀리입니다." />
        <link rel="canonical" href="https://petmily.shop" />
        <meta property="og:title" content="Petmily - Home" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://petmily.shop" />
        <meta property="og:description" content="펫시터를 찾으시나요? 지금 바로 만나보세요." />
        <meta property="og:image" content="https://petmily.shop/imgs/Logo.svg" />
        <meta property="og:image:secure_url" content="https://petmily.shop/imgs/Logo.svg" />
        <meta property="og:image:type" content="image/svg+xml" />
      </Helmet>
      <img src="/imgs/HomeTitleAd.svg" alt="Advertising" width="100%" />
      <CustomLink to={'/search'}>펫시터 검색</CustomLink>
      <LinkContainer>
        <PetsitterLink onClick={() => navigate('/petsitters')}>
          <StyledLink>펫시터 보기</StyledLink>
        </PetsitterLink>
        <PetsitterLink onClick={() => navigate('/qna')}>
          <StyledLink>펫시터QnA</StyledLink>
        </PetsitterLink>
      </LinkContainer>
      <AdSubContainer>
        <AdSubText>{'첫 만남\n 50% 할인 쿠폰'}</AdSubText>
        <img src="/imgs/HomeSubAd.svg" alt="Advertising" />
      </AdSubContainer>
      <OftenPetsitterText>내가 자주 이용하는 펫시터</OftenPetsitterText>
      <OftenPetsitterContainer>
        {favoritePetsitter ? (
          <>
            <ImageContainer>
              {favoritePetsitter.photo ? (
                <ProfileImg
                  src={favoritePetsitter.photo.replace('https://bucketUrl', bucketUrl)}
                  alt="OftenPetsitterImg"
                />
              ) : (
                <img src="/imgs/PetsitterPhoto" alt="petsitterPhoto" />
              )}
            </ImageContainer>

            <OftenPetsitterbox>
              <Nameox>{favoritePetsitter.name}</Nameox>
              <DiscriptionText>{favoritePetsitter.body}</DiscriptionText>
              <RatingReviewContainer>
                <RatingContainer>
                  <RatingImg src="/imgs/Star.svg" alt="star" />
                  <div>{favoritePetsitter.star}</div>
                </RatingContainer>
                <ReviewContainer>
                  <ReviewImg src="/imgs/ReviewIcon.svg" alt="review" />
                  <div>{favoritePetsitter.reviewCount}</div>
                </ReviewContainer>
              </RatingReviewContainer>
            </OftenPetsitterbox>
          </>
        ) : (
          <div style={{ margin: '20px' }}>
            <div>펫시터를 찜해보세요!</div>
            <button>펫시터 찜하러 가기</button>
          </div>
        )}
      </OftenPetsitterContainer>
      <OftenPetsitterText>실시간 리뷰</OftenPetsitterText>
      <RealtimeReviewContainer>
        <CustomCarousel
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          emulateTouch={true}
          stopOnHover={true}
          infiniteLoop={true}
          showArrows={false}
          useKeyboardArrows={false}
        >
          {newestReviews.map((review) => (
            <ReviewCard key={review.reviewId}>
              <ImageContainer>
                {review.memberPhoto ? (
                  <MemberPhotoImage
                    src={review.memberPhoto.replace('https:/bucketUrl', bucketUrl)}
                    alt="client"
                    onError={onErrorImg}
                  />
                ) : (
                  <img src="/imgs/DefaultUser.svg" alt="clientPhoto" />
                )}
              </ImageContainer>
              <RemainContainer>
                <AddressRatingContainer>
                  <AddressText>
                    {review.reservationAddress.split(' ')[1] + ' ' + review.reservationAddress.split(' ')[2]}
                  </AddressText>
                  <StyledRating value={review.star} precision={1} icon={<StarIcon />} readOnly />
                </AddressRatingContainer>
                <ReviewText>{review.body}</ReviewText>
              </RemainContainer>
            </ReviewCard>
          ))}
        </CustomCarousel>
      </RealtimeReviewContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
  padding: 12px;
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

const StyledLink = styled.div`
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
const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const RemainContainer = styled.div`
  padding: 8px;
  flex-grow: 1;

  /* overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; */
`;

const AddressRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AddressText = styled.div`
  ${({ theme }) => theme.fontSize.s18h27}
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StyledRating = styledMui(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#279EFF',
  },
});

const ReviewText = styled.div`
  display: box;
  overflow: hidden;
  padding-top: 12px;
  line-height: 1.2;
  padding-bottom: 16px;
  text-align: left;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ProfileImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
`;

const MemberPhotoImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
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
  display: box;
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
  gap: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const RatingImg = styled.img`
  width: 16px;
`;

const ReviewContainer = styled.div`
  display: flex;
`;

const ReviewImg = styled.img`
  width: 14px;
  margin-right: 4px;
  margin-left: 12px;
  padding-top: 2px;
`;

const RealtimeReviewContainer = styled.div`
  margin-top: 16px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const ReviewCard = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
`;

const CustomCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: visible;
  }

  .control-dots {
    bottom: -4px !important;
  }

  .dot {
    background: #279eff !important;
  }
`;

export default Home;
