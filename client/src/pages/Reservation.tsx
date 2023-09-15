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

import LinkButton from 'components/buttons/LinkButton';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

  const onToggleModal = () => {
    setIsModalOpen(true);
  };

  console.log(remainAddress);
  interface IFormInput {
    error: boolean;
    address: string;
  }

  const {
    register,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>();

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
          <DemoContainer sx={{ paddingTop: 1 }} components={['DatePicker']}>
            <DatePicker label="날짜를 입력해주세요" format="YYYY-MM-DD" />
          </DemoContainer>
        </LocalizationProvider>
        <ScheduleText>{'방문시간'}</ScheduleText>
        <BasicTimePickerContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ flex: 1, paddingTop: 1 }}>
              <StyledTimePicker>
                <TimePicker label="Check In" sx={{ flex: 1 }} />
              </StyledTimePicker>
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ flex: 1, paddingTop: 1 }}>
              <StyledTimePicker>
                <TimePicker label="Check Out" sx={{ flex: 1 }} />
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
      <LinkButtonContainer>
        <StyledLinkButton link="/reservation/step2" text="다음단계" width="100%" height="48px" fontSize="16" />
      </LinkButtonContainer>
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
  padding: 12px;
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

const LinkButtonContainer = styled.div`
  margin: 12px 24px 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLinkButton = styled(LinkButton)`
  border-radius: 12px;
  height: 36px;
`;
