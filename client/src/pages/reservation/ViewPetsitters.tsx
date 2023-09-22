import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { getCookieValue } from 'hooks/getCookie';
import { refreshAccessToken } from 'hooks/refreshAcessToken';
import { deleteReservation } from 'store/reservationSlice';
import { deleteUser } from 'store/userSlice';
import { deleteCookie } from 'hooks/deleteCookie';
import { useDispatch } from 'react-redux';
import PetsitterCard from '@components/PetsitterCard';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Divider, Drawer, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

interface Petsitter {
  petsitterId: number;
  name: string;
  photo?: string;
  body: string;
  possibleLocation: string;
}

const ViewPetsitters = () => {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('전체 펫시터'); // 필터 타입 상태 관리
  const [properPetsitters, setProperPetsitters] = useState<Petsitter[]>([]);

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/imgs/DefaultUser.svg';
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

  useEffect(() => {
    if (filterType === '전체 펫시터') {
      const getAllPetsitters = async () => {
        try {
          const response = await axios.get(`${apiUrl}/members/search`);
          setProperPetsitters(response.data.data);
        } catch (error) {
          setProperPetsitters([]);
        }
      };
      getAllPetsitters();
    } else if (filterType === '내가 찜한 펫시터') {
      const getFavoritePetsitters = async () => {
        const accessToken = getCookieValue('access_token');
        try {
          const response = await axios.get(`${apiUrl}/members/favorite`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setProperPetsitters(response.data);
        } catch (error: any) {
          if (error.response.status === 401) {
            try {
              const newAccessToken = await refreshAccessToken();
              if (newAccessToken) {
                const response = await axios.get(`${apiUrl}/members/favorite`, {
                  headers: { Authorization: `Bearer ${newAccessToken}` },
                });
                setProperPetsitters(response.data);
              }
            } catch (refreshError) {
              console.log(refreshError);
              alert('로그인이 만료되었습니다. 다시 로그인 해주세요');
              dispatch(deleteUser());
              dispatch(deleteReservation());
              deleteCookie('access_token');
              deleteCookie('refresh_token');
            }
          }
          setProperPetsitters([]);
        }
      };
      getFavoritePetsitters();
    } else if (filterType === '새로 온 펫시터') {
      const getNewPetsitters = async () => {
        try {
          const response = await axios.get(`${apiUrl}/members/search`);
          setProperPetsitters(response.data.data);
        } catch (error) {
          setProperPetsitters([]);
        }
      };
      getNewPetsitters();
    } else if (filterType === '별점이 높은 펫시터') {
      const getHighPetsitters = async () => {
        try {
          const response = await axios.get(`${apiUrl}/members/search?star=0`);
          setProperPetsitters(response.data.data);
        } catch (error) {
          setProperPetsitters([]);
        }
      };
      getHighPetsitters();
    } else if (filterType === '리뷰가 많은 펫시터') {
      const getManyReviewsPetsitters = async () => {
        try {
          const response = await axios.get(`${apiUrl}/members/search?reviewCount=0`);
          setProperPetsitters(response.data.data);
        } catch (error) {
          setProperPetsitters([]);
        }
      };
      getManyReviewsPetsitters();
    }
  }, [filterType]);

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
          {properPetsitters.map((petsitter) => (
            <HotWrap key={petsitter.petsitterId}>
              <TitleContainer>
                <OnelineWrap>
                  <TitleName>{petsitter.name}</TitleName>
                  <PetsitterText>펫시터</PetsitterText>
                </OnelineWrap>
              </TitleContainer>
              <DobleQuotationImg src="/imgs/DoubleQuotationMark.svg" alt="DobleQuotation" />
              {petsitter.photo ? (
                <HotPetsitterImg
                  src={petsitter.photo ? petsitter.photo.replace('https:/bucketUrl', bucketUrl || '') : undefined}
                  alt="ProfileImg"
                  onError={onErrorImg}
                />
              ) : (
                <img src="/imgs/DefaultUser.svg" alt="ProfileImg" />
              )}
              <HotFaceBox>
                <HotPetsitterReview>
                  {petsitter.body?.length > 20
                    ? petsitter.body.substring(0, 19) + '\n' + petsitter.body.substring(19)
                    : petsitter.body}
                </HotPetsitterReview>
                <Divider />
                <NewPetsitterLocation>{petsitter.possibleLocation[0]}</NewPetsitterLocation>
              </HotFaceBox>
            </HotWrap>
          ))}
        </StyledCarousel>
      </HotIntroContainer>

      <FilterContainer>
        <TitleBox>
          <TitleWrap>
            <TitleText>{filterType}</TitleText>
            <ItemCountbox>{properPetsitters.length}</ItemCountbox>
          </TitleWrap>
          <FilterIcon src="/icons/FilterIcon.svg" alt="FilterIcon" onClick={handleFilterOpen} />
        </TitleBox>
      </FilterContainer>

      <Box>
        {Array.isArray(properPetsitters) &&
          properPetsitters?.length > 0 &&
          properPetsitters.map((petsitter: any) => <PetsitterCard key={petsitter.petsitterId} petsitter={petsitter} />)}
      </Box>

      <Drawer
        anchor="bottom"
        open={isFilterOpen}
        onClose={handleFilterClose}
        ModalProps={{ container: document.getElementById('steptwo-main'), style: { position: 'absolute' } }}
      >
        <List>
          <ListSubheader sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <FormatListBulleted sx={{ mr: 2 }} />
            <span>필터</span>
          </ListSubheader>
          <Divider />

          <ListItem onClick={() => handleFilterButtonClick('전체 펫시터')}>
            <ListItemText primary="전체 펫시터" sx={{ ml: 5 }} />
          </ListItem>
          <ListItem onClick={() => handleFilterButtonClick('별점이 높은 펫시터')}>
            <ListItemText primary="별점이 높은 펫시터" sx={{ ml: 5 }} />
          </ListItem>
          <ListItem onClick={() => handleFilterButtonClick('리뷰가 많은 펫시터')}>
            <ListItemText primary="리뷰가 많은 펫시터" sx={{ ml: 5 }} />
          </ListItem>
          <ListItem onClick={() => handleFilterButtonClick('새로 온 펫시터')}>
            <ListItemText primary="새로 온 펫시터" sx={{ ml: 5 }} />
          </ListItem>
        </List>
      </Drawer>
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
  align-items: center;
  justify-content: space-around;
  position: relative;
  margin-top: -74px;
  background-color: ${(props) => props.theme.textColors.secondary};
  min-height: 64px;
  gap: 120px;
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
  margin: 12px 12px 0;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const HotWrap = styled.div`
  position: relative;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  padding: 12px 0 12px 32px;
  border-radius: 8px 8px 0 0;
  background-color: ${(props) => props.theme.colors.mainBlue};
`;

const DobleQuotationImg = styled.img`
  position: absolute;
  left: -40%;
  width: 20px;
  height: 13px;
  margin-top: 18px;
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
  position: absolute;
  top: 18px;
  right: 14%;
  width: 60px !important;
  height: 60px;
`;

const HotFaceBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 40px 14px;
`;

const OnelineWrap = styled.div`
  display: flex;
`;

const NewPetsitterLocation = styled.div`
  margin-top: 14px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: left;
  white-space: nowrap;
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
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  font-size: ${(props) => props.theme.fontSize.s20h30};
`;

const ItemCountbox = styled.div`
  margin: 5px 0 5px 8px;
  padding: 2px 5px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  background-color: ${(props) => props.theme.colors.mainBlue};
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
  position: relative;
  margin: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
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
  margin-right: 12px;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  font-size: ${(props) => props.theme.fontSize.s20h30};
`;

const Possiblebox = styled.div`
  margin: 6px 0;
  padding: 2px 8px;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.light};
  font-size: 12px;
  line-height: 16px;
  background-color: ${(props) => props.theme.colors.mainBlue};
`;

const TimeWrap = styled.div`
  display: flex;
  margin-top: -2px;
  margin-bottom: 8px;
`;

const TimgImg = styled.img`
  width: 12px;
  height: 12px;
  margin-top: 5px;
  margin-right: 16px;
`;

const TimeText = styled.div`
  color: ${(props) => props.theme.textColors.gray50};
  font-weight: ${(props) => props.theme.fontWeights.light};
  font-size: ${(props) => props.theme.fontSize.s14h21};
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
    overflow: hidden;
    height: 36%;
    background-color: ${(props) => props.theme.colors.white};
    max-height: 100%;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
`;
