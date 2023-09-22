import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setReservation, setPetsitterId, IReservation } from 'store/reservationSlice';
import axios from 'axios';

import { getCookieValue } from 'hooks/getCookie';
import { refreshAccessToken } from 'hooks/refreshAcessToken';
import { IUser } from 'store/userSlice';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Reviews from '@components/Reviews';
import PossibleReservationTime from '@components/PossibleReservationTime';
import dayjs from 'dayjs';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const NavItem = [
  {
    text: '가능한 예약 시간',
    link: '/possibleReservationTime',
  },
  {
    text: '이용 후기',
    link: '/reviews',
  },
];

const careerone = () => (
  <>
    <span>대표 경력&nbsp;&nbsp;&nbsp;&nbsp;</span>
    방문훈련 전문, 동물병원근무
  </>
);

const careertwo = () => (
  <>
    &nbsp;&nbsp;<span>전문 분야&nbsp;&nbsp;&nbsp;&nbsp;</span>
    공격성 교육 전문, 대형견 전문
  </>
);

const convertTo12Hour = (time: string) => {
  // 24시간 -> 12시간으로 변환
  const timeParts = time.split(':');
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  const period = hours >= 12 ? 'PM' : 'AM';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};

const PetsitterViewDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { petsitterId } = useParams();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState(NavItem[0].link);
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const [petsitterData, setPetsitterData] = useState<any>();

  const { isLogin, memberId, petsitterBoolean } = useSelector((state: IUser) => state.user);
  const { reservationDay, reservationTimeStart, reservationTimeEnd, address, petId, pets } = useSelector(
    (state: IReservation) => state.reservation,
  );

  const handleResetReservationClick = () => {
    setSelectedDates(null);
    setSelectedTimes([]);
  };

  const handleBookmarkClick = async () => {
    // 찜하기 버튼 클릭 시 동작
    const accessToken = getCookieValue('access_token');
    if (isLogin) {
      try {
        const response = await axios.patch(
          `${apiUrl}/members/favorite?petsitterId=${petsitterId}`,
          {}, //추가적인 데이터 없음
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setIsBookmarked(response.data.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          const response = await axios.patch(
            `${apiUrl}/members/favorite?petsitterId=${petsitterId}`,
            {}, //추가적인 데이터 없음
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            },
          );
          setIsBookmarked(response.data.isBookmarked);
        }
      } catch (refreshError) {
        console.error(refreshError);
      }
    }
  };

  const handleOnSubmitButtonClick = () => {
    // 선택된 날짜와 시간을 스토어에 저장
    dispatch(
      setReservation({
        reservationDay: selectedDates ? selectedDates.format('YYYY-MM-DD') : '',
        reservationTimeStart: selectedTimes.length > 0 ? selectedTimes[0] : '',
        reservationTimeEnd: selectedTimes.length > 0 ? selectedTimes[selectedTimes.length - 1] : '',
        address,
        petId,
        pets,
      }),
    );
    dispatch(setPetsitterId(petsitterId));

    navigate('/reservation/step3');
  };
  //펫시터 데이터 가져오기
  useEffect(() => {
    const fetchPetsitterData = async () => {
      if (petsitterId) {
        try {
          const response = await axios.get(`${apiUrl}/members/petsitters/${petsitterId}`);
          setPetsitterData(response.data);
        } catch (error) {
          console.error('데이터가 정상적으로 들어오지 못합니다');
        }
      }
    };

    fetchPetsitterData();
  }, [petsitterId]);
  //해당 펫시터가 찜한 펫시터인지 확인
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      const accessToken = getCookieValue('access_token');
      if (isLogin) {
        try {
          const response = await axios.get(`${apiUrl}/members/favoriteTrue?petsitterId=${petsitterId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setIsBookmarked(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        // 로그인이 되어있지 않은 경우에 대한 처리
        // ...
      }
    };

    fetchBookmarkStatus();
  }, [isLogin, petsitterId]);

  return (
    <MainContainer>
      <ImgContainer>
        {petsitterData?.photo ? (
          <img src={petsitterData?.photo.replace('https://bucketUrl', bucketUrl)} alt="펫시터 사진" />
        ) : (
          <DefaultImg src="/imgs/User.svg" alt="default img" />
        )}
      </ImgContainer>
      <CareablePetContainer>
        <CareablePet>
          {(petsitterData?.possiblePetType === 'PET_ALL' || petsitterData?.possiblePetType === 'PET_DOG') && (
            <img src="/icons/DogIcon.svg" alt="dogIcon" />
          )}
          {(petsitterData?.possiblePetType === 'PET_ALL' || petsitterData?.possiblePetType === 'PET_CAT') && (
            <img src="/icons/CatIcon.svg" alt="catIcon" />
          )}
        </CareablePet>
      </CareablePetContainer>
      <PetsitterTextContainer>
        <LogoImg src="/imgs/Logo.svg" alt="Logo" />
        <PetsitterName>{petsitterData?.name}</PetsitterName>
      </PetsitterTextContainer>
      <Introbox>
        <PetsitterIntroText>{petsitterData?.body}</PetsitterIntroText>
      </Introbox>
      <CareerContainer>
        <CareerText>{careerone()}</CareerText>
        <CareerText>{careertwo()}</CareerText>
      </CareerContainer>
      <BookmarkContainer>
        <RatingImg src="/imgs/Star.svg" alt="ratingImg" />
        {petsitterData?.star}
        <MiddleLineImg src="/imgs/MiddleLine.svg" alt="middleLine" />
        <StyledButton variant="text" onClick={handleBookmarkClick}>
          <BookmarkIcon src={isBookmarked ? '/icons/Bookmark.svg' : '/imgs/BeforeBookmark.svg'} alt="bookmarkIcon" />
          찜하기
        </StyledButton>
      </BookmarkContainer>

      <ViewDetailsContainer>
        <TabButtonsContainer>
          {NavItem.map((nav) => (
            <NavBarButton key={nav.text} isActive={activeTab === nav.link} onClick={() => setActiveTab(nav.link)}>
              {nav.text}
            </NavBarButton>
          ))}
        </TabButtonsContainer>
        <TabContentContainer>
          {activeTab === '/possibleReservationTime' && (
            <PossibleReservationTime
              selectedDate={selectedDates}
              setSelectedDate={setSelectedDates}
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
            />
          )}
          {activeTab === '/reviews' && <Reviews />}
        </TabContentContainer>
        {selectedDates && selectedTimes && (
          <ConfirmationSection>
            <Divider>선택 내역</Divider>
            <ConfirmationDate>
              예약 날짜: {selectedDates ? selectedDates.format('YYYY-MM-DD') : '날짜를 선택하세요'}
            </ConfirmationDate>
            {selectedTimes.length > 0 && (
              <>
                <ConfirmationTime>예약 시작 시간: {convertTo12Hour(selectedTimes[0])}</ConfirmationTime>
                <ConfirmationTime>
                  예약 종료 시간: {convertTo12Hour(selectedTimes[selectedTimes.length - 1])}
                </ConfirmationTime>
              </>
            )}
            <StyledCancelButton variant="outlined" color="error" onClick={handleResetReservationClick}>
              취소
            </StyledCancelButton>
          </ConfirmationSection>
        )}
      </ViewDetailsContainer>
      <ButtonContainer>
        <StyledSubmitButton
          type="submit"
          disabled={!selectedDates || selectedTimes.length === 0}
          onClick={handleOnSubmitButtonClick}
        >
          다음단계
        </StyledSubmitButton>
      </ButtonContainer>
    </MainContainer>
  );
};

export default PetsitterViewDetails;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background-color: #fefdff;
`;

const ImgContainer = styled.div`
  position: absolute;
  width: 100%;
  top: -64px;
  /* border-radius: 0px 0px 110px 0px; */
  border-bottom-left-radius: 50% 15%;
  border-bottom-right-radius: 50% 15%;
  height: 280px;
  overflow: hidden;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CareablePetContainer = styled.div`
  top: -64px;
  right: 0;
  padding: 20px;
  position: absolute;
`;

const PetsitterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  margin-top: 144px;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 21px;
`;

const CareablePet = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const PetsitterName = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 28px;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const Introbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PetsitterIntroText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 4; // 3줄로 보여주는 것으로 제한
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-y: auto;
  max-width: 70%;
  max-height: 200px;
  margin-top: 40px;
  color: ${(props) => props.theme.textColors.gray50};
  font-size: ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
`;

const CareerContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const CareerText = styled.div`
  font-size: ${(props) => props.theme.fontSize.s14h21};

  span {
    font-size: ${(props) => props.theme.fontSize.s18h27};
    font-weight: ${(props) => props.theme.fontWeights.extrabold};
    color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const BookmarkContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 12px 0 12px;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
  color: ${(props) => props.theme.textColors.gray00};
  font-size: ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const RatingImg = styled.img`
  width: 18px;
  height: 18px;
  margin: 0 32px 0 0;
`;

const MiddleLineImg = styled.img`
  margin: 0 18px 0 34px;
`;

const BookmarkIcon = styled.img`
  width: 18px;
  height: 18px;
  margin: 0 18px 0 8px;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: space-around;
  gap: 12px;
`;

const ViewDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  margin: 16px 12px 12px 12px;
  padding-top: 16px;
  /* min-height: 320px; */
  box-shadow: ${(props) => props.theme.shadow.dp01};
  overflow: visible;
`;

const NavBarButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  flex: 1;
  border: none;
  background-color: white;
  font-weight: ${(props) => (props.isActive ? props.theme.fontWeights.extrabold : props.theme.fontWeights.bold)};
  color: ${(props) => (props.isActive ? 'black' : props.theme.textColors.gray30)};
  border-bottom: ${(props) => (props.isActive ? `2px solid ${props.theme.colors.mainBlue}` : null)};
  padding-bottom: 36px;
  margin-bottom: ${(props) => (props.isActive ? '-2px' : '0px')};
  ${(props) => props.theme.fontSize.s14h21};
  height: 16%;
`;

const TabButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabContentContainer = styled.div`
  display: flex;
  padding: 0 12px 12px 12px;
`;

const ConfirmationSection = styled.div`
  padding: 16px;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  border-radius: 0 0 8px 8px;
`;

const ConfirmationDate = styled.div`
  margin-top: 12px;
  margin-bottom: 8px;
`;

const ConfirmationTime = styled.div`
  margin-bottom: 8px;
`;

const StyledCancelButton = styled(Button)``;

const ButtonContainer = styled.div`
  margin: 0 24px 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSubmitButton = styled.button`
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

const DefaultImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColors.primary};
`;
