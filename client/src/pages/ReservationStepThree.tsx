import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const RequestPetsitterItem = [
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

const RequestPetsitterItemChunks = chunkArray(RequestPetsitterItem, 3);

const ReservationStepThree = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/reservation/step2');
  };

  return (
    <MainContainer>
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>3/3</PageNumberText>
      </StatusHeader>

      <PetsitterContainer>
        <RequestPetsitterContainer>
          <RequestPetsitterText>{`요청한 예약 날짜에 맞는 펫시터`}</RequestPetsitterText>
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
            {RequestPetsitterItemChunks.map((chunk, idx) => (
              <RequestContainer key={idx}>
                {chunk.map((item) => (
                  <StyledLink to={`/petsitters/:${item.id}`} key={item.id}>
                    <RequestPetsitterBox>
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
            {RequestPetsitterItemChunks.map((chunk, idx) => (
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
            {RequestPetsitterItemChunks.map((chunk, idx) => (
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
            {RequestPetsitterItemChunks.map((chunk, idx) => (
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

export default ReservationStepThree;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% + 12 * 2);
  margin: 0 -12px;
  padding: 12px;
  background-color: ${(props) => props.theme.textColors.secondary};
`;

const BackImg = styled.img`
  cursor: pointer;
`;

const StatusTitleText = styled.div`
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const PageNumberText = styled.div`
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

const PetsitterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 12px;
`;

const RequestPetsitterContainer = styled.div`
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.textColors.secondary};

  &:last-child {
    margin-bottom: 0;
  }
`;

const RequestContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
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

const CustomCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: visible;
  }

  .control-dots {
    top: 134px !important;
  }

  .dot {
    background: #279eff !important;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
