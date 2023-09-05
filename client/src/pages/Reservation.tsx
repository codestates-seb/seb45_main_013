import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';

function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="날짜를 입력해주세요" format="YYYY-MM-DD" />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function CheckInTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Check In" />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function CheckOutTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Check Out" />
      </DemoContainer>
    </LocalizationProvider>
  );
}

const Reservation = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <MainContainer>
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>1/3</PageNumberText>
      </StatusHeader>
      <ReservationContainer>
        <ScheduleContainer>
          <ScheduleText>{`언제 펫시터가\n 필요하신가요?`}</ScheduleText>
        </ScheduleContainer>
        <BasicDatePickerContainer>
          <BasicDatePicker />
        </BasicDatePickerContainer>
        <ScheduleContainer>
          <ScheduleText>{'방문시간'}</ScheduleText>
        </ScheduleContainer>
        <BasicTimePickerContainer>
          <CheckInContainer>
            <CheckInTimePicker />
          </CheckInContainer>
          <CheckOutContainer>
            <CheckOutTimePicker />
          </CheckOutContainer>
        </BasicTimePickerContainer>
      </ReservationContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.textColors.secondary};
  min-height: 48px;
  gap: 120px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; //컨테이너 하단에 위치하도록 설정
    width: 120px; // 밑줄의 길이 설정
    height: 2px; // 밑줄의 두께 설정
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const BackImg = styled.img``;

const StatusTitleText = styled.div`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const PageNumberText = styled.div`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

const ReservationContainer = styled.div``;

const ScheduleContainer = styled.div`
  margin: 36px 227px 0 36px;
`;

const ScheduleText = styled.h2`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  white-space: pre-line;
`;

const BasicDatePickerContainer = styled.div`
  margin: 16px 140px 0 36px;
`;

const BasicTimePickerContainer = styled.div`
  margin: 16px 36px 0 36px;
  display: flex;
`;

const CheckInContainer = styled.div`
  padding: 0 24px 0 0;
`;

const CheckOutContainer = styled.div`
  padding: 0 240px 0 0;
`;

export default Reservation;
