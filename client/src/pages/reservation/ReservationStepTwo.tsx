import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

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

const ReservationStepTwo = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('요청한 예약 날짜에 맞는 펫시터'); // 필터 타입 상태 관리

  const handleBackClick = () => {
    navigate('/reservation');
  };

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
      case '요청한 예약 날짜에 맞는 펫시터':
        return '요청한 예약 날짜에 맞는 펫시터';
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
      case '요청한 예약 날짜에 맞는 펫시터':
        return PetsittersItem.filter((item) => item.id === 4);
        break;
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
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>2/2</PageNumberText>
      </StatusHeader>

      <FilterContainer>
        <TitleBox>
          <TitleWrap>
            <TitleText>{getTitleText()}</TitleText>
            <ItemCountbox>{filteredPetSitters.length}</ItemCountbox>
          </TitleWrap>
          <FilterIcon src="/icons/FilterIcon.svg" alt="FilterIcon" onClick={handleFilterOpen} />
        </TitleBox>

        {filteredPetsitters().map((item) => (
          <StyledLink to={`/petsitters/${item.id}`} key={item.id}>
            <FilterBodyBox key={item.id}>
              <PetsitterContainer>
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
          </StyledLink>
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
          <ListItem button onClick={() => handleFilterButtonClick('요청한 예약 날짜에 맞는 펫시터')}>
            <ListItemText primary="요청한 예약 날짜에 맞는 펫시터" sx={{ ml: 5 }} />
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

export default ReservationStepTwo;

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

const PetsitterContainer = styled.div`
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
    height: 44%;
    max-height: 100%;
    background-color: ${(props) => props.theme.colors.white};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
  }
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
