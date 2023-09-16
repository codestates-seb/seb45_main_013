import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { TextField, Divider, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { notice, verificationNotice, impossibleNotice1, impossibleNotice2 } from 'util/noticeText';

const PetsitterItem = [
  // 펫시터 정보 DB 받아올 예정
  {
    id: 1,
    name: '리나',
    location: '서울시 성북구',
    rating: 4.9,
    review: 10,
    photo: '/imgs/PetsitterPhoto.svg',
  },
];

const ReservationItem = [
  {
    reservationDay: '2023-09-08',
    reservationTimeStart: '09:00:00',
    reservationTimeEnd: '12:00:00',
    address: '12345 서울 강남구 테해란로 강남빌딩 1',
    phone: '22',
    petId: [29, 30],
    petsitterId: 1,
  },
];

const PetItem = [
  {
    petId: 28,
    memberId: 34,
    name: '코코',
    age: 13,
    species: '푸들',
    photo: '/imgs/PetImg.svg',
  },
  {
    petId: 29,
    memberId: 34,
    name: '두부',
    age: 4,
    species: '보스턴 테리어',
    photo: '/imgs/PetImg.svg',
  },
];

const ContactItem = [
  // 추후 UseEffect로 데이터 받아오기
  {
    id: 1,
    name: '김코딩',
    phoneNumber: '010-5938-2300',
  },
];

type PetItem = {
  petId: number;
  memberId: number;
  name: string;
  age: number;
  species: string;
  photo: string;
};

const groupedPetItems: PetItem[][] = PetItem.reduce((resultArray: PetItem[][], item, index) => {
  // 두마리씩 묶어서 배열에 넣어서 보여주기 위함
  const chunkIndex = Math.floor(index / 2);

  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [];
  }

  resultArray[chunkIndex].push(item);

  return resultArray;
}, []);

