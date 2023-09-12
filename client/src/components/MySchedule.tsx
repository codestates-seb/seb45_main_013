import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
//  이미지 사용
// useEffect 수정 && 멤버 아이디로 일정 등록(수정) 페이지 => API
// 일정 등록 -> 나누기st apiUrl = process.env.REACT_APP_API_URL;

const apiUrl = process.env.REACT_APP_API_URL;
const token = getCookieValue('access_token');

const MySchedule = () => {
  const { memberId } = useSelector((state: IUser) => state.user);
  console.log(memberId);

  const [petsitter, setPetsitter] = useState<any>({
    petsitterId: 0,
    possiblePetType: 'PET_CAT',
    possibleLocation: '[]',
    possibleDay: '',
    possibleTimeStart: '',
    possibleTimeEnd: '',
    star: 0,
    reviewCount: 0,
    monthTotalReservation: 0,
  });

  //   일정 확인용
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/members/petsitters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          //   console.log(response.data);
          setPetsitter(response.data);
          console.log(petsitter);
        }
      } catch (error) {
        console.error('Failed to fetch petsitter data:', error);
      }
    };
    fetchPetData();
  }, []);

  return (
    // 일정등록 안했을 때 (null)
    <Container>
      <Text>나의 스케쥴</Text>
      <ContentContainer>
        <InfoText>등록된 일정이 없습니다.</InfoText>
        <InfoText>활동 가능한 일정을 등록하시면, 더 많은 펫밀리를 만날 수 있어요!</InfoText>
        {/* 링크 수정 => 스케쥴 등록 페이지*/}
        <Link to={`/petsitters/${memberId}/schedule`}>
          <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            등록하러 가기
          </Button>
        </Link>
      </ContentContainer>
    </Container>

    // 일정등록 했을 때 만들기
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
export default MySchedule;
