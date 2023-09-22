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
  Box,
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

import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, setReservation } from 'store/reservationSlice';
import { IUser, deleteUser } from 'store/userSlice';
import { refreshAccessToken } from 'hooks/refreshAcessToken';
import { deleteCookie } from 'hooks/deleteCookie';

interface IFormInput {
  address: string;
  detailAddress: string;
  error: boolean;
}

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // time 설정
  const now = new Date();
  const nowDate = dayjs(now).format('YYYY-MM-DD');
  const nowTime = dayjs(now).format('HH:mm:ss');

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // submit state
  const { isLogin, petsitterBoolean } = useSelector((state: IUser) => state.user);
  const [reservationDay, setReservationDay] = useState<any>('');
  const [reservationTimeStart, setReservationTimeStart] = useState<any>('');
  const [reservationTimeEnd, setReservationTimeEnd] = useState('');
  const [checkedPetId, setCheckedPetId] = useState<any[]>([]);
  const [checkedPets, setCheckedPets] = useState<any[]>([]);

  // submit state error
  const [pickerError, setPickerError] = useState();

  // Modal 동물 등록
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isCat, setIsCat] = useState('DOG');
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [isMale, setIsMale] = useState('');
  const [isNeutering, setIsNeutering] = useState('');

  // 펫등록 에러
  const [isNameError, setIsNameError] = useState(false);
  const [isSpeciesError, setIsSpeciesError] = useState(false);
  const [isWeightError, setIsWeightError] = useState(false);
  const [isAgeError, setIsAgeError] = useState(false);

  const [pets, setPets] = useState([]);

  /// Time
  now.setMonth(now.getMonth() + 3);
  const modifiedNow = now.toISOString().slice(0, 10);

  const {
    register,
    setValue,
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
    // 우편번호 data.zonecode
    // 시.도 data.sido
    // 구.군 data.sigungu
    // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    const splitAddress = data.address.split(' ').splice(2).join(' ');

    if (data) {
      clearErrors('address');
    }
    setValue('address', data.zonecode + ' ' + data.sido + ' ' + data.sigungu + ' ' + splitAddress);
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
  const handlePetCheck = (pet: any) => {
    if (checkedPetId.includes(pet.petId)) {
      setCheckedPetId(checkedPetId.filter((id) => id !== pet.petId));
    } else {
      if (checkedPetId.length < 3) {
        setCheckedPetId([...checkedPetId, pet.petId]);
      } else {
        alert('최대 3마리까지만 선택할 수 있습니다.');
      }
    }
    if (checkedPets.includes(pet)) {
      setCheckedPets(checkedPets.filter((checkedPet) => checkedPet.petId !== pet.petId));
    } else {
      if (checkedPets.length < 3) {
        setCheckedPets([...checkedPets, pet]);
      } else {
        alert('최대 3마리까지만 선택할 수 있습니다.');
      }
    }
  };

  // 펫등록 모달 handler
  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsMale(e.target.value);
  };

  const handleNeuteringChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNeutering(e.target.value);
  };

  // picker 에러 핸들
  const handleError = (error: any) => {
    setPickerError(error);
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

  const checkDisable = () => {
    if (!name || !species || !weight || !age || !isMale || !isNeutering) {
      return true;
    } else {
      return false;
    }
  };

  // 펫등록 submit (access token 재발급 설정 완료)
  const handlePetSubmit = async () => {
    const accessToken = getCookieValue('access_token');

    const formData = new FormData();

    formData.append('type', isCat);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('species', species);
    formData.append('weight', weight);
    formData.append('male', isMale);
    formData.append('neutering', isNeutering);
    if (imageFile) {
      formData.append('file', imageFile);
    }

    try {
      const response = await axios.post(`${apiUrl}/pets`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('펫 등록되었습니다.');
        setIsPetModalOpen(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            const response = await axios.post(`${apiUrl}/pets`, formData, {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            if (response.status === 201) {
              alert('펫 등록되었습니다.');
              setIsPetModalOpen(false);
            }
          }
        } catch (error) {
          // 에러 설정 해야함 (access token이 재발급 되지 않는 상황)
          console.log(error);
        }
      }
    }
  };

  // 예약 정보 리덕스로 저장
  const onSubmit = async (data: any) => {
    const { address, detailAddress } = data;

    if (!reservationTimeStart || !reservationTimeEnd) {
      alert('시간을 확인해주세요.');
    } else if (checkedPetId.length === 0) {
      alert('맡기실 반려동물을 선택해주세요.');
    } else if (pickerError === 'invalidDate') {
      alert('날짜를 확인해주세요.');
    } else if (pickerError === 'shouldDisableDate') {
      alert('과거 날짜와 주말은 선택할 수 없습니다.');
    } else if (pickerError === 'minTime' || pickerError === 'maxTime') {
      alert('시간은 8시부터 22시까지입니다');
    } else if (pickerError === 'shouldDisableTime-hours') {
      alert('완료 시간은 시작 시간 이후여야 합니다.');
    } else if (pickerError === 'shouldDisableTime-minutes' || pickerError === 'minutesStep') {
      alert('예약 시간은 정시 또는 30분 단위로 선택해야 합니다.');
    } else if (
      reservationDay &&
      reservationTimeStart &&
      reservationTimeEnd &&
      address &&
      detailAddress &&
      checkedPetId.length > 0
    ) {
      dispatch(
        setReservation({
          reservationDay,
          reservationTimeStart,
          reservationTimeEnd,
          address: `${address} ${detailAddress}`,
          petId: checkedPetId,
          pets: checkedPets,
        }),
      );

      navigate('/reservation/step2');
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
      alert('로그인을 해주세요.');
    }
    if (petsitterBoolean) {
      navigate('/');
      alert('고객만 이용 가능한 서비스입니다.');
    }
  }, []);

  // 펫 정보 가져오기 (accessToken 재발급 설정 완료)
  useEffect(() => {
    const getPets = async () => {
      const accessToken = getCookieValue('access_token');
      if (isLogin && accessToken) {
        try {
          const response = await axios.get(`${apiUrl}/pets`, { headers: { Authorization: `Bearer ${accessToken}` } });
          setPets(response.data);
        } catch (error: any) {
          console.error(error);
          if (error.response && error.response.status === 401) {
            try {
              const newAccessToken = await refreshAccessToken();
              if (newAccessToken) {
                // Access Token을 성공적으로 갱신했으므로 다시 요청을 보냅니다.
                const response = await axios.get(`${apiUrl}/pets`, {
                  headers: { Authorization: `Bearer ${newAccessToken}` },
                });
                setPets(response.data);
              }
            } catch (refreshError) {
              console.error(refreshError);
              // Refresh Token을 사용하여 새로운 Access Token을 얻는 동안 오류가 발생했을 때 처리

              alert('로그인 세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
              dispatch(deleteUser());
              dispatch(deleteReservation());
              deleteCookie('access_token');
              deleteCookie('refresh_token');
            }
          }
        }
      }
    };

    getPets();
  }, [isPetModalOpen]);

  return (
    <MainContainer>
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>1/2</PageNumberText>
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
                  const dayOfWeek = dayjs(day as Dayjs).day();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 토요일, 일요일 선택 금지
                  return (
                    !dayjs(dayjs(day as Dayjs).format('YYYY-MM-DD')).isBetween(nowDate, modifiedNow, 'day', '[)') ||
                    isWeekend
                  );
                }}
                onError={handleError}
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
                    minutesStep={30}
                    skipDisabled={true}
                    minTime={dayjs(new Date(0, 0, 0, 8))}
                    maxTime={dayjs(new Date(0, 0, 0, 21))}
                    ampm={false}
                    shouldDisableTime={(value, view) => {
                      const currentTime = dayjs();
                      if (!currentTime.isSame(dayjs(reservationDay), 'date')) {
                        return false;
                      }
                      if (view === 'hours') {
                        if (value.hour() < currentTime.hour() + 2) {
                          return true;
                        }
                      }
                      if (view === 'minutes' && value.minute() % 30 !== 0) {
                        return false;
                      }
                      return false;
                    }}
                    onChange={handleStartTime}
                    onError={handleError}
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
                    minutesStep={30}
                    skipDisabled={true}
                    minTime={dayjs(new Date(0, 0, 0, 9))}
                    maxTime={dayjs(new Date(0, 0, 0, 22))}
                    ampm={false}
                    shouldDisableTime={(value, view) => {
                      if (view === 'hours' && value.hour() < +reservationTimeStart.split(':')[0] + 1) {
                        return true;
                      }
                      if (view === 'minutes' && value.minute() % 30 !== 0) {
                        return false;
                      }
                      return false;
                    }}
                    onChange={handleEndTime}
                    onError={handleError}
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
            placeholder="주소를 입력해주세요"
            fullWidth
            {...register('address', { required: true })}
            error={errors.address?.type === 'required'}
            onClick={onToggleModal}
            onKeyDown={onToggleModal}
          />
          <TextField label="상세주소를 입력해주세요" fullWidth {...register('detailAddress', { required: true })} />
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
                    <div>
                      <CheckBoxInput
                        type="checkbox"
                        id={pet.petId}
                        name={pet.petId}
                        checked={checkedPetId.includes(pet.petId)}
                        onChange={() => handlePetCheck(pet)}
                      />
                      <PetImgLabel htmlFor={pet.petId} checked={checkedPetId.includes(pet.petId)}>
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
                      </PetImgLabel>
                    </div>
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
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : isCat === 'DOG'
                            ? '/imgs/PetProfile.png'
                            : '/imgs/CatProfile.png'
                        }
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
                    <PetButton onClick={() => setIsCat('DOG')} value={isCat === 'DOG' ? 'true' : 'false'}>
                      <img src="/icons/DogIcon.svg" alt="dogIcon" />
                    </PetButton>
                    <PetButton onClick={() => setIsCat('CAT')} value={isCat === 'CAT' ? 'true' : 'false'}>
                      <img src="/icons/CatIcon.svg" alt="catIcon" />
                    </PetButton>
                  </ButtonGroup>
                  <TextField
                    id="name"
                    label="반려동물 이름"
                    type="text"
                    size="small"
                    margin="dense"
                    onChange={(e) => {
                      if (e.target.value.length > 10) {
                        setIsNameError(true);
                      } else {
                        setIsNameError(false);
                      }
                      setName(e.target.value);
                    }}
                    error={isNameError}
                    helperText={isNameError && '10자 이하여야 합니다.'}
                  ></TextField>
                  <TextField
                    id="species"
                    label="품종"
                    type="text"
                    size="small"
                    margin="dense"
                    onChange={(e) => {
                      if (e.target.value.length > 10) {
                        setIsSpeciesError(true);
                      } else {
                        setIsSpeciesError(false);
                      }
                      setSpecies(e.target.value);
                    }}
                    error={isSpeciesError}
                    helperText={isSpeciesError && '10자 이하여야 합니다.'}
                  ></TextField>
                  <TextField
                    id="weight"
                    label="몸무게"
                    type="number"
                    size="small"
                    margin="dense"
                    inputProps={{ max: 50, min: 0, step: '0.01' }}
                    onChange={(e) => {
                      if (+e.target.value > 50 || +e.target.value < 0) {
                        setIsWeightError(true);
                      } else {
                        setIsWeightError(false);
                      }
                      setWeight(e.target.value);
                    }}
                    error={isWeightError}
                    helperText={isWeightError ? '몸무게는 0kg이상 50kg 이하여야 합니다.' : undefined}
                  ></TextField>
                  <TextField
                    id="age"
                    type="number"
                    label="나이"
                    size="small"
                    margin="dense"
                    inputProps={{ max: '20', min: '0' }}
                    onChange={(e) => {
                      if (e.target.value.length > 20) {
                        setIsAgeError(true);
                      }
                      setAge(e.target.value);
                    }}
                    error={isAgeError}
                    helperText={isAgeError && '나이는 20살 이하여야 합니다.'}
                  ></TextField>
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
                        value={true}
                        control={<Radio />}
                        label={<img src="/icons/MaleIcon.svg" alt="male" />}
                        labelPlacement="start"
                        sx={{
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      />
                      <FormControlLabel
                        value={false}
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
                        value={true}
                        control={<Radio />}
                        label="했음"
                        labelPlacement="start"
                        sx={{
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      />
                      <FormControlLabel
                        value={false}
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
                    disabled={checkDisable()}
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

const PetImgLabel = styled.label<{ checked?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:before {
    content: '✓';
    z-index: 2;
    position: absolute;
    top: -60px;
    right: 4px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.mainBlue};
    color: white;
    text-align: center;
    line-height: 24px;

    // 체크 상태에 따라 보이거나 숨기거나
    opacity: ${({ checked }) => (checked ? '1' : '0')};
    transform: ${({ checked }) => (checked ? 'scale(1)' : 'scale(0)')};

    // 애니메이션 효과
    transition-duration: 0.4s;
  }
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
`;

const PetImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  object-position: center; /* 이미지를 가운데 정렬하기 위해 필요 */
  border-radius: 50%;

  ${CheckBoxInput}:checked + ${PetImgLabel} & {
    // 체크된 상태에서 적용할 스타일...
    transform: scale(0.9);
    border-color: #ddd;
    // 여기에 추가적인 스타일을 적용할 수 있습니다.
    filter: brightness(0.8);
  }
`;

const AddPetImg = styled.img`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.textColors.secondary};
  border: 1px solid ${({ theme }) => theme.textColors.primary};
  border-radius: 50%;
  cursor: pointer;
`;

const PetButton = styledMui(Button)(({ value }) => ({
  width: '100%',
  backgroundColor: value === 'true' ? '#279EFF' : '#A6A6A6',

  ':hover': {
    backgroundColor: value === 'true' ? '#1D8CE7' : '#757575',
  },
}));

const ButtonContainer = styled(Box)`
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
