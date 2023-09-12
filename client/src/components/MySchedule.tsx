import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import { PetmilyCard } from './MyPetmily';

// 디자인 수정
//  이미지 사용
// useEffect 수정 && 멤버 아이디로 일정 등록(수정) 페이지 => API
// 일정 등록 -> 나누기st apiUrl = process.env.REACT_APP_API_URL;

const apiUrl = process.env.REACT_APP_API_URL;
const token = getCookieValue('access_token');

type InfoType = {
  petsitterId: number;
  possiblePetType: string;
  possibleLocation: string;
  possibleDay: string;
  possibleTimeStart: string;
  possibleTimeEnd: string;
  star: number;
  reviewCount: number;
  monthTotalReservation: number | null;
} | null;

const MySchedule = () => {
  const { memberId } = useSelector((state: IUser) => state.user);
  console.log(memberId);

  const [info, setInfo] = useState<InfoType>(null);

  //   일정 확인용
  useEffect(() => {
    const fetchPetData = async () => {
      console.log(token);
      try {
        const response = await axios.get(`${apiUrl}/members/petsitters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          // console.log(response.data);
          setInfo(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch petsitter data:', error);
      }
    };
    fetchPetData();
  }, []);
  console.log(info);

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

  const getFullDays = (days: string) => {
    return [...days].map(getFullDayName).join(' , ');
  };

  return (
    // 확인해보기
    <Container>
      <Text>나의 스케쥴</Text>

      {info && info.possibleDay ? (
        <PetmilyCard>
          <ContentContainer>
            <Info>
              {/* <Icon src="/imgs/Paw.svg" alt="possiblePets" /> */}
              <InfoText>케어 가능 동물 : {getPetTypeDisplayText(info.possiblePetType)}</InfoText>
            </Info>

            <Info>
              {/* <Icon src="/imgs/Time.svg" alt="time" /> */}
              <InfoText>
                케어 가능 시간 : {getFullDays(info.possibleDay)}
                {info.possibleTimeStart.slice(0, -3)} ~ {info.possibleTimeEnd.slice(0, -3)}
              </InfoText>
            </Info>

            <Info>
              {/* <Icon src="/imgs/Location.svg" alt="location" /> */}
              <InfoText>케어 가능 지역: {info.possibleLocation}</InfoText>
            </Info>
            <Link to={`/petsitters/${memberId}/schedule`}>
              <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
                나의 일정 관리
              </Button>
            </Link>
          </ContentContainer>
        </PetmilyCard>
      ) : (
        <ContentContainer>
          <InfoText>등록된 일정이 없습니다.</InfoText>
          <InfoText>활동 가능한 일정을 등록하시면, 더 많은 펫밀리를 만날 수 있어요!</InfoText>
          <Link to={`/petsitters/${memberId}/schedule`}>
            <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
              등록하러 가기
            </Button>
          </Link>
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

const InfoText = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const Icon = styled.img`
//   margin-right: 12px;
// `;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default MySchedule;
