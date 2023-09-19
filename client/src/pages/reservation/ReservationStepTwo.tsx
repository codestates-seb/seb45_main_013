import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, Divider, Drawer, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IReservation } from 'store/reservationSlice';
import { refreshAccessToken } from 'hooks/refreshAcessToken';
import { getCookieValue } from 'hooks/getCookie';
import PetsitterCard from '@components/PetsitterCard';

const apiUrl = process.env.REACT_APP_API_URL;

const ReservationStepThree = () => {
  const navigate = useNavigate();

  const { reservationDay, reservationTimeStart, reservationTimeEnd, address, petId } = useSelector(
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

  useEffect(() => {
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
  }, []);

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
            <TitleText>{getTitleText()}</TitleText>
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
      </Drawer>
    </MainContainer>
  );
};

export default ReservationStepThree;

const MainContainer = styled.div`
  display: flex;
  position: relative;
  bottom: 0;
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
