import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

interface PossibleReservationTimeProps {
  selectedDate: dayjs.Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedDate: (date: dayjs.Dayjs | null) => void;
  selectedTimes: string[];
  setSelectedTimes: Dispatch<SetStateAction<string[]>>;
}

const PossibleReservationTime: React.FC<PossibleReservationTimeProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTimes,
  setSelectedTimes,
}) => {
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [possibleTimeStart, setPossibleTimeStart] = useState<number>(0); // 펫시터 가능시간
  const [possibleTimeEnd, setPossibleTimeEnd] = useState<number>(24); // 펫시터 가능시간
  const [possibleDaysOfWeek, setPossibleDaysOfWeek] = useState<number[]>([]); // 펫시터 가능요일 (숫자 배열)
  const { petsitterId } = useParams();

  const disableSpecificDates = (date: dayjs.Dayjs) => {
    const dayOfWeek = date.day();

    return !possibleDaysOfWeek.includes(dayOfWeek);
  };

  function convertPossibleDayToNumbers(days: string[]): number[] {
    return days.map((day) => {
      switch (day) {
        case '월':
          return 1;
        case '화':
          return 2;
        case '수':
          return 3;
        case '목':
          return 4;
        case '금':
          return 5;
        case '토':
          return 6;
        default:
          // 일요일
          return 0;
      }
    });
  }

  const handleTimeSelect = (time: string) => {
    //12시간제로 변환 후 선택한 시간을 selectedTimes에 추가
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      if (selectedTimes.length < 2) {
        setSelectedTimes([...selectedTimes, time].sort());
      }
    }
  };

  type Schedule = {
    reservationId: number;
    reservationDate: string;
    reservationTimeStart: string;
    reservationTimeEnd: string;
    progress: string;
  };

  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reservations/schedule/${petsitterId}`);

        //HH:MM형태로 변환
        const schedulesOnSelectedDate = response.data.filter(
          (schedule: Schedule) => schedule.reservationDate === selectedDate?.format('YYYY-MM-DD'),
        );

        if (schedulesOnSelectedDate.length > 0) {
          const times: string[] = [];
          for (const schedule of schedulesOnSelectedDate) {
            const startHour = parseInt(schedule.reservationTimeStart.slice(0, 2));
            let endHour = parseInt(schedule.reservationTimeEnd.slice(0, 2));

            // Add an extra half hour to the end time
            const endDate = new Date();
            endDate.setHours(endHour);
            endDate.setMinutes(30); // add extra 30 minutes
            endHour = endDate.getHours();

            for (let hour = startHour; hour <= endHour; hour++) {
              // <= instead of <
              times.push(`${hour.toString().padStart(2, '0')}:00`);
              if (hour !== endHour) {
                times.push(`${hour.toString().padStart(2, '0')}:30`);
              }
            }
          }

          setBookedTimes(times);

          // bookedTimes 배열 출력
        } else setBookedTimes([]);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedDate) fetchBookedTimes();
  }, [selectedDate]);

  useEffect(() => {
    const getpetsitterpossibleTime = async () => {
      try {
        const response = await axios.get(`${apiUrl}/members/petsitters/${petsitterId}`);

        // 펫시터 가능시간과 가능요일
        const { possibleTimeStart, possibleTimeEnd, possibleDay } = response.data;

        // HH:MM형태로 변환
        setPossibleTimeStart(parseInt(possibleTimeStart.slice(0, 2)));
        setPossibleTimeEnd(parseInt(possibleTimeEnd.slice(0, 2)));

        // 가능한 요일을 숫자 배열로 변환하여 저장
        setPossibleDaysOfWeek(convertPossibleDayToNumbers(Array.from(possibleDay)));
      } catch (error) {
        console.error('펫시터 정보가 제대로 들어오지 않았습니다');
      }
    };

    getpetsitterpossibleTime();
  }, []);

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
                  const [hour] = time.split(':');

                  // Disable if outside of possible times or if time is already booked
                  const isDisabled =
                    parseInt(hour) < possibleTimeStart ||
                    parseInt(hour) >= possibleTimeEnd ||
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
                  const [hour] = time.split(':');

                  // Disable if outside of possible times or if time is already booked
                  const isDisabled =
                    parseInt(hour) < possibleTimeStart ||
                    parseInt(hour) >= possibleTimeEnd ||
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
  flex-direction: column;
  width: 100%;
  margin: 12px;
`;

const StyledButtonGroup = styled.div`
  flex-wrap: wrap;
  margin-bottom: 16px;
  text-align: center;

  & .MuiButton-root {
    width: calc((100% - (3 * 8px)) / 4);
    margin: 0 8px 16px 0;
    text-align: center;
    white-space: nowrap;
  }

  &:last-of-type {
    margin-top: 16px;
  }
`;

const StyledAccordion = styled(Accordion)`
  margin-top: 16px;
`;
