import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { TextField, Box } from '@mui/material';
import { Modal, Sheet } from '@mui/joy';
import DaumPostcode from 'react-daum-postcode';

import LinkButton from 'components/buttons/LinkButton';

const ContactItem = [
  // 추후 UseEffect로 데이터 받아오기
  {
    id: 1,
    name: '김코딩',
    phoneNumber: '010-5938-2300',
  },
];

interface IFormInputs {
  error: boolean;
  address: string;
}

const Reservation = () => {
  const navigate = useNavigate();
  // const [date, setDate] = useState('');
  // const [checkInTime, setCheckInTime] = useState('');
  // const [checkOutTime, setCheckOutTime] = useState('');
  // const [request, setRequest] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

  const onToggleModal = () => {
    setIsModalOpen(true);
  };

  const {
    register,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInputs>();

  const handleComplete = (data: { zonecode: string; sido: string; sigungu: string; address: string }) => {
    // 우편번호 저장
    setZonecode(data.zonecode);
    // 시.도 저장
    setSido(data.sido);
    // 구.군 저장
    setSigugu(data.sigungu.length > 3 ? data.sigungu.split('').splice(0, 3).join('') : data.sigungu);
    // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    const splitAddress = data.address.split(' ').splice(2).join(' ');
    if (data) {
      clearErrors('address');
    }
    setRemainAddress(splitAddress);
    setIsModalOpen(false);
  };

  function BasicDatePicker() {
    // 날짜 입력
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="날짜를 입력해주세요" format="YYYY-MM-DD" />
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  function CheckInTimePicker() {
    // 체크인 시간
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <StyledTimePicker>
            <TimePicker label="Check In" />
          </StyledTimePicker>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  function CheckOutTimePicker() {
    // 체크아웃 시간
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <StyledTimePicker>
            <TimePicker label="Check Out" />
          </StyledTimePicker>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  function BasicTextFields() {
    // 주소 입력
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '288px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="주소를 입력해주세요"
          variant="outlined"
          value={zonecode ? `${zonecode} ${sido} ${sigungu} ${remainAddress}` : ''}
          {...register('address', { required: true })}
          error={!!errors.address?.type}
          onClick={onToggleModal}
          onKeyDown={onToggleModal}
        />
      </Box>
    );
  }

  function RequestTextFields() {
    // 요청사항 입력
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '288px' },
        }}
        noValidate
        autoComplete="off"
      >
        <StyledTextField
          id="outlined-basic"
          label="예) 산책중에 아무거나 잘 삼켜서 주의해주셔야 해요."
          variant="outlined"
        />
      </Box>
    );
  }

  const handleBackClick = () => {
    navigate('/');
  };

  // const handleDateChange = (date: any) => {
  //   setDate(date);
  // };

  // const handleCheckInTimeChange = (time: any) => {
  //   setCheckInTime(time);
  // };

  // const handleCheckOutTimeChange = (time: any) => {
  //   setCheckOutTime(time);
  // };

  // const handleRequestTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRequest(event.target.value);
  // };

  // const handleClickNext = () => {
  //   console.log(`Date: ${date}`);
  //   console.log(`Check-in Time: ${checkInTime}`);
  //   console.log(`Check-out Time: ${checkOutTime}`);
  //   console.log(`Address: ${zonecode} ${sido} ${sigungu} ${remainAddress}`);
  //   console.log(`Request: ${request}`);

  //   navigate('/reservation:step2', {
  //     state: {
  //       date: date,
  //       checkInTime: checkInTime,
  //       checkOutTime: checkOutTime,
  //       address: `${zonecode} ${sido} ${sigungu} ${remainAddress}`,
  //       request: request,
  //     },
  //   });
  // };

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
          <BasicDatePicker /*onChange={handleDateChange}*/ />
        </BasicDatePickerContainer>
        <ScheduleContainer>
          <ScheduleText>{'방문시간'}</ScheduleText>
        </ScheduleContainer>
        <BasicTimePickerContainer>
          <CheckInContainer>
            <CheckInTimePicker /*onChange={handleCheckInTimeChange}*/ />
          </CheckInContainer>
          <CheckOutContainer>
            <CheckOutTimePicker /*onChange={handleCheckOutTimeChange}*/ />
          </CheckOutContainer>
        </BasicTimePickerContainer>
        <ScheduleContainer>
          <ScheduleText>{'어디로 방문할까요?'}</ScheduleText>
        </ScheduleContainer>
        <BasicTextFieldsContainer>
          <BasicTextFields />
        </BasicTextFieldsContainer>
      </ReservationContainer>

      <RequestContainer>
        <RequestTextContainer>
          <RequestText>{'요청사항'}</RequestText>
        </RequestTextContainer>
        <BasicRequestTextContainer>
          <RequestTextFields /*onChange={handleRequestTextChange}*/ />
        </BasicRequestTextContainer>
        {ContactItem.map((item) => (
          <ContactContainer key={item.id}>
            <ContactTextContainer>
              <ContactTitle>{'연락처'}</ContactTitle>
              <TextContainer>
                <ContactText>{`${item.name}, ${item.phoneNumber}`}</ContactText>
                <ContactSubText>{'프로필 번호로 카카오 알림톡 전송'}</ContactSubText>
              </TextContainer>
            </ContactTextContainer>
          </ContactContainer>
        ))}
      </RequestContainer>
      <LinkButtonContainer>
        <StyledLinkButton
          text="다음단계"
          link="/reservation/step2"
          /*onClick={handleClickNext}*/
          width="100%"
          height="48px"
        />
      </LinkButtonContainer>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Sheet sx={{ width: '360px;' }}>
            <DaumPostcode onComplete={handleComplete} />
          </Sheet>
        </Modal>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

