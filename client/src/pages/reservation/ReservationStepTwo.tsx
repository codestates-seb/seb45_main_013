import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, Divider, Drawer, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IReservation, deleteReservation } from 'store/reservationSlice';
import { refreshAccessToken } from 'hooks/refreshAcessToken';
import { getCookieValue } from 'hooks/getCookie';
import PetsitterCard from '@components/PetsitterCard';
import { deleteUser } from 'store/userSlice';
import { deleteCookie } from 'hooks/deleteCookie';

const apiUrl = process.env.REACT_APP_API_URL;

const ReservationStepTwo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reservationDay, reservationTimeStart, reservationTimeEnd, address, petId, pets } = useSelector(
    (state: IReservation) => state.reservation,
  );

  const [properPetsitters, setProperPetsitters] = useState<number[]>([]);

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

  useEffect(() => {
    if (!reservationDay || !reservationTimeStart || !reservationTimeEnd || !address || !petId) {
      alert('예약을 처음부터 해주세요.');
      navigate('/reservation');
    }
  }, []);

  useEffect(() => {
    if (filterType === '요청한 예약 날짜에 맞는 펫시터') {
      const getProperPetsitters = async () => {
        const accessToken = getCookieValue('access_token');
        try {
          const response = await axios.post(
            `${apiUrl}/reservations/petsitters`,
            {
              reservationDay,
              reservationTimeStart,
              reservationTimeEnd,
              address,
              petId,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
          );
          if (response.status === 200) {
            setProperPetsitters(response.data);
          }
        } catch (error: any) {
          console.log(error);
          if (error.response.status === 401) {
            try {
              const newAccessToken = await refreshAccessToken();
              if (newAccessToken) {
                const response = await axios.post(
                  `${apiUrl}/reservations/petsitters`,
                  {
                    reservationDay,
                    reservationTimeStart,
                    reservationTimeEnd,
                    address,
                    petId,
                  },
                  { headers: { Authorization: `Bearer ${newAccessToken}` } },
                );
                setProperPetsitters(response.data);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      };
      getProperPetsitters();
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
              alert('로그인 세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
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
    <MainContainer id="steptwo-main">
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>2/2</PageNumberText>
      </StatusHeader>

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
          properPetsitters.length > 0 &&
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

          <ListItem onClick={() => handleFilterButtonClick('요청한 예약 날짜에 맞는 펫시터')}>
            <ListItemText primary="요청한 예약 날짜에 맞는 펫시터" sx={{ ml: 5 }} />
          </ListItem>
          <ListItem onClick={() => handleFilterButtonClick('내가 찜한 펫시터')}>
            <ListItemText primary="내가 찜한 펫시터" sx={{ ml: 5 }} />
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

export default ReservationStepTwo;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #fefdff;
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  background-color: ${(props) => props.theme.textColors.secondary};
  min-height: 48px;
  gap: 120px;
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
