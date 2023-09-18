import styled from 'styled-components';
import { useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Divider, Drawer, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';

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
    possibleTime: '09:00 - 18:00',
  },
  {
    id: 2,
    name: '소희',
    rating: `4.0`,
    review: `1,200`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
    possibleTime: '09:00 - 18:00',
  },
  {
    id: 3,
    name: '지선',
    rating: `2.0`,
    review: `900`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
    possibleTime: '09:00 - 18:00',
  },
  {
    id: 4,
    name: '지선',
    rating: `2.0`,
    review: `900`,
    profileImg: '/imgs/PetsitterPhoto.svg',
    ratingImg: '/imgs/Star.svg',
    reviewImg: '/imgs/ReviewIcon.svg',
    possibleTime: '09:00 - 18:00',
  },
];

const HotPetsitterItem = [
  // 추후 DB에서 받아올 예정
  {
    id: 1,
    name: '홍길동',
    location: '서울시 강남구',
    profileImg: '/imgs/PetsitterPhoto.svg',
    describe: `자신있습니다 맡겨주세요자신있습니다 맡겨주세요자신있습니다 맡겨주세요자신있습니다 맡겨주세요`,
  },
  {
    id: 2,
    name: '펫당근',
    location: '경기 수원시',
    profileImg: '/imgs/PetsitterPhoto.svg',
    describe: `사실 케어에 자신이 없습니다. 사실 케어에 자신이 없습니다. 사실 케어에 자신이 없습니다. 사실 케어에 자신이 없습니다.`,
  },
  {
    id: 3,
    name: '문단속',
    location: '전라도 광주시',
    profileImg: '/imgs/PetsitterPhoto.svg',
    describe: `펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!`,
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('전체 펫시터'); // 필터 타입 상태 관리

  const handleFilterOpen = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilterButtonClick = (filterText: string) => {
    setFilterType(filterText);
    setIsFilterOpen(false);
  };

  const getTitleText = () => {
    switch (filterType) {
      case '전체 펫시터':
        return '전체 펫시터';
      case '내가 찜한 펫시터':
        return '내가 찜한 펫시터';
      case '새로 온 펫시터':
        return '새로 온 펫시터';
      case '리뷰가 많은 펫시터':
        return '리뷰가 많은 펫시터';
      default:
        return '펫시터 보기';
    }
  };

  const filteredPetsitters = () => {
    // DB에서 받기 전 임시 필터링
    if (!filterType) {
      return PetsittersItem;
    }

    switch (filterType) {
      case '내가 찜한 펫시터':
        return PetsittersItem.filter((item) => item.id === 1);
        break;
      case '새로 온 펫시터':
        return PetsittersItem.filter((item) => item.id === 2);
        break;
      case '리뷰가 많은 펫시터':
        return PetsittersItem.filter((item) => item.id === 3);
        break;
      default:
        return PetsittersItem;
    }
  };
  const filteredPetSitters = filteredPetsitters();

  return (
    <MainContainer>
      <StatusHeader>
        <StatusTitleText>펫시터 보기</StatusTitleText>
      </StatusHeader>
      <HotPetsitterText>별점이 높은 펫시터</HotPetsitterText>
      <HotIntroContainer>
        <StyledCarousel
          showThumbs={false}
          showStatus={false}
          autoPlay={false}
          emulateTouch={true}
          stopOnHover={true}
          infiniteLoop={true}
          showArrows={false}
          useKeyboardArrows={false}
          showIndicators={false}
        >
          {HotPetsitterItem.map((item) => (
            <HotWrap key={item.id}>
              <TitleContainer>
                <OnelineWrap>
                  <TitleName>{item.name}</TitleName>
                  <PetsitterText>펫시터</PetsitterText>
                </OnelineWrap>
              </TitleContainer>
              <DobleQuotationImg src="/imgs/DoubleQuotationMark.svg" alt="DobleQuotation" />
              <HotPetsitterImg src={item.profileImg} alt="Profile" />
              <HotFaceBox>
                <HotPetsitterReview>
                  {item.describe.length > 20
                    ? item.describe.substring(0, 19) + '\n' + item.describe.substring(19)
                    : item.describe}
                </HotPetsitterReview>
                <Divider />
                <NewPetsitterLocation>{item.location}</NewPetsitterLocation>
              </HotFaceBox>
            </HotWrap>
          ))}
        </StyledCarousel>
      </HotIntroContainer>

      <FilterContainer>
        <TitleBox>
          <TitleWrap>
            <TitleText>{getTitleText()}</TitleText>
            <ItemCountbox>{filteredPetSitters.length}</ItemCountbox>
          </TitleWrap>
          <FilterIcon src="/icons/FilterIcon.svg" alt="FilterIcon" onClick={handleFilterOpen} />
        </TitleBox>

        {filteredPetsitters().map((item) => (
          <FilterBodyBox key={item.id}>
            <PetsitterContainer key={item.id}>
              <PetsitterImg src="/imgs/PetsitterPhoto.svg" alt="PetsitterPhoto" />
              <PetsitterBody>
                <PetsitterWrap>
                  <NameText>{item.name}</NameText>
                  <Possiblebox>예약가능</Possiblebox>
                </PetsitterWrap>
                <TimeWrap>
                  <TimgImg src="/icons/TimeIcon.svg" alt="TimeIcon" />
                  <TimeText>{item.possibleTime}</TimeText>
                </TimeWrap>
                <RatingReviewContainer>
                  <RatingImg src={item.ratingImg} alt="ratingImg" />
                  {item.rating}
                  <ReviewImg src={item.reviewImg} alt="reviewImg" />
                  {item.review}
                </RatingReviewContainer>
              </PetsitterBody>
              <ContainerArrow src="/icons/PetsitterContainerArrow.svg" alt="ArrowIcon" />
            </PetsitterContainer>
          </FilterBodyBox>
        ))}
      </FilterContainer>

      <FilterDrawer anchor="bottom" open={isFilterOpen} onClose={handleFilterClose}>
        <List>
          <ListSubheader sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <FormatListBulleted sx={{ mr: 2 }} />
            <span>필터</span>
          </ListSubheader>
          <Divider />
          <ListItem button onClick={() => handleFilterButtonClick('전체 펫시터')}>
            <ListItemText primary="전체" sx={{ ml: 5 }} />
          </ListItem>
          <ListItem button onClick={() => handleFilterButtonClick('내가 찜한 펫시터')}>
            <ListItemText primary="내가 찜한 펫시터" sx={{ ml: 5 }} />
          </ListItem>
          <ListItem button onClick={() => handleFilterButtonClick('새로 온 펫시터')}>
            <ListItemText primary="새로 온 펫시터" sx={{ ml: 5 }} />
          </ListItem>
          <ListItem button onClick={() => handleFilterButtonClick('리뷰가 많은 펫시터')}>
            <ListItemText primary="리뷰가 많은 펫시터" sx={{ ml: 5 }} />
          </ListItem>
        </List>
      </FilterDrawer>
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
  margin-top: -64px;
  min-height: 64px;
  gap: 120px;
  position: relative;
`;

const StatusTitleText = styled.div`
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const HotPetsitterText = styled.h2`
  margin-top: 36px;
  padding: 0 12px;
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const HotIntroContainer = styled.div`
  margin: 12px 12px 0 12px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const HotWrap = styled.div`
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  background-color: ${(props) => props.theme.colors.mainBlue};
  border-radius: 8px 8px 0 0;
  padding: 12px 0 12px 32px;
`;

const DobleQuotationImg = styled.img`
  width: 20px;
  height: 13px;
  margin-top: 18px;
  position: absolute;
  left: -40%;
`;

const TitleName = styled.div`
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
`;

const PetsitterText = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.primary};
  margin: 5px 0 0 8px;
`;

const HotPetsitterImg = styled.img`
  width: 60px !important;
  height: 60px;
  position: absolute;
  top: 18px;
  right: 14%;
`;

const HotFaceBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 40px 14px 40px;
`;

const OnelineWrap = styled.div`
  display: flex;
`;

const NewPetsitterLocation = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  white-space: nowrap;
  margin-top: 14px;
  text-align: left;
`;

const HotPetsitterReview = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  margin-top: 36px;
  margin-bottom: 14px;
  text-align: left;
  display: box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  flex-wrap: wrap;
`;

const RatingReviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const RatingImg = styled.img`
  width: 14px;
  margin-right: 6px;
`;

const ReviewImg = styled.img`
  width: 14px;
  margin-right: 6px;
  margin-left: 16px;
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

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 36px;
`;

const TitleWrap = styled.div`
  display: flex;
  position: absolute;
  left: 40px;
`;

const TitleText = styled.div`
  font-size: ${(props) => props.theme.fontSize.s20h30};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const ItemCountbox = styled.div`
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  padding: 2px 5px;
  border-radius: 4px;
  margin: 5px 0 5px 8px;
`;

const FilterIcon = styled.img`
  position: absolute;
  top: 6px;
  right: 40px;
  cursor: pointer;
`;

const FilterBodyBox = styled.div``;

const PetsitterContainer = styled.a`
  display: flex;
  margin: 12px;
  padding: 12px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  position: relative;
  cursor: pointer;
`;

const PetsitterImg = styled.img``;

const PetsitterBody = styled.div`
  margin-left: 36px;
`;

const PetsitterWrap = styled.div`
  display: flex;
  margin-top: -4px;
`;

const NameText = styled.div`
  font-size: ${(props) => props.theme.fontSize.s20h30};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  margin-right: 12px;
`;

const Possiblebox = styled.div`
  font-size: 12px;
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlue};
  padding: 2px 8px;
  margin: 6px 0 6px 0;
  line-height: 16px;
  border-radius: 8px;
`;

const TimeWrap = styled.div`
  display: flex;
  margin-top: -2px;
  margin-bottom: 8px;
`;

const TimgImg = styled.img`
  margin-top: 5px;
  margin-right: 16px;
  width: 12px;
  height: 12px;
`;

const TimeText = styled.div`
  font-size: ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.gray50};
`;

const ContainerArrow = styled.img`
  position: absolute;
  top: 43%;
  right: 10%;
  width: 6px;
  height: 12px;
`;

const FilterDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    height: 36%;
    max-height: 100%;
    background-color: ${(props) => props.theme.colors.white};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
  }
`;