const ReservationStepFour = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false); //예약하기 버튼 활성화 상태

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConFirmModal = () => {
    setIsModalOpen(false);
    setIsChecked(true);
    setIsConfirmEnabled(true);
  };

  const handleCheckBoxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };
  interface IFormInput {
    body: string;
  }

  const {
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  return (
    <MainContainer>
      <Header>
        <HeaderTitle>예약확인</HeaderTitle>
      </Header>
      <CheckContainer>
        <CheckTitle>
          <CheckTitleText>{`문단속님\n예약내역을 확인해주세요`}</CheckTitleText>
          <CheckTitleIcon src="/imgs/ReservationCheckList.svg" alt="CheckListIcon" />
        </CheckTitle>
        {PetsitterItem.map((item) => (
          <PetsitterCard key={item.id}>
            <CardWrap>
              <PetsitterName>{item.name}</PetsitterName>
              <Petsitter>펫시터</Petsitter>
            </CardWrap>
            <PetsitterImg src={item.photo} alt="PetsitterPhoto" />
            <PetsitterCardBody>
              <RatingImg src="/imgs/Star.svg" alt="Star" />
              <RatingCount>{item.rating}</RatingCount>
              <ReviewImg src="/imgs/ReviewIcon.svg" alt="ReviewIcon" />
              <ReviewCount>{item.review}</ReviewCount>
            </PetsitterCardBody>
            <DividerWrap>
              <StyledDivider />
            </DividerWrap>
            <PetsitterLocation>{item.location}</PetsitterLocation>
          </PetsitterCard>
        ))}

        <ReservationResult>
          <AddressWrap>
            <AddressTitle>주소</AddressTitle>
            <Address>{ReservationItem[0].address}</Address>
          </AddressWrap>
          <DayWrap>
            <ReservationDayTitle>예약 날짜</ReservationDayTitle>
            <ReservationDay>{ReservationItem[0].reservationDay}</ReservationDay>
          </DayWrap>
          <TimeWrap>
            <ReservationTimeTitle>예약 시간</ReservationTimeTitle>
            <ReservationTime>{`${ReservationItem[0].reservationTimeStart} ~ ${ReservationItem[0].reservationTimeEnd}`}</ReservationTime>
          </TimeWrap>
        </ReservationResult>

        <PetCard>
          <PetCardTitle>맡기시는 반려동물</PetCardTitle>
          <CustomCarousel
            showThumbs={false}
            showStatus={false}
            autoPlay={false}
            emulateTouch={true}
            stopOnHover={true}
            infiniteLoop={true}
            showArrows={false}
            useKeyboardArrows={false}
          >
            {groupedPetItems.map((group, index) => (
              <DividerContainer key={`group-${index}`}>
                {group.map((item) => (
                  <PetWrap key={item.petId}>
                    <PetImg src={item.photo} alt="PetImg" />
                    <PetInfo>
                      <PetName>{item.name}</PetName>
                      <WrapText>
                        <PetSpecies>{`${item.species} /`}</PetSpecies>
                        <PetAge>{`${item.age}살`}</PetAge>
                      </WrapText>
                    </PetInfo>
                  </PetWrap>
                ))}
              </DividerContainer>
            ))}
          </CustomCarousel>
        </PetCard>

        <RequestContainer>
          <ScheduleText>{'요청사항'}</ScheduleText>
          <StyledTextField
            {...register('body', { required: true })}
            id="outlined-basic"
            label={'예) 산책중에 아무거나 잘 삼켜서 주의해주셔야 해요.'}
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
      </CheckContainer>
      <ConfirmContainer>
        <Textbox>
          <ConfirmText>안내사항을 모두 확인하였습니다</ConfirmText>
          <WarningText>미숙지시 일부 서비스에 제한이 있을 수 있습니다</WarningText>
        </Textbox>
        <Checkbox
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          checked={isChecked}
          onChange={handleCheckBoxChange}
          onClick={handleModalOpen}
        />
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle>{'안내사항'}</DialogTitle>
          <StyledDialogContent>
            <DialogContentText sx={{ color: 'black', fontWeight: 'bold' }}>
              펫시터님께 미리 알려주세요!
            </DialogContentText>
            {notice.map((data) =>
              data.isSpan ? (
                <VerificationText dangerouslySetInnerHTML={{ __html: data.text }} key={data.text}></VerificationText>
              ) : (
                <VerificationText key={data.text}>{data.text}</VerificationText>
              ),
            )}
            <DialogContentText sx={{ color: 'red', fontWeight: 'bold', mt: 2 }}>필수 확인 사항</DialogContentText>
            {verificationNotice.map((data) =>
              data.isSpan ? (
                <VerificationText dangerouslySetInnerHTML={{ __html: data.text }} key={data.text}></VerificationText>
              ) : (
                <VerificationText key={data.text}>{data.text}</VerificationText>
              ),
            )}
            <DialogContentText sx={{ color: 'red', fontWeight: 'bold', mt: 2 }}>돌봄이 불가한 경우</DialogContentText>
            {impossibleNotice1.map((data) =>
              data.isSpan ? (
                <VerificationText dangerouslySetInnerHTML={{ __html: data.text }} key={data.text}></VerificationText>
              ) : (
                <VerificationText key={data.text}>{data.text}</VerificationText>
              ),
            )}
            <DialogContentText sx={{ color: 'red', fontWeight: 'bold', mt: 2 }}>산책이 불가한 경우</DialogContentText>
            {impossibleNotice2.map((data) =>
              data.isSpan ? (
                <VerificationText dangerouslySetInnerHTML={{ __html: data.text }} key={data.text}></VerificationText>
              ) : (
                <VerificationText key={data.text}>{data.text}</VerificationText>
              ),
            )}
            <StyledButton onClick={handleConFirmModal}>확인했습니다</StyledButton>
          </StyledDialogContent>
        </Dialog>
      </ConfirmContainer>
      <ButtonContainer>
        <StyledButton type="submit" disabled={!isChecked || !isConfirmEnabled}>
          예약하기
        </StyledButton>
      </ButtonContainer>
    </MainContainer>
  );
};

export default ReservationStepFour;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fefdff;
`;

const Header = styled.div`
  display: block;
  margin: -46px 0 18px 60px;
  position: relative;
  align-items: center;
  min-height: 64px;
`;

const HeaderTitle = styled.h1`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const CheckContainer = styled.div`
  margin-top: -10px;
  padding: 12px;
`;

const CheckTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const CheckTitleText = styled.h1`
  white-space: pre-line;
  ${(props) => props.theme.fontSize.s20h30};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  margin-right: 36px;
`;

const CheckTitleIcon = styled.img``;

