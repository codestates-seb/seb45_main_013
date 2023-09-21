import styled from 'styled-components';
import Button from '@mui/material/Button';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';

const apiUrl = process.env.REACT_APP_API_URL;
const token = getCookieValue('access_token');

const PetSitterHome = () => {
  const { memberId, petsitterBoolean, petsitterId } = useSelector((state: IUser) => state.user);

  return (
    <MainContainer>
      <ContentContainer>
        <TextContainer>
          <HelloText>펫시터 강형욱님</HelloText>
          <MainText>이번달 예약건은</MainText>
          <MainText> 5건 입니다.</MainText>
        </TextContainer>
        <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
          <Icon src="/imgs/WhiteCalendar.svg" alt="Icon" />
          등록하러 가기
        </Button>
      </ContentContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin: 36px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HelloText = styled.div``;
const MainText = styled.div``;
const Name = styled.div``;

const Icon = styled.img`
  width: 15px;
  margin-right: 8px;
`;
const InfoText = styled.div``;

export default PetSitterHome;
