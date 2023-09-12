import styled from 'styled-components';
import {
  MainContainer,
  PageTitle,
  RegisterInputWrapper,
  InputContainer,
  InputLabelStyle,
  InputStyle,
  RadioLabel,
  RadioWrapper,
} from './RegisterPet';
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

// 주소 API

interface IEditSchedule {
  possiblePetType?: 'PET_DOG' | 'PET_CAT' | 'PET_ALL';
  possibleDay?: string;
  possibleTimeStart?: string;
  possibleTimeEnd?: string;
  possibleLocation?: string;
}

// const apiUrl = process.env.REACT_APP_API_URL;

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const SitterSchedule = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch } = useForm<IEditSchedule>();
  const startTime = watch('possibleTimeStart');
  const endTime = watch('possibleTimeEnd');

  const onSubmit = () => {
    console.log(daysOfWeek);
  };

  // 근무 가능 요일
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDayChange = (day: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedDays((prev) => [...prev, day]);
    } else {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    }
  };

  const possibleDay = selectedDays.join('');

  //   시간 설정
  const handleTimeChange = (key: keyof IEditSchedule, dayjsObj: any) => {
    if (!dayjsObj) return;

    const hours = String(dayjsObj.$H).padStart(2, '0');
    const minutes = String(dayjsObj.$m).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    setValue(key, timeString);
    // console.log(timeString);
    // console.log(typeof timeString);
  };
  return (
    <>
      <PageTitle>케어 일정 관리</PageTitle>

      <MainContainer>
        <InputContainer onSubmit={handleSubmit(onSubmit)}>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="possiblePetType">케어 가능한 펫</InputLabelStyle>
            <RadioWrapper>
              <input type="radio" value="PET_DOG" {...register('possiblePetType')} />
              <RadioLabel htmlFor="male">강아지</RadioLabel>
              <input type="radio" value="PET_CAT" {...register('possiblePetType')} />
              <RadioLabel htmlFor="female">고양이</RadioLabel>
              <input type="radio" value="PET_ALL" {...register('possiblePetType')} />
              <RadioLabel htmlFor="female">모두</RadioLabel>
            </RadioWrapper>
          </RegisterInputWrapper>
          <CheckboxWrapper>
            <InputLabelStyle htmlFor="possibleDay">케어 가능 요일</InputLabelStyle>
            <Box sx={{ width: '60%' }}>
              <div role="group" aria-labelledby="possibleDay">
                <List
                  orientation="horizontal"
                  wrap
                  sx={{
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
            <InputLabelStyle htmlFor="possibleTimeStart">케어 가능 시간</InputLabelStyle>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePickerWrapper>
                <TimePicker
                  ampm={false}
                  minutesStep={6}
                  sx={{
                    width: '45%',
                    borderColor: '#A6A6A6',
                    borderRadius: '8px',
                    fontSize: 14,
                    '& .MuiInputBase-root': {
                      height: '32px',
                    },
                  }}
                  onChange={(dayjsObj) => handleTimeChange('possibleTimeStart', dayjsObj)}
                />
                <InputLabelStyle htmlFor="possibleTimeEnd">~</InputLabelStyle>
                <TimePicker
                  ampm={false}
                  minutesStep={6}
                  sx={{
                    width: '45%',
                    borderColor: '#A6A6A6',
                    borderRadius: '8px',
                    fontSize: 14,
                    '& .MuiInputBase-root': {
                      height: '32px',
                    },
                  }}
                  onChange={(dayjsObj) => handleTimeChange('possibleTimeEnd', dayjsObj)}
                />
              </TimePickerWrapper>
            </LocalizationProvider>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="possiblePetType">케어 가능 지역</InputLabelStyle>
            <InputStyle type="text" /*defaultValue={address} {...register('address')}*/ />
          </RegisterInputWrapper>

          <Button type="submit" variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            저장하기
          </Button>
        </InputContainer>
      </MainContainer>
    </>
  );
};

const CheckboxWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;

const TimePickerWrapper = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
`;

export default SitterSchedule;