const PetsitterCard = styled.div`
  position: relative;
  border-radius: 8px;
  margin: 40px auto 16px;
  padding-bottom: 20px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const CardWrap = styled.div`
  display: flex;
  position: relative;
  background-color: ${(props) => props.theme.colors.mainBlue};
  border-radius: 8px 8px 0 0;
  padding: 12px 0 12px 36px;
`;

const PetsitterName = styled.h2`
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
`;

const Petsitter = styled.h3`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.primary};
  margin: 5px 0 0 8px;
`;

const PetsitterImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  right: 14%;
`;

const PetsitterCardBody = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 36px -60px;
`;

const DividerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
`;

const StyledDivider = styled(Divider)`
  width: 80%;
  margin-right: auto;
`;

const RatingImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 18px;
`;

const RatingCount = styled.h4`
  ${(props) => props.theme.fontSize.s20h30};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  color: #595959;
  margin-right: 30px;
  margin-top: -5px;
`;

const ReviewImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const ReviewCount = styled.h4`
  ${(props) => props.theme.fontSize.s20h30};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  color: #595959;
  margin-top: -5px;
`;

const DividerContainer = styled.div`
  display: flex;
  padding: 0 40px;
  margin-top: -20px;
`;

const PetsitterLocation = styled.h4`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  margin: 14px 0 0 56px;
`;

const ReservationResult = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const AddressTitle = styled.h3`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: #595959;
`;

const Address = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
`;

const AddressWrap = styled.div`
  display: flex;
  margin: 36px 0 12px 0;
  align-items: center;
  flex-direction: space-between;
  gap: 12px;
`;

const DayWrap = styled.div`
  display: flex;
  margin: 0 0 12px 0;
  align-items: center;
  flex-direction: space-between;
  gap: 12px;
`;

const ReservationDayTitle = styled.h3`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: #595959;
`;

const ReservationDay = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
`;

const TimeWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 36px 0;
  flex-direction: space-between;
  gap: 12px;
`;

const ReservationTimeTitle = styled.h3`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: #595959;
`;

const ReservationTime = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
`;

const PetCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
  margin-top: 20px;
  padding-bottom: 20px;
`;

const PetCardTitle = styled.h3`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: #595959;
  margin: 20px 0 20px 36px;
`;

const PetWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  margin-right: 80px;
  justify-content: space-between;
`;

const PetImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 8px 16px 0 0;
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
`;

const PetName = styled.h3`
  display: flex;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s20h30};
  margin-top: 4px;
  margin-bottom: 2px;
`;

const WrapText = styled.div`
  display: flex;
`;

const PetSpecies = styled.div`
  display: flex;
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSize.s12h18};
  margin-right: 4px;
  color: ${(props) => props.theme.textColors.gray40};
`;

const PetAge = styled.div`
  display: flex;
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSize.s12h18};
  color: ${(props) => props.theme.textColors.gray40};
`;

const CustomCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: transparent;
  }

  .control-dots {
    top: 100px !important;
  }

  .dot {
    background: #279eff !important;
  }
`;

const RequestContainer = styled.div`
  margin: 16px 0;
  padding: 36px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const ScheduleText = styled.h2`
  margin: 8px 0 12px 0;

  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  color: #595959;
  white-space: pre-line;
`;

const StyledTextField = styled(TextField)`
  .MuiInputLabel-root {
    font-size: 14px;
    margin-top: 3px;
    color: #d9d9d9;
  }
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
  margin-top: 8px;
`;

const ContactSubText = styled.div`
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
  color: ${(props) => props.theme.textColors.primary};
`;

const ConfirmContainer = styled.div`
  display: flex;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.white};
`;

const Textbox = styled.div``;

const ConfirmText = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
  margin: 16px 0 4px 36px;
`;

const WarningText = styled.div`
  ${(props) => props.theme.fontSize.s12h18}
  color: ${(props) => props.theme.textColors.primary};
  margin: 0 0 16px 36px;
`;

const ButtonContainer = styled.div`
  margin: 0 24px 20px 24px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const VerificationText = styled.div`
  margin-top: 16px;
  margin-bottom: 36px;
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 1;
  white-space: pre-line;

  span {
    color: ${(props) => props.theme.textColors.primary};
  }
`;

const StyledDialogContent = styled(DialogContent)`
  max-height: 100%;
  overflow-y: auto;
`;
