import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import {
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Dialog,
} from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';

import { Modal, Sheet } from '@mui/joy';
import DaumPostcode from 'react-daum-postcode';

import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { getCookieValue } from 'hooks/getCookie';

import { useDispatch } from 'react-redux';
import { setReservation } from 'store/reservationSlice';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

interface IFormInput {
  address: string;
  error: boolean;
}

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getCookieValue('access_token');

  const now = new Date();

  const nowDate = dayjs(now).format('YYYY-MM-DD');

  const nowTime = dayjs(now).format('HH:mm:ss');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // submit state
  const [reservationDay, setReservationDay] = useState<any>('');
  const [reservationTimeStart, setReservationTimeStart] = useState<any>('');
  const [reservationTimeEnd, setReservationTimeEnd] = useState('');
  const [checkedPets, setCheckedPets] = useState<number[]>([]);

  // Modal 동물 등록
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isCat, setIsCat] = useState(false);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [isMale, setIsMale] = useState('');
  const [isNeutering, setIsNeutering] = useState('');

  console.log('고양인가요?: ', isCat);
  console.log('성별이 뭔가요?: ', isMale);
  console.log('중성화했나요?: ', isNeutering);

  const [pets, setPets] = useState([]);

  /// Time
  now.setMonth(now.getMonth() + 3);
  const modifiedNow = now.toISOString().slice(0, 10);

  // Address
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

  const onErrorImg = (e: any) => {
    e.target.src = '/imgs/PetProfile.png';
  };

  // Date handler
  const handleDateChange = (newDate: any) => {
    setReservationDay(dayjs(newDate).format('YYYY-MM-DD'));
  };

  // Time handler
  const handleStartTime = (newTime: any) => {
    setReservationTimeStart(dayjs(newTime).format('HH:mm:ss'));
  };
  const handleEndTime = (newTime: any) => {
    setReservationTimeEnd(dayjs(newTime).format('HH:mm:ss'));
  };

  // Address handler
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

  // Address Modal
  const onToggleModal = () => {
    setIsModalOpen(true);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // Pet Check handler
  const handlePetCheck = (petId: number) => {
    if (checkedPets.includes(petId)) {
      setCheckedPets(checkedPets.filter((id) => id !== petId));
    } else {
      setCheckedPets([...checkedPets, petId]);
    }
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsMale(e.target.value);
  };

  const handleNeuteringChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNeutering(e.target.value);
  };

  const handleStartError = (newError: any) => {
    console.log(newError);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile: File = selectedFiles[0];
      setImageFile(selectedFile);
    }
  };

  const handlePetSubmit = (e: any) => {
    if (!name && !species && !weight && !age && !isMale && !isNeutering) {
    }
  };

  const onSubmit = async (data: any) => {
    const { address } = data;
    if (reservationDay && reservationTimeStart && reservationTimeEnd && address) {
      console.log({ reservationDay, reservationTimeStart, reservationTimeEnd, address });
      dispatch(setReservation({ reservationDay, reservationTimeStart, reservationTimeEnd, address }));
      navigate('/reservation');
    } else if (!reservationTimeStart || !reservationTimeEnd) {
      alert('시간을 확인해주세요');
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`${apiUrl}/pets`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => setPets(res.data));
    } catch (error: any) {}
  }, []);

  return (
    <MainContainer>
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>1/3</PageNumberText>
      </StatusHeader>
      <ReservationContainer onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <ScheduleText>언제 펫시터가 필요하신가요?</ScheduleText>
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
        </Container>
        <Container>
          <ScheduleText>방문시간</ScheduleText>
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
                    shouldDisableTime={(value, view) => view === 'hours' && value.hour() < +nowTime.split(':')[0] + 2}
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
        </Container>
        <Container>
          <ScheduleText>어디로 방문할까요?</ScheduleText>
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
        </Container>
        <SelectPetContainer>
          <SelectTitle>맡기시는 반려동물</SelectTitle>
          <PetContainer>
            {Array.isArray(pets) &&
              pets.length > 0 &&
              pets.map((pet: any) => {
                return (
                  <SelectPetCard key={pet.petId}>
                    <PetImgLabel>
                      <PetImg
                        src={
                          pet.photo ? (
                            pet.photo.replace('https://bucketUrl', bucketUrl)
                          ) : (
                            <div style={{ width: '80px', height: '80px', backgroundColor: 'gray' }}>
                              사진을 등록해 주세요
                            </div>
                          )
                        }
                        onError={onErrorImg}
                        alt="펫 사진"
                      />
                      <CheckBoxInput
                        type="checkbox"
                        id={pet.petId}
                        name={pet.petId}
                        checked={checkedPets.includes(pet.petId)}
                        onChange={() => handlePetCheck(pet.petId)}
                      />
                    </PetImgLabel>
                    <SelectPetName>{pet.name}</SelectPetName>
                  </SelectPetCard>
                );
              })}
            <SelectPetCard>
              <AddPetImg src="/imgs/PetAdd.svg" onClick={() => setIsPetModalOpen(true)} />
              <Dialog open={isPetModalOpen} onClose={() => setIsPetModalOpen(false)}>
                <DialogTitle>반려동물 등록</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                  <DialogContentText>반려동물 소개는 마이페이지에서 펫 수정을 통해 등록해주세요!</DialogContentText>
                  <ButtonContainer>
                    <Button onClick={handleImageClick} sx={{ backgroundColor: 'transparent', overflow: 'hidden' }}>
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : '/imgs/PetProfile.png'}
                        alt="미리보기"
                        width="100px"
                        style={{ borderRadius: '50%' }}
                      />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg image.png"
                      hidden
                      onChange={handleFileChange}
                    />
                  </ButtonContainer>
                  <ButtonGroup>
                    <PetButton onClick={() => setIsCat(false)} value={`${!isCat}`}>
                      <img src="/icons/DogIcon.svg" alt="dogIcon" />
                    </PetButton>
                    <PetButton onClick={() => setIsCat(true)} value={`${isCat}`}>
                      <img src="/icons/CatIcon.svg" alt="catIcon" />
                    </PetButton>
                  </ButtonGroup>
                  <TextField id="name" label="반려동물 이름" type="text" size="small" margin="dense"></TextField>
                  <TextField id="species" label="품종" size="small" margin="dense"></TextField>
                  <TextField id="weight" label="몸무게" size="small" margin="dense"></TextField>
                  <TextField id="age" label="나이" size="small" margin="dense"></TextField>
                  <FormControl
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      paddingRight: '52px',
                    }}
                  >
                    <FormLabel>성별</FormLabel>
                    <RadioGroup
                      row
                      sx={{ alignItems: 'center', gap: '60px' }}
                      value={isMale}
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label={<img src="/icons/MaleIcon.svg" alt="male" />}
                        labelPlacement="start"
                        sx={{
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label={<img src="/icons/FemaleIcon.svg" alt="female" />}
                        labelPlacement="start"
                        sx={{
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      paddingRight: '52px',
                    }}
                  >
                    <FormLabel>중성화</FormLabel>
                    <RadioGroup
                      row
                      sx={{ alignItems: 'center', gap: '40px' }}
                      value={isNeutering}
                      onChange={handleNeuteringChange}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="했음"
                        labelPlacement="start"
                        sx={{
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="안했음"
                        labelPlacement="start"
                        sx={{
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <Button
                    sx={{
                      width: '100%',
                      backgroundColor: '#279EFF',
                      color: 'white',
                      ':hover': { backgroundColor: '#1D8CE7' },
                      ':active': { backgroundColor: '#096DBE', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset' },
                    }}
                    onClick={handlePetSubmit}
                  >
                    펫 등록하기
                  </Button>
                </DialogActions>
              </Dialog>
            </SelectPetCard>
          </PetContainer>
        </SelectPetContainer>
        <ButtonContainer>
          <StyledButton>다음단계</StyledButton>
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScheduleText = styled.h2`
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

const SelectPetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectTitle = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  ${({ theme }) => theme.fontSize.s16h24};
`;

const PetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const SelectPetCard = styled.div`
  display: flex;
  position: relative;
  gap: 8px;
  flex-direction: column;
  cursor: pointer;
`;

const PetImgLabel = styled.label`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;

const SelectPetName = styled.div`
  text-align: center;
  ${({ theme }) => theme.fontSize.s14h21}
`;

const CheckBoxInput = styled.input`
  position: absolute;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transform: scale(0.9);
  right: 1px;

  &:checked::after {
    content: '✓';

    color: white;
    background-color: ${({ theme }) => theme.colors.mainBlue};

    text-align: center;
    width: 20px;
    height: 20px;
    border-radius: 50%; /* Make the checkmark a circle */

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition:
      width 0.3s ease,
      height 0.3s ease;
  }

  /* Add hover styles if needed */
  &:checked + label:hover::after {
    width: 1.5em; /* Increase the size of the checkmark on hover */
    height: 1.5em; /* Increase the size of the checkmark on hover */
  }
`;

const PetImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* 이미지를 가운데 정렬하기 위해 필요 */
`;

const AddPetImg = styled.img`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.textColors.secondary};
  border: 1px solid ${({ theme }) => theme.textColors.primary};
  border-radius: 50%;
  cursor: pointer;
`;

const UploadPetImgbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const PetButtonContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  margin: 16px 0 4px 0;
`;

const PetButton = styledMui(Button)(({ value }) => ({
  width: '100%',
  backgroundColor: value === 'true' ? '#279EFF' : '#A6A6A6',

  ':hover': {
    backgroundColor: value === 'true' ? '#1D8CE7' : '#757575',
  },
}));

// display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   width: 100%;
//   border: none;
//   background-color: ${(props) => (props.iscat ? props.theme.textColors.gray50 : props.theme.colors.mainBlue)};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
`;

const GenderRadio = styled.div`
  display: flex;
  gap: 12px;
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
