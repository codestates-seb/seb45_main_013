import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

const ContactItem = [
  // 추후 UseEffect로 데이터 받아오기
  {
    id: 1,
    name: '김코딩',
    phoneNumber: '010-5938-2300',
  },
];

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
        <ScheduleText>{`언제 펫시터가 필요하신가요?`}</ScheduleText>
        <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
          <DemoContainer sx={{ paddingTop: 0 }} components={['DatePicker']}>
            <DatePicker label="날짜를 입력해주세요" format="YYYY-MM-DD" />
          </DemoContainer>
        </LocalizationProvider>
        <ScheduleText>{'방문시간'}</ScheduleText>
        <BasicTimePickerContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ flex: 1, paddingTop: 0 }}>
              <StyledTimePicker>
                <TimePicker label="Check In" sx={{ flex: 1 }} />
              </StyledTimePicker>
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ flex: 1, paddingTop: 0 }}>
              <StyledTimePicker>
                <TimePicker label="Check Out" sx={{ flex: 1 }} />
              </StyledTimePicker>
            </DemoContainer>
          </LocalizationProvider>
        </BasicTimePickerContainer>
        <ScheduleText>{'어디로 방문할까요?'}</ScheduleText>
        <TextField id="outlined-basic" label="주소를 입력해주세요" variant="outlined" fullWidth />
      </ReservationContainer>

      <RequestContainer>
        <ScheduleText>{'요청사항'}</ScheduleText>
        <TextField
          id="outlined-basic"
          label="예) 산책중에 아무거나 잘 삼켜서 주의해주셔야 해요."
          variant="outlined"
          fullWidth
          multiline
        />
        {ContactItem.map((item) => (
          <ContactContainer key={item.id}>
            <ScheduleText>{'연락처'}</ScheduleText>
            <TextContainer>
              <ContactText>{`${item.name}, ${item.phoneNumber}`}</ContactText>
              <ContactSubText>{'프로필 번호로 카카오 알림톡 전송'}</ContactSubText>
            </TextContainer>
          </ContactContainer>
        ))}
      </RequestContainer>
      <CustomLinkBtn to="/reservation/step2">다음 단계</CustomLinkBtn>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  width: calc(100% + 12 * 2);
  margin: 0px -12px 0px -12px;
  align-items: center;
  background-color: ${(props) => props.theme.textColors.secondary};

  /* &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; //컨테이너 하단에 위치하도록 설정
    width: 120px; // 밑줄의 길이 설정
    height: 2px; // 밑줄의 두께 설정
    background-color: ${(props) => props.theme.colors.mainBlue};
  } */
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

const ReservationContainer = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.textColors.primary};
`;

const ScheduleText = styled.h2`
  margin: 8px 0;
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  white-space: pre-line;
`;

const BasicTimePickerContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledTimePicker = styled.div`
  // TimePicker 컴포넌트의 스타일을 수정하기 위한
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RequestContainer = styled.div`
  margin: 8px 0;
  padding-bottom: 40px;
  border-bottom: 1px solid ${(props) => props.theme.textColors.primary};
`;

const ContactContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

const TextContainer = styled.div`
  margin-left: 20px;
`;

const ContactText = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

const ContactSubText = styled.div`
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.primary};
`;

const CustomLinkBtn = styled(Link)`
  width: 100%;
  border-radius: 12px;
  padding: 12px;
  color: white;
  text-align: center;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.mainBlue};
`;

export default Reservation;
