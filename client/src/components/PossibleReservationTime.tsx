import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

const apiUrl = process.env.REACT_APP_API_URL;

const timeSlots = [
  // 시간표
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
];

const convertTo12Hour = (time: string) => {
  // 24시간제를 12시간제로 변환
  const [hour, minute] = time.split(':');
  const hourNumber = parseInt(hour);
  const adjustedHour = hourNumber % 12 || 12;
  const period = hourNumber < 12 ? 'AM' : 'PM';
  return `${adjustedHour}:${minute} ${period}`;
};

const amTimeSlots = timeSlots.filter((time) => parseInt(time.split(':')[0]) < 12);
const pmTimeSlots = timeSlots.filter((time) => parseInt(time.split(':')[0]) >= 12);

const currentDate = dayjs();

const disableSpecificDates = (date: dayjs.Dayjs) => {
  // 예약 불가능한 특정날짜 설정
  // if (date.format('YYYY-MM-DD') === "2023-10-01") return true;

  const dayOfWeek = date.day(); // 주말 예약 불가
  return dayOfWeek === 0 || dayOfWeek === 6;
};

interface PossibleReservationTimeProps {
  selectedDate: dayjs.Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedDate: (date: dayjs.Dayjs | null) => void;
  selectedTimes: string[];
  setSelectedTimes: Dispatch<SetStateAction<string[]>>;
}

interface Schedule {
  date: string;
  time: string[];
}

const PossibleReservationTime: React.FC<PossibleReservationTimeProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTimes,
  setSelectedTimes,
}) => {
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const handleTimeSelect = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      if (selectedTimes.length < 2) {
        setSelectedTimes([...selectedTimes, time].sort());
      }
    }
  };

  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reservations/schedule/{petsitterId}`);
        const schedulesOnSelectedDate = response.data.find(
          (schedule: Schedule) => schedule.date === selectedDate?.format('YYYY-MM-DD'),
        );

        if (schedulesOnSelectedDate) setBookedTimes(schedulesOnSelectedDate.time);
        else setBookedTimes([]);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedDate) fetchBookedTimes();
  }, [selectedDate]);

  return (
    <MainContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
        <DemoContainer sx={{ paddingTop: 2 }} components={['DatePicker']}>
          <DatePicker
            label="날짜를 입력해주세요"
            format="YYYY-MM-DD"
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              setSelectedTimes([]);
            }}
            disablePast
            shouldDisableDate={disableSpecificDates}
          />
        </DemoContainer>

        {selectedDate && (
          <StyledAccordion>
            <AccordionSummary>시간을 선택해주세요</AccordionSummary>
            <AccordionDetails>
              <StyledButtonGroup color="primary" aria-label="outlined primary button group">
                {amTimeSlots.map((time) => {
                  const isDisabled =
                    (selectedDate &&
                      selectedDate.isSame(currentDate, 'day') &&
                      parseInt(time.split(':')[0]) <= currentDate.hour()) ||
                    bookedTimes.includes(time);
                  return (
                    <Button
                      key={time}
                      variant={selectedTimes.includes(time) ? 'contained' : 'outlined'}
                      onClick={() => handleTimeSelect(time)}
                      disabled={isDisabled}
                    >
                      {convertTo12Hour(time)}
                    </Button>
                  );
                })}
              </StyledButtonGroup>

              <Divider variant="middle" />

              <StyledButtonGroup color="primary" aria-label="outlined primary button group">
                {pmTimeSlots.map((time) => {
                  const isDisabled =
                    (selectedDate &&
                      selectedDate.isSame(currentDate, 'day') &&
                      parseInt(time.split(':')[0]) <= currentDate.hour()) ||
                    bookedTimes.includes(time);
                  return (
                    <Button
                      key={time}
                      variant={selectedTimes.includes(time) ? 'contained' : 'outlined'}
                      onClick={() => handleTimeSelect(time)}
                      disabled={isDisabled}
                    >
                      {convertTo12Hour(time)}
                    </Button>
                  );
                })}
              </StyledButtonGroup>
            </AccordionDetails>
          </StyledAccordion>
        )}
      </LocalizationProvider>
    </MainContainer>
  );
};

export default PossibleReservationTime;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 12px;
  flex-direction: column;
`;

const StyledButtonGroup = styled.div`
  flex-wrap: wrap;
  margin-bottom: 16px;
  text-align: center;

  & .MuiButton-root {
    width: calc((100% - (3 * 8px)) / 4);
    text-align: center;
    margin: 0 8px 16px 0;
  }

  &:last-of-type {
    margin-top: 16px;
  }
`;

const StyledAccordion = styled(Accordion)`
  margin-top: 16px;
`;
