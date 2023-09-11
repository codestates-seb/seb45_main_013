import styled from 'styled-components';
import { useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import dayjs from 'dayjs';

const timeSlots = [
  // 시간표
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const convertTo12Hour = (time: string) => {
  // 24시간제를 12시간제로 변환
  const [hour, minute] = time.split(':');
  const hourNumber = parseInt(hour);
  const adjustedHour = hourNumber % 12 || 12;
  const period = hourNumber < 12 ? 'AM' : 'PM';
  return `${adjustedHour}:${minute} ${period}`;
};

const currentDate = dayjs();

const disableSpecificDates = (date: any) => {
  // 예약 불가능한 특정날짜 설정
  // if (date.format('YYYY-MM-DD') === "2023-10-01") return true;

  const dayOfWeek = date.day(); // 주말 예약 불가
  return dayOfWeek === 0 || dayOfWeek === 6;
};

const PossibleReservationTime = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <MainContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
        <DemoContainer sx={{ paddingTop: 0 }} components={['DatePicker']}>
          <DatePicker
            label="날짜를 입력해주세요"
            format="YYYY-MM-DD"
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              setSelectedTime('');
            }}
            disablePast
            shouldDisableDate={disableSpecificDates}
          />
        </DemoContainer>

        {selectedDate && (
          <Accordion>
            <AccordionSummary>시간 선택</AccordionSummary>
            <AccordionDetails>
              <StyledButtonGroup color="primary" aria-label="outlined primary button group">
                {timeSlots.map((time) => {
                  const isDisabled =
                    selectedDate &&
                    selectedDate.isSame(currentDate, 'day') &&
                    parseInt(time.split(':')[0]) <= currentDate.hour();
                  return (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'contained' : 'outlined'}
                      onClick={() => setSelectedTime(time)}
                      disabled={isDisabled}
                    >
                      {convertTo12Hour(time)}
                    </Button>
                  );
                })}
              </StyledButtonGroup>
            </AccordionDetails>
          </Accordion>
        )}
      </LocalizationProvider>
    </MainContainer>
  );
};

export default PossibleReservationTime;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 12px;
  flex-direction: column;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  flex-wrap: wrap;

  & .MuiButton-root {
    width: calc(100% / 5);
    text-align: center;
  }
`;
