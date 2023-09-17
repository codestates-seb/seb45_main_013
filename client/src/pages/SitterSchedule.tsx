import styled from 'styled-components';
import { PageTitle, InputContainer, InputLabelStyle, RadioLabel } from './RegisterPet';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getCookieValue } from 'hooks/getCookie';
import { IUser } from 'store/userSlice';
import dayjs, { Dayjs } from 'dayjs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DaumPostcode from 'react-daum-postcode';
import { Modal, Sheet } from '@mui/joy';
import { TextField } from '@mui/material';

// 가능한 시간 설정
// 주소 추가 기능
// 등록되어있으면 미리 get

interface IEditSchedule {
  possiblePetType?: 'PET_DOG' | 'PET_CAT' | 'PET_ALL';
  possibleDay?: string;
  possibleTimeStart?: string;
  possibleTimeEnd?: string;
  possibleLocation?: string[];
}

const apiUrl = process.env.REACT_APP_API_URL;

const daysOfWeek = ['월', '화', '수', '목', '금'];

const SitterSchedule = () => {
  const { memberId } = useSelector((state: IUser) => state.user);

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<IEditSchedule>();

  const [addressValues, setAddressValues] = useState<string[]>(['']);

  // 근무 가능 요일
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDayChange = (day: string, event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedDays;
    if (event.target.checked) {
      newSelectedDays = [...selectedDays, day];
    } else {
      newSelectedDays = selectedDays.filter((d) => d !== day);
    }
    setSelectedDays(newSelectedDays);

    const availableValue = newSelectedDays.join('');
    setValue('possibleDay', availableValue);
  };

  //   시간 설정
  const [possibleStartTime, setPossibleStartTime] = useState<Dayjs | null>(null);

  const handleTimeChange = (key: keyof IEditSchedule, dayjsObj: Dayjs | null) => {
    if (!dayjsObj) return;

    const hours = String(dayjsObj.hour()).padStart(2, '0');
    const minutes = String(dayjsObj.minute()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    if (key === 'possibleTimeStart') {
      setPossibleStartTime(dayjsObj);
    }

    setValue(key, timeString);
  };

  // 주소
  const [possibleLocation, setPossibleLocation] = useState<string[]>([]);

  const handleAddressChange = (newAddress: string, index: number) => {
    const updatedAddressValues = [...addressValues];
    updatedAddressValues[index] = newAddress;
    setAddressValues(updatedAddressValues);
  };

  const [addAdress, setAddAddress] = useState([{ id: 1 }]);
  const [buttonIndex, setButtonIndex] = useState<number>(0);
  const handleAddAddress = () => {
    if (addAdress.length >= 3) {
      return;
    }

    const newAddress = { id: Date.now() };
    setAddAddress([...addAdress, newAddress]);
    setAddressValues([...addressValues, '']);

    setButtonIndex(addAdress.length);
  };

  // 시군구
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleComplete = (data: { zonecode: string; sido: string; sigungu: string; address: string }) => {
    // 우편번호 저장
    setZonecode(data.zonecode);
    // 시.도 저장
    setSido(data.sido);
    // 구.군 저장
    setSigugu(data.sigungu); // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    const address = `${data.sido} ${data.sigungu}`;
    setRemainAddress(address);

    setSelectedAddress(data.address);
    setIsModalOpen(false);

    const emptyAddressIndex = addressValues.findIndex((address) => !address);

    if (emptyAddressIndex !== -1) {
      const updatedAddressValues = [...addressValues];
      updatedAddressValues[emptyAddressIndex] = data.address;
      setAddressValues(updatedAddressValues);

      const updatedPossibleLocation = [...possibleLocation];
      updatedPossibleLocation[emptyAddressIndex] = address;
      setPossibleLocation(updatedPossibleLocation);

      // setValue(`possibleLocation[${emptyAddressIndex}]`, address);
    }
  };

  const onSubmit = async (data: IEditSchedule) => {
    console.log(data);
    const token = getCookieValue('access_token');
    try {
      const response = await axios.patch(`${apiUrl}/members/petsitters/${memberId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data === 'success modify member') {
        alert('일정이 저장되었습니다.');
        navigate('/mypage');
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle>케어 일정 관리</PageTitle>
      <ImageContainer>
        <StyledImg src="/imgs/Schedule.png" alt="Schedule" />
      </ImageContainer>
      <MainContainer>
        <InputContainer onSubmit={handleSubmit(onSubmit)}>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="possiblePetType">어떤 펫을 케어 가능하신가요?</InputLabelStyle>
            <RadioContainer>
              <RadioWrapper>
                <input type="radio" value="PET_DOG" {...register('possiblePetType')} />
                <RadioLabel htmlFor="male">강아지</RadioLabel>
              </RadioWrapper>
              <RadioWrapper>
                <input type="radio" value="PET_CAT" {...register('possiblePetType')} />
                <RadioLabel htmlFor="female">고양이</RadioLabel>
              </RadioWrapper>
              <RadioWrapper>
                <input type="radio" value="PET_ALL" {...register('possiblePetType')} />
                <RadioLabel htmlFor="female">모두</RadioLabel>
              </RadioWrapper>
            </RadioContainer>
          </RegisterInputWrapper>

          <CheckboxWrapper>
            <InputLabelStyle htmlFor="possibleDay">케어 가능한 요일은 언제인가요?</InputLabelStyle>
            <Box sx={{ width: '100%', marginTop: '-12px' }}>
              <div role="group" aria-labelledby="possibleDay">
                <List
                  orientation="horizontal"
                  wrap
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    '--List-gap': '4px',
                    '--ListItem-radius': '20px',

                    '& > :first-child': {
                      marginLeft: 0,
                    },
                    '& > :last-child': {
                      marginRight: 0,
                    },
                  }}
                >
                  {daysOfWeek.map((day) => (
                    <ListItem key={day}>
                      <Checkbox
                        overlay
                        disableIcon
                        variant="soft"
                        label={day}
                        onChange={(e) => handleDayChange(day, e)}
                        sx={{
                          '& label': {
                            fontSize: 14,
                          },
                          '&.Mui-checked': {
                            color: '#279eff',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Box>
          </CheckboxWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="possibleTimeStart">케어 가능한 시간은 언제인가요?</InputLabelStyle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePickerWrapper>
                <TimePicker
                  ampm={false}
                  minTime={dayjs(new Date(0, 0, 0, 8))}
                  maxTime={dayjs(new Date(0, 0, 0, 22))}
                  shouldDisableTime={(timeValue, type) => {
                    if (type === 'hours') {
                      const hour = timeValue.hour();
                      return hour < 8 || hour > 22;
                    }
                    if (type === 'minutes') {
                      const minute = timeValue.minute();
                      return minute !== 0 && minute !== 30;
                    }
                    return false;
                  }}
                  skipDisabled={true}
                  views={['hours', 'minutes']}
                  sx={{
                    width: '45%',
                    borderColor: '#A6A6A6',
                    borderRadius: '8px',
                    fontSize: 14,
                    '& .MuiInputBase-root': {
                      height: '40px',
                    },
                  }}
                  onChange={(dayjsObj) => handleTimeChange('possibleTimeStart', dayjsObj)}
                />
                <Text>~</Text>
                <TimePicker
                  ampm={false}
                  minTime={possibleStartTime || dayjs(new Date(0, 0, 0, 8))}
                  maxTime={dayjs(new Date(0, 0, 0, 22))}
                  shouldDisableTime={(timeValue, type) => {
                    if (type === 'hours') {
                      const hour = timeValue.hour();
                      return hour < 8 || hour > 22;
                    }
                    if (type === 'minutes') {
                      const minute = timeValue.minute();
                      return minute !== 0 && minute !== 30;
                    }
                    return false;
                  }}
                  skipDisabled={true}
                  views={['hours', 'minutes']}
                  sx={{
                    width: '45%',
                    borderColor: '#A6A6A6',
                    borderRadius: '8px',
                    fontSize: 14,
                    '& .MuiInputBase-root': {
                      height: '40px',
                    },
                  }}
                  onChange={(dayjsObj) => handleTimeChange('possibleTimeEnd', dayjsObj)}
                />
              </TimePickerWrapper>
            </LocalizationProvider>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="possibleLocation">케어 가능한 지역은 어디인가요?</InputLabelStyle>
            {addAdress.map((address, index: number) => (
              <AddressWrapper key={address.id}>
                <TextField
                  id={`address-${index}`}
                  placeholder="주소"
                  variant="outlined"
                  value={addressValues[index] || ''}
                  sx={{
                    width: '90%',
                    borderColor: '#A6A6A6',
                    borderRadius: '8px',
                    fontSize: 14,
                    '& .MuiInputBase-root': {
                      height: '40px',
                    },
                  }}
                  onKeyDown={() => {
                    setIsModalOpen(true);
                    setButtonIndex(index);
                  }}
                  onClick={() => {
                    setIsModalOpen(true);
                    setButtonIndex(index);
                  }}
                  onChange={(e) => handleAddressChange(e.target.value, index)}
                />
                {isModalOpen && (
                  <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Sheet sx={{ width: '360px' }}>
                      <DaumPostcode onComplete={handleComplete} />
                    </Sheet>
                  </Modal>
                )}
                {buttonIndex === index && addAdress.length < 3 && (
                  <FunctionButton type="button" onClick={handleAddAddress}>
                    <PlusIcon />
                  </FunctionButton>
                )}
                {/* 지우기 버튼 수정하기 */}
                {buttonIndex === index && addAdress.length < 3 && (
                  <FunctionButton type="button">
                    <DeleteIcon />
                  </FunctionButton>
                )}
              </AddressWrapper>
            ))}
          </RegisterInputWrapper>

          <Button type="submit" variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            저장하기
          </Button>
        </InputContainer>
      </MainContainer>
    </>
  );
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 36px;
`;

const StyledImg = styled.img`
  width: 60px;
  height: 60px;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 60px;
`;

const RegisterInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const RadioContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 12px;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  & > input[type='radio'] {
    margin-right: 8px;
  }
  /* &:last-child {
    margin-right: 16px;
  } */
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const TimePickerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const Text = styled.div``;

const FunctionButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  cursor: pointer;
  background-color: none;
`;

const AddressWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const PlusIcon = styled(AddCircleOutlineIcon)`
  color: gray;
  margin: 0;
  &:hover {
    color: #279eff;
  }
`;

const DeleteIcon = styled(HighlightOffIcon)`
  color: gray;
  margin: 0;
  &:hover {
    color: #279eff;
  }
`;

export default SitterSchedule;