const ReservationContainer = styled.div`
  padding-bottom: 40px;
  border-bottom: 1px solid ${(props) => props.theme.textColors.primary};
`;

const ScheduleContainer = styled.div`
  margin: 36px 212px 0 36px;
`;

const ScheduleText = styled.h2`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  white-space: pre-line;
`;

const BasicDatePickerContainer = styled.div`
  margin: 16px 140px 0 36px;
  min-width: 288px;
  min-height: 48px;
`;

const BasicTimePickerContainer = styled.div`
  margin: 16px 36px 0 36px;
  display: flex;
  min-width: 288px;
  min-height: 48px;
`;

const StyledTimePicker = styled.div`
  // TimePicker 컴포넌트의 스타일을 수정하기 위한
  display: flex;
  justify-content: center;
  align-items: center;
  width: 142px;
`;

const CheckInContainer = styled.div`
  padding-right: 4px;
  min-width: 128px;
  min-height: 40px;
`;

const CheckOutContainer = styled.div`
  min-width: 128px;
  min-height: 40px;
`;

const BasicTextFieldsContainer = styled.div`
  margin: 16px 36px 0 30px;
  min-width: 288px;
  min-height: 48px;
`;

const RequestContainer = styled.div`
  padding-bottom: 80px;
  border-bottom: 1px solid ${(props) => props.theme.textColors.primary};
`;

const RequestTextContainer = styled.div`
  margin: 36px 212px 0 36px;
`;

const RequestText = styled.h2`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  white-space: pre-line;
`;

const BasicRequestTextContainer = styled.div`
  margin: 16px 140px 0 28px;
  min-width: 288px;
  min-height: 48px;
`;

const StyledTextField = styled(TextField)`
  // 요청사항 TextField 컴포넌트의 스타일을 수정하기 위한
  height: 100px;

  input {
    height: 200px;
  }

  textarea {
    height: 100%;
  }
`;

const ContactContainer = styled.div``;

const ContactTextContainer = styled.div`
  display: flex;
  margin: 160px 120px 0 34px;
  justify-content: space-around;
`;

const ContactTitle = styled.h2`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  white-space: pre-line;
`;

const TextContainer = styled.div`
  margin-left: 20px;
`;

const ContactText = styled.div`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

const ContactSubText = styled.div`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.primary};
`;

const LinkButtonContainer = styled.div`
  margin: 20px 36px 20px 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLinkButton = styled(LinkButton)`
  border-radius: 12px;
  height: 36px;
`;

export default Reservation;
