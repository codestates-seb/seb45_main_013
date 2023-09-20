import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import { PetmilyCard } from './MyPetmily';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PetsIcon from '@mui/icons-material/Pets';
import CircularProgress from '@mui/joy/CircularProgress';

// 디자인 수정

const apiUrl = process.env.REACT_APP_API_URL;
const token = getCookieValue('access_token');

type InfoType = {
  petsitterId: number;
  possiblePetType: string;
  possibleLocation: string[];
  possibleDay: string;
  possibleTimeStart: string;
  possibleTimeEnd: string;
  star: number;
  reviewCount: number;
  monthTotalReservation: number | null;
} | null;

const MySchedule = () => {
  const { memberId } = useSelector((state: IUser) => state.user);

  const [info, setInfo] = useState<InfoType>(null);
  const [isLoading, setIsLoading] = useState(true);

  //   일정 확인용
  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${apiUrl}/members/petsitters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setInfo(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPetData();
  }, []);

  // 케어가능 펫
  const getPetTypeDisplayText = (type: string) => {
    switch (type) {
      case 'PET_CAT':
        return '고양이';
      case 'PET_DOG':
        return '강아지';
      case 'PET_ALL':
        return '강아지와 고양이';
      default:
        return '';
    }
  };

  // 케어 가능 요일
  const getFullDayName = (shortDay: string) => {
    switch (shortDay) {
      case '월':
        return '월요일';
      case '화':
        return '화요일';
      case '수':
        return '수요일';
      case '목':
        return '목요일';
      case '금':
        return '금요일';
      case '토':
        return '토요일';
      case '일':
        return '일요일';
      default:
        return '';
    }
  };

  // const getFullDays = (days: string) => {
  //   return [...days].map(getFullDayName).join(' , ');
  // };

  const sortDaysInOrder = (days: string) => {
    const desiredOrder = ['월', '화', '수', '목', '금'];
    const sortedDays = desiredOrder.filter((day) => days.includes(day));
    return sortedDays.join(', ');
  };

  return (
    // 확인해보기
    <Container>
      <Text>나의 스케쥴</Text>

      {isLoading ? (
        <CircularProgress variant="soft" sx={{ color: '#279eff' }} />
      ) : info && info.possibleDay ? (
        <PetmilyCard>
          <ContentContainer>
            <InfoWrapper>
              <Paw />
              <Info>
                <InfoText>케어 가능 동물 </InfoText>
                <UserText>{getPetTypeDisplayText(info.possiblePetType)}</UserText>
              </Info>
            </InfoWrapper>

            <InfoWrapper>
              <Location />
              <Info>
                <InfoText>케어 가능 지역 </InfoText>
                <UserText>{info.possibleLocation}</UserText>
              </Info>
            </InfoWrapper>

            <InfoWrapper>
              <Calendar />
              <Info>
                <InfoText>케어 가능 요일 </InfoText>
                <UserText>{sortDaysInOrder(info.possibleDay)}</UserText>
              </Info>
            </InfoWrapper>

            <InfoWrapper>
              <Time />
              <Info>
                <InfoText>케어 가능 시간 </InfoText>
                <UserText>
                  {info.possibleTimeStart.slice(0, -3)} ~ {info.possibleTimeEnd.slice(0, -3)}
                </UserText>
              </Info>
            </InfoWrapper>
          </ContentContainer>
          <ButtonContainer>
            <Link to={`/petsitters/${memberId}/schedule`}>
              <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
                나의 일정 관리
              </Button>
            </Link>
          </ButtonContainer>
        </PetmilyCard>
      ) : (
        <ContentContainer>
          <NoContentContaier>
            <Image src="/imgs/NoSchedule.png" alt="No schedule" />
            <InfoText>등록된 일정이 없습니다.</InfoText>
            <InfoText>활동 가능한 일정을 등록하시면, 더 많은 펫밀리를 만날 수 있어요!</InfoText>
          </NoContentContaier>
          <ButtonContainer>
            <Link to={`/petsitters/${memberId}/schedule`}>
              <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
                등록하러 가기
              </Button>
            </Link>
          </ButtonContainer>
        </ContentContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 60px;
`;

const Text = styled.div`
  margin-bottom: 30px;
  font-weight: 900;
  ${(props) => props.theme.fontSize.s18h27};
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Paw = styled(PetsIcon)`
  margin: 20px;
  color: #279eff;
`;

const Time = styled(AccessTimeIcon)`
  margin: 20px;
  color: #279eff;
`;

const Location = styled(PersonPinIcon)`
  margin: 20px;
  color: #279eff;
`;

const Calendar = styled(EventAvailableIcon)`
  margin: 20px;
  color: #279eff;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoText = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  color: #acacac;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const UserText = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px20px;
`;

const NoContentContaier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;
export default MySchedule;
