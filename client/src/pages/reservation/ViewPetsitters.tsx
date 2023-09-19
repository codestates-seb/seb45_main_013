import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Divider, Drawer, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

interface Petsitters {
  petsitterId: number;
  name: string;
  photo: string;
  rating: number;
  review: number;
  possibleTimeStart: string;
  possibleTimeEnd: string;
}

const onErrorImg = (e: any) => {
  e.target.src = '/imgs/PetProfile.png';
};

// const HotPetsitterItem = [
//   // 추후 DB에서 받아올 예정
//   {
//     id: 1,
//     name: '홍길동',
//     location: '서울시 강남구',
//     profileImg: '/imgs/PetsitterPhoto.svg',
//     describe: `자신있습니다 맡겨주세요자신있습니다 맡겨주세요자신있습니다 맡겨주세요자신있습니다 맡겨주세요`,
//   },
//   {
//     id: 2,
//     name: '펫당근',
//     location: '경기 수원시',
//     profileImg: '/imgs/PetsitterPhoto.svg',
//     describe: `사실 케어에 자신이 없습니다. 사실 케어에 자신이 없습니다. 사실 케어에 자신이 없습니다. 사실 케어에 자신이 없습니다.`,
//   },
//   {
//     id: 3,
//     name: '문단속',
//     location: '전라도 광주시',
//     profileImg: '/imgs/PetsitterPhoto.svg',
//     describe: `펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!펫시터님이 잘 케어해주세요!`,
//   },
// ];

const ViewPetsitters = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('전체 펫시터'); // 필터 타입 상태 관리
  const [petsitters, setPetsitters] = useState<Petsitters[]>([]); // 전체 펫시터 데이터 상태 관리
  // const [starPetsitters, setStarPetsitters] = useState([]); // 인기 펫시터 데이터 상태 관리
  // const [newPetsitters, setNewPetsitters] = useState([]); // 새로 온 펫시터 데이터 상태 관리
  // const [reviewPetsitters, setReviewPetsitters] = useState([]); // 리뷰가 많은 펫시터 데이터 상태 관리

  //submit state
  const { isLogin } = useSelector((state: IUser) => state.user);

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

  const formattedStartTime = (petsitter: Petsitters) =>
    new Date(petsitter.possibleTimeStart).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formattedEndTime = (petsitter: Petsitters) =>
    new Date(petsitter.possibleTimeEnd).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

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

  const filteredPetsitters = (petsitters: Petsitters[]) => {
    // DB에서 받기 전 임시 필터링
    if (!filterType) {
      return petsitters;
    }

    switch (filterType) {
      case '내가 찜한 펫시터':
        return petsitters.filter((petsitter) => petsitter.petsitterId === 1);
        break;
      case '새로 온 펫시터':
        return petsitters.filter((petsitter) => petsitter.petsitterId === 2);
        break;
      case '리뷰가 많은 펫시터':
        return petsitters.filter((petsitter) => petsitter.petsitterId === 3);
        break;
      default:
        return petsitters;
    }
  };

  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요.');
      navigate('/login');
    }

    const accessToken = getCookieValue('access_token');

    if (isLogin && accessToken) {
      try {
        axios
          .get(`${apiUrl}/members/search`, { headers: { Authorization: `Bearer ${accessToken}` } })
          .then((res) => {
            setPetsitters(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.error('펫시터 정보를 불러오는 데 실패했습니다.', error);
          });
      } catch (error: any) {
        console.error('펫시터 정보를 불러오는 데 실패했습니다.', error);
      }
    }
  }, []);

  return (
    <MainContainer>
      <StatusHeader>
        <StatusTitleText>펫시터 보기</StatusTitleText>
      </StatusHeader>
      {/* <HotPetsitterText>별점이 높은 펫시터</HotPetsitterText>
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
      </HotIntroContainer> */}

      <FilterContainer>
        <TitleBox>
          <TitleWrap>
            <TitleText>{getTitleText()}</TitleText>
            <ItemCountbox>{petsitters.length}</ItemCountbox>
          </TitleWrap>
          <FilterIcon src="/icons/FilterIcon.svg" alt="FilterIcon" onClick={handleFilterOpen} />
        </TitleBox>

        {Array.isArray(petsitters) &&
          petsitters.length > 0 &&
          filteredPetsitters(petsitters).map((petsitters: any) => (
            <FilterBodyBox key={petsitters.petsitterId}>
              <PetsitterContainer>
                <PetsitterImg
                  src={
                    petsitters.photo ? (
                      petsitters.photo.replace('https://bucketUrl', bucketUrl)
                    ) : (
                      <div style={{ width: '80px', height: '80px', backgroundColor: 'gray' }}>사진을 등록해 주세요</div>
                    )
                  }
                  onError={onErrorImg}
                  alt="PetsitterPhoto"
                />
                <PetsitterBody>
                  <PetsitterWrap>
                    <NameText>{petsitters.name}</NameText>
                    <Possiblebox>예약가능</Possiblebox>
                  </PetsitterWrap>
                  <TimeWrap>
                    <TimgImg src="/icons/TimeIcon.svg" alt="TimeIcon" />
                    <TimeText>{`${formattedStartTime(petsitters)} ~ ${formattedEndTime(petsitters)}`}</TimeText>
                  </TimeWrap>
                  <RatingReviewContainer>
                    <RatingImg src="/imgs/Star.svg" alt="ratingImg" />
                    {petsitters.star}
                    <ReviewImg src="/imgs/ReviewIcon.svg" alt="reviewImg" />
                    {petsitters.reviewCount}
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
  margin-top: -74px;
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
