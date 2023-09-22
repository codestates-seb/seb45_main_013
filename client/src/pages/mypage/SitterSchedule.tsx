import styled from 'styled-components';
import { PageTitle, InputLabelStyle, RadioLabel } from './RegisterPet';
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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getCookieValue } from 'hooks/getCookie';
import { IUser } from 'store/userSlice';
import dayjs, { Dayjs } from 'dayjs';
import DaumPostcode from 'react-daum-postcode';
import { Modal, Sheet } from '@mui/joy';
import { TextField } from '@mui/material';

//  주소가 바뀌어야 수정 가능

interface IEditSchedule {
  possiblePetType?: 'PET_DOG' | 'PET_CAT' | 'PET_ALL';
  possibleDay?: string;
  possibleTimeStart?: string;
  possibleTimeEnd?: string;
  possibleLocation?: string[];
}

type InfoType = {
  petsitterId: number;
  possiblePetType: string;
  possibleLocation: string;
  possibleDay: string;
  possibleTimeStart: string;
  possibleTimeEnd: string;
  star: number;
  reviewCount: number;
  monthTotalReservation: number | null;
} | null;

const apiUrl = process.env.REACT_APP_API_URL;
const token = getCookieValue('access_token');

const daysOfWeek = ['월', '화', '수', '목', '금'];

const SitterSchedule = () => {
  const { memberId } = useSelector((state: IUser) => state.user);

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<IEditSchedule>();

  const [possibleLocation, setPossibleLocation] = useState('');

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/members/petsitters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          const data = response.data;
          console.log(data);
          // 케어 가능한 펫
          setValue('possiblePetType', data.possiblePetType || '');
          // 케어 가능 요일
          const possibleDays = data.possibleDay ? data.possibleDay.split('') : [];
          setSelectedDays(possibleDays);
          // 케어 가능 시간
          const startTime = data.possibleTimeStart ? dayjs(data.possibleTimeStart, 'HH:mm') : null;
          const endTime = data.possibleTimeEnd ? dayjs(data.possibleTimeEnd, 'HH:mm') : null;
          setPossibleStartTime(startTime);
          setPossibleEndTime(endTime);
          // 케어 가능 지역
          setPossibleLocation(data.possibleLocation[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPetData();
  }, []);

  // 근무 가능 요일
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const day = event.target.value;
    let newSelectedDays;
    if (event.target.checked) {
      newSelectedDays = [...selectedDays, day];
    } else {
      newSelectedDays = selectedDays.filter((d) => d !== day);
    }
    setSelectedDays(newSelectedDays);

    const availableValues = newSelectedDays.join('');
    const trimmedValue = availableValues.trim();

    setValue('possibleDay', trimmedValue);
  };

  //   시간 설정
  const [possibleStartTime, setPossibleStartTime] = useState<Dayjs | null>(null);
  const [possibleEndTime, setPossibleEndTime] = useState<Dayjs | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  const validateTime = (timeValue: Dayjs | null) => {
    if (!timeValue) {
      setTimeError('시간을 선택해주세요. 🕖');
      return false;
    }

    const minute = timeValue.minute();

    if (minute !== 0 && minute !== 30) {
      setTimeError('시간은 30분 단위로 입력해주세요  🕖');
      return false;
    }

    setTimeError(null);
    return true;
  };

  const [possibleStartTimeError, setPossibleStartTimeError] = useState<string | null>(null);

  const handleTimeChange = (key: keyof IEditSchedule, dayjsObj: Dayjs | null) => {
    if (!dayjsObj) return;

    const hours = dayjsObj.hour();
    const minutes = dayjsObj.minute();

    if (hours < 8 || hours > 22 || (hours === 22 && minutes > 0)) {
      setTimeError('서비스는 8:00부터 22:00까지 제공됩니다.');
      return;
    }

    if (minutes !== 0 && minutes !== 30) {
      setTimeError('시간은 30분 단위로 입력해주세요.');
      return;
    }

    setPossibleStartTimeError(null);
    setTimeError(null);

    if (key === 'possibleTimeEnd') {
      const startTime = possibleStartTime;

      if (startTime && dayjsObj.isBefore(startTime)) {
        setPossibleStartTimeError('활동 가능 시작시간 이후의 시간을 선택해주세요.');
        return;
      }
    }

    if (key === 'possibleTimeStart') {
      setPossibleStartTime(dayjsObj);
    } else if (key === 'possibleTimeEnd') {
      setPossibleEndTime(dayjsObj);
    }
  };

  // 시군구
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleComplete = (data: { sido: string; sigungu: string; address: string }) => {
    // 시.도 저장
    setSido(data.sido);
    // 구.군 저장
    setSigugu(data.sigungu); // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)

    const address = `${data.sigungu}`;

    setPossibleLocation(address);
    setIsModalOpen(false);
  };

  const onSubmit = async (data: IEditSchedule) => {
    const orderedDays = ['월', '화', '수', '목', '금'];
    const reorderedDays = orderedDays.filter((day) => selectedDays.includes(day)).join('');
    if (reorderedDays) {
      data.possibleDay = reorderedDays;
    } else {
      data.possibleDay = '';
    }
    if (data.possibleDay && data.possibleDay.startsWith(',' || ' ')) {
      data.possibleDay = data.possibleDay.substring(1);
    }
    data.possibleTimeStart = possibleStartTime?.format('HH:mm:ss') || '';
    data.possibleTimeEnd = possibleEndTime?.format('HH:mm:ss') || '';
    data.possibleLocation = [possibleLocation];

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
                        value={day}
                        checked={selectedDays.includes(day)}
                        onChange={(e) => handleDayChange(e)}
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
                  value={possibleStartTime}
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
                  value={possibleEndTime}
                  onChange={(dayjsObj) => handleTimeChange('possibleTimeEnd', dayjsObj)}
                />
              </TimePickerWrapper>
              {timeError && <ErrorMessage>{timeError}</ErrorMessage>}
              {possibleStartTimeError && <ErrorMessage>{possibleStartTimeError}</ErrorMessage>}
            </LocalizationProvider>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="possibleLocation">케어 가능한 지역은 어디인가요?</InputLabelStyle>
            <TextField
              id="possibleLocation"
              placeholder="주소"
              variant="outlined"
              value={possibleLocation}
              sx={{
                width: '100%',
                mt: '12px',
                borderColor: '#A6A6A6',
                borderRadius: '8px',
                fontSize: 14,
                '& .MuiInputBase-root': {
                  height: '40px',
                },
              }}
              onClick={() => setIsModalOpen(true)}
              onKeyDown={() => setIsModalOpen(true)}
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
  padding: 0 60px;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
  margin-top: 36px;
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
  justify-content: space-between;
  width: 100%;
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
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  gap: 20px;
`;

const TimePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
`;

const Text = styled.div``;

const ErrorMessage = styled.div`
  margin-top: 8px;
  color: red;
  font-size: 14px;
`;
export default SitterSchedule;
