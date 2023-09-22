import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { TextField, Divider, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { notice, verificationNotice, impossibleNotice1, impossibleNotice2 } from 'util/noticeText';

import { useSelector, useDispatch } from 'react-redux';
import { IReservation, addBody, deleteReservation } from 'store/reservationSlice';
import { IUser } from 'store/userSlice';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useNavigate } from 'react-router';

const apiUrl = process.env.REACT_APP_API_URL;
const BucketUrl = process.env.REACT_APP_BUCKET_URL || '';

interface IPetsitter {
  name: string;
  star: number;
  reviewCount: number;
  photo: string;
  possibleLocation: string[];
}

export interface IPet {
  name: string;
  age: number;
  petId: number;
  male: boolean;
  photo: string;
  species: string;
}

const ReservationStepFour = () => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petsitter, setPetsitter] = useState<IPetsitter | null>(null);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false); //예약하기 버튼 활성화 상태
  const {
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  // 예약 정보 가져오기
  const { reservationDay, reservationTimeStart, reservationTimeEnd, address, body, petId, pets } = useSelector(
    (state: IReservation) => state.reservation,
  );
  const { name, nickName, phone } = useSelector((state: IUser) => state.user);
  const dispatch = useDispatch();

  // 폰번호 자르기
  const phoneNum = `010-${phone.substring(3, 7)}-${phone.substring(7)}`;

  //  펫시터 정보 가져오기
  const { petsitterId } = useSelector((state: IReservation) => state.reservation);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/members/petsitters/${petsitterId}`);
        setPetsitter(response.data as IPetsitter);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchData();
  }, []);

  // useEffect -> 펫 정보 가져오기

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

  // 시간 형식
  const timeFormat = (time: any) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00`;
  };

  const reservationTimeStartFormat = timeFormat(reservationTimeStart);
  const reservationTimeEndFormat = timeFormat(reservationTimeEnd);

  const SendReservation = async () => {
    const token = getCookieValue('access_token');
    const petsitterIdNumber = parseInt(petsitterId, 10);
    const requestBody = {
      body,
      reservationDay,
      reservationTimeStart: reservationTimeStartFormat,
      reservationTimeEnd: reservationTimeEndFormat,
      address,
      phone,
      petId,
      petsitterId: petsitterIdNumber,
    };
    console.log(requestBody);
    try {
      const response = await axios.post(`${apiUrl}/reservations/`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data === 'Reservation Created') {
        alert('예약 신청이 완료되었습니다!');
        dispatch(deleteReservation());
        navigate('/cares');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainContainer>
      <Header>
        <HeaderTitle>예약확인</HeaderTitle>
      </Header>

      <CheckContainer>
        <CheckTitle>
          <CheckTItleTextWrapper>
            <CheckTitleText>{nickName}님</CheckTitleText>
            <CheckTitleText>{`예약내역을 확인해주세요`}</CheckTitleText>
          </CheckTItleTextWrapper>
          <CheckTitleIcon src="/imgs/ReservationCheckList.svg" alt="CheckListIcon" />
        </CheckTitle>

        <PetsitterCard>
          {petsitter && (
            <>
              <CardWrap>
                <PetsitterName>{petsitter.name}</PetsitterName>
                <Petsitter>펫시터</Petsitter>
              </CardWrap>
              <PetsitterImg src={petsitter.photo.replace(/https:\/\/bucketUrl/g, BucketUrl)} alt="PetsitterPhoto" />
              <PetsitterCardBody>
                <RatingImg src="/imgs/Star.svg" alt="Star" />
                <RatingCount>{petsitter.star}</RatingCount>
                <ReviewImg src="/imgs/ReviewIcon.svg" alt="ReviewIcon" />
                <ReviewCount>{petsitter.reviewCount}</ReviewCount>
              </PetsitterCardBody>
              <DividerWrap>
                <StyledDivider />
              </DividerWrap>
              <PetsitterLocation>{petsitter.possibleLocation}</PetsitterLocation>
            </>
          )}
        </PetsitterCard>

        <ReservationResult>
          <TitleWrap>
            <AddressTitle>주소</AddressTitle>
            <ReservationDayTitle>예약 날짜</ReservationDayTitle>
            <ReservationTimeTitle>예약 시간</ReservationTimeTitle>
          </TitleWrap>
          <ContentWrap>
            <Address>{address}</Address>
            <ReservationDay>{reservationDay}</ReservationDay>
            <ReservationTime>{`${reservationTimeStart} ~ ${reservationTimeEnd}`}</ReservationTime>
          </ContentWrap>
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
            {pets.map((pet) => (
              <DividerContainer key={pet.petId}>
                <PetWrap>
                  <PetImg
                    src={pet.photo?.replace(/https:\/\/bucketUrl/g, BucketUrl) || '/imgs/PawPaw.svg'}
                    alt="PetImg"
                  />
                  <PetInfo>
                    <PetName>{pet.name}</PetName>
                    <WrapText>
                      <PetSpecies>{`${pet.species} /`}</PetSpecies>
                      <PetAge>{`${pet.age}살`}</PetAge>
                    </WrapText>
                  </PetInfo>
                  <MaleIcon isMale={pet.male} />
                </PetWrap>
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
            onChange={(e) => {
              dispatch(addBody({ body: e.target.value }));
            }}
          />

          <ContactContainer>
            <ScheduleText>{'연락처'}</ScheduleText>
            <TextContainer>
              <ContactText>{`${name}, ${phoneNum}`}</ContactText>
              <ContactSubText>{'프로필 번호로 카카오 알림톡 전송'}</ContactSubText>
            </TextContainer>
          </ContactContainer>
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
            <DialogContentText sx={{ color: 'red', fontWeight: 'bold', mt: 2 }}> 필수 확인 사항</DialogContentText>
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
        <StyledButton type="submit" disabled={!isChecked || !isConfirmEnabled} onClick={SendReservation}>
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
  align-items: center;
  position: relative;
  margin: -54px 0 18px 60px;
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
  justify-content: space-around;
`;

const CheckTItleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  margin: 40px auto 16px;
  padding-bottom: 20px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const CardWrap = styled.div`
  display: flex;
  position: relative;
  padding: 12px 0 12px 36px;
  border-radius: 8px 8px 0 0;
  background-color: ${(props) => props.theme.colors.mainBlue};
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
  position: absolute;
  top: 16px;
  right: 14%;
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const PetsitterCardBody = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 36px -60px;
`;

const DividerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-top: -14px;
  padding: 0 40px;
`;

const PetsitterLocation = styled.h4`
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  margin: 14px 0 0 56px;
`;

const ReservationResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AddressTitle = styled.h3`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: #595959;
  white-space: nowrap;
`;

const Address = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  white-space: normal;
  text-align: center;
`;

const ReservationDayTitle = styled.h3`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: #595959;
  white-space: nowrap;
`;

const ReservationDay = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
`;

const ReservationTimeTitle = styled.h3`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: #595959;
  white-space: nowrap;
`;

const ReservationTime = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
`;

const PetCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-bottom: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
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
  justify-content: space-between;
  margin-top: 12px;
  margin-right: 80px;
  margin-bottom: 40px;
`;

const PetImg = styled.img`
  width: 70px !important;
  height: 70px !important;
  margin: 8px 16px 0 0;
  border-radius: 50%;
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  white-space: nowrap;
`;

const MaleIcon = styled.img<{ isMale: boolean }>`
  position: absolute;
  top: 4%;
  right: 60%;
  width: 20px;
  height: 20px;
  content: url(${(props) => (props.isMale ? '/icons/PetMaleIcon.svg' : '/icons/PetFemaleIcon.svg')});
`;

const PetName = styled.h3`
  display: flex;
  margin-top: 4px;
  margin-bottom: 2px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s20h30};
`;

const WrapText = styled.div`
  display: flex;
`;

const PetSpecies = styled.div`
  display: flex;
  margin-right: 4px;
  color: ${(props) => props.theme.textColors.gray40};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSize.s12h18};
`;

const PetAge = styled.div`
  display: flex;
  color: ${(props) => props.theme.textColors.gray40};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSize.s12h18};
`;

const CustomCarousel = styled(Carousel)`
  .carousel-slider {
    overflow: transparent;
  }

  .control-dots {
    top: 80px !important;
  }

  .dot {
    background: #279eff !important;
  }
`;

const RequestContainer = styled.div`
  margin: 16px 0;
  padding: 36px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const ScheduleText = styled.h2`
  margin: 8px 0 12px;
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  color: #595959;
  white-space: pre-line;
`;

const StyledTextField = styled(TextField)`
  .MuiInputLabel-root {
    margin-top: 3px;
    color: #d9d9d9;
    font-size: 14px;
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
  justify-content: center;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

const Textbox = styled.div`
  margin-right: 8px;
`;

const ConfirmText = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
  margin: 16px 0 4px;
`;

const WarningText = styled.div`
  ${(props) => props.theme.fontSize.s12h18}
  color: ${(props) => props.theme.textColors.primary};
  margin: 0 0 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 24px 20px;
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.subBlue};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: ${({ theme }) => theme.shadow.inset};
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
