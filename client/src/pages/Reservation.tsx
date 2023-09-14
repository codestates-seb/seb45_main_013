import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { Modal, Sheet } from '@mui/joy';
import DaumPostcode from 'react-daum-postcode';

import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ContactItem = [
  // 추후 UseEffect로 데이터 받아오기
  {
    id: 1,
    name: '김코딩',
    phoneNumber: '010-5938-2300',
  },
];

interface IFormInput {
  address: string;
  body: string;
  error: boolean;
}

const Reservation = () => {
  const navigate = useNavigate();
  const accessToken = getCookieValue('access_token');
  const now = new Date();

  const nowDate = dayjs(now).format('YYYY-MM-DD');
  console.log(now);
  const nowTime = dayjs(now).format('HH:mm:ss');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reservationDay, setReservationDay] = useState<any>('');
  const [reservationTimeStart, setReservationTimeStart] = useState<any>('');
  const [reservationTimeEnd, setReservationTimeEnd] = useState('');

  now.setMonth(now.getMonth() + 3);
  const modifiedNow = now.toISOString().slice(0, 10);

  console.log(modifiedNow);

  console.log('시작: ', reservationTimeStart);
  console.log('끝: ', reservationTimeEnd);

  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleDateChange = (newDate: any) => {
    setReservationDay(dayjs(newDate).format('YYYY-MM-DD'));
  };

  const handleStartTime = (newTime: any) => {
    setReservationTimeStart(dayjs(newTime).format('HH:mm:ss'));
  };

  const handleEndTime = (newTime: any) => {
    setReservationTimeEnd(dayjs(newTime).format('HH:mm:ss'));
  };

  const onToggleModal = () => {
    setIsModalOpen(true);
  };

  const handleComplete = (data: any) => {
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

  const handleBackClick = () => {
    navigate('/');
  };

  const handleStartError = (newError: any) => {
    console.log(newError);
  };

  const onSubmit = async (data: any) => {
    const { address, body } = data;
    if (reservationDay && reservationTimeStart && reservationTimeEnd && address && body) {
      console.log({ reservationDay, reservationTimeStart, reservationTimeEnd, address, body });
      navigate('/reservation/step2');
    } else if (!reservationTimeStart || !reservationTimeEnd) {
      alert('시간을 확인해주세요');
    }
  };

  return (
    <MainContainer>
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>1/3</PageNumberText>
      </StatusHeader>

      <ReservationContainer onSubmit={handleSubmit(onSubmit)}>
        <ScheduleText>{`언제 펫시터가 필요하신가요?`}</ScheduleText>
        <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
          <DemoContainer sx={{ paddingTop: 1 }} components={['DatePicker']}>
            <DatePicker
              label="날짜를 입력해주세요"
              format="YYYY-MM-DD"
              value={reservationDay}
              onChange={handleDateChange}
              shouldDisableDate={(day) => {
                dayjs.extend(isBetween);
                return !dayjs(dayjs(day as Dayjs).format('YYYY-MM-DD')).isBetween(nowDate, modifiedNow, 'day', '[)');
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <ScheduleText>{'방문시간'}</ScheduleText>
        <BasicTimePickerContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ flex: 1, paddingTop: 1 }}>
              <StyledTimePicker>
                <TimePicker
                  label="Check In"
                  sx={{ flex: 1 }}
                  minutesStep={6}
                  skipDisabled={true}
                  minTime={dayjs(new Date(0, 0, 0, 8))}
                  maxTime={dayjs(new Date(0, 0, 0, 22))}
                  ampm={false}
                  shouldDisableTime={(value, view) => view === 'hours' && value.hour() > +nowTime.split(':')[0] + 2}
                  onChange={handleStartTime}
                  onError={handleStartError}
                />
              </StyledTimePicker>
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ flex: 1, paddingTop: 1 }}>
              <StyledTimePicker>
                <TimePicker
                  label="Check Out"
                  sx={{ flex: 1 }}
                  minutesStep={6}
                  skipDisabled={true}
                  minTime={dayjs(new Date(0, 0, 0, 8))}
                  maxTime={dayjs(new Date(0, 0, 0, 22))}
                  ampm={false}
                  shouldDisableTime={(value, view) =>
                    view === 'hours' && value.hour() < +reservationTimeStart.split(':')[0] + 1
                  }
                  onChange={handleEndTime}
                />
              </StyledTimePicker>
            </DemoContainer>
          </LocalizationProvider>
        </BasicTimePickerContainer>
        <ScheduleText>{'어디로 방문할까요?'}</ScheduleText>
        <TextField
          id="outlined-basic"
          label="주소를 입력해주세요"
          variant="outlined"
          fullWidth
          value={zonecode ? `${zonecode} ${sido} ${sigungu} ${remainAddress}` : ''}
          {...register('address', { required: true })}
          error={errors.address?.type === 'required'}
          onClick={onToggleModal}
          onKeyDown={onToggleModal}
        />
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
        <RequestContainer>
          <ScheduleText>{'요청사항'}</ScheduleText>
          <TextField
            {...register('body', { required: true })}
            id="outlined-basic"
            label="예) 산책중에 아무거나 잘 삼켜서 주의해주셔야 해요."
            variant="outlined"
            error={errors.body?.type === 'required'}
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
        <ButtonContainer>
          <StyledButton type="submit">다음단계</StyledButton>
        </ButtonContainer>
      </ReservationContainer>
    </MainContainer>
  );
};

export default Reservation;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.textColors.secondary};
  min-height: 48px;
  gap: 120px;
  position: relative;

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

const ReservationContainer = styled.form`
  padding-bottom: 16px;

  padding: 12px;
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

const ButtonContainer = styled.div`
  margin: 12px 24px 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  border: none;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  color: white;
  ${({ theme }) => theme.fontSize.s16h24};

  &:hover {
    background-color: ${({ theme }) => theme.colors.subBlue};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: ${({ theme }) => theme.shadow.inset};
  }
`;
