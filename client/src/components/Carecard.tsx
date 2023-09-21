import { IUser } from 'store/userSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { SyntheticEvent } from 'react';
import { refreshAccessToken } from 'hooks/refreshAcessToken';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const CareCard = ({ reservation }: any) => {
  const navigate = useNavigate();
  const accessToken = getCookieValue('access_token');

  const { memberId, petsitterBoolean } = useSelector((state: IUser) => state.user);

  const [year, month, day] = reservation.reservationDay.split('-');

  const onErrorImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/imgs/DefaultUser.svg';
  };

  // 펫시터 예약 확정 (예약 신청 상태)
  const handleSitterApproval = async () => {
    try {
      const response = await axios.patch(`${apiUrl}/reservations/${reservation.reservationId}/confirm`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        alert('예약이 확정되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 펫시터 예약 취소 (예약 확정 상태)
  const handleSitterCancel = async () => {
    try {
      const response = await axios.patch(`${apiUrl}/reservations/${reservation.reservationId}/petsittercancel`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
        alert('예약이 취소되었습니다.');
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 404) {
        alert(error.response.data.message);
      }
      if (error.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            const response = await axios.patch(`${apiUrl}/reservations/${reservation.reservationId}/petsittercancel`, {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            });
            if (response.status === 200) {
              alert('예약이 취소되었습니다.');
              window.location.reload();
            }
          }
        } catch (error) {}
      }
    }
  };

  // 고객이 신청한거 취소 (access token 재발급 완료)
  const handleClientCancel = async () => {
    try {
      const response = await axios.patch(
        `${apiUrl}/reservations/${reservation.reservationId}/membercancel`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      if (response.status === 200) {
        alert('예약이 취소 되었습니다.');
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
      if (error.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            const response = await axios.patch(
              `${apiUrl}/reservations/${reservation.reservationId}/membercancel`,
              {},
              {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              },
            );
            if (response) {
              alert('예약이 취소 되었습니다.');
              window.location.reload();
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <CareCardContainer>
      <FirstLine>
        <div>
          <PetsitterContainer>
            <PetsitterInfo>
              <div>{petsitterBoolean ? reservation.memberName : reservation.petsitterName}</div>
              <div>{petsitterBoolean ? '고객님' : '펫시터님'}</div>
            </PetsitterInfo>
          </PetsitterContainer>
          <PetInfo>
            <label htmlFor="petName">맡기실 펫 :</label>
            <PetName id="petName">
              {reservation.pets.map((pet: any) => (
                <div key={pet.petId}>{pet.name}</div>
              ))}
            </PetName>
          </PetInfo>
          <PlaceTimeWrapper>
            <Wrapper>
              <label htmlFor="address">주소 :</label>
              <div id="address">{reservation.address}</div>
            </Wrapper>
            <Wrapper>
              <label htmlFor="time">예약시간 :</label>
              <div id="time">
                {year.split('20')[1]}.{month}.{day} {reservation.reservationTimeStart.slice(0, 5)} ~{' '}
                {year.split('20')[1]}.{month}.{day} {reservation.reservationTimeEnd.slice(0, 5)}
              </div>
            </Wrapper>
          </PlaceTimeWrapper>
        </div>
        {reservation.petsitterPhoto ? (
          <Photo
            src={reservation.petsitterPhoto.replace('https://bucketUrl', bucketUrl)}
            alt="petsitter photo"
            onError={onErrorImg}
          />
        ) : (
          <DefaultImg src="/imgs/User.svg" alt="default img" />
        )}
      </FirstLine>
      <SecondLine>
        <ButtonContainer>
          {petsitterBoolean && reservation.progress === 'RESERVATION_REQUEST' ? (
            <>
              <ActiveButton onClick={handleSitterApproval}>예약확정</ActiveButton>
            </>
          ) : petsitterBoolean && reservation.progress === 'RESERVATION_CONFIRMED' ? (
            <>
              <InActiveButton>예약확정</InActiveButton>
              <ActiveButton onClick={handleSitterCancel}>취소하기</ActiveButton>
            </>
          ) : petsitterBoolean && reservation.progress === 'RESERVATION_CANCELLED' ? (
            <>
              <InActiveButton>취소된 예약</InActiveButton>
            </>
          ) : petsitterBoolean && reservation.progress === 'FINISH_CARING' ? (
            <>
              <ActiveLink to={`/cares/${reservation.reservationId}/journal`}>케어일지</ActiveLink>
            </>
          ) : null}
          {!petsitterBoolean && reservation.progress == 'RESERVATION_REQUEST' ? (
            <>
              <InActiveButton>예약신청</InActiveButton>
              <ActiveButton onClick={handleClientCancel}>취소하기</ActiveButton>
            </>
          ) : !petsitterBoolean && reservation.progress === 'RESERVATION_CONFIRMED' ? (
            <>
              <InActiveButton>예약확정</InActiveButton>
            </>
          ) : !petsitterBoolean && reservation.progress === 'RESERVATION_CANCELLED' ? (
            <>
              <InActiveButton>취소된 예약</InActiveButton>
            </>
          ) : !petsitterBoolean && reservation.progress === 'FINISH_CARING' ? (
            <>
              {reservation.journalId ? (
                <ActiveLink to={`/cares/journal/${reservation.journalId}`}>케어일지</ActiveLink>
              ) : (
                <InActiveButton>케어일지</InActiveButton>
              )}
              <ActiveLink to={`/cares/${reservation.reservationId}/review`}>후기</ActiveLink>
            </>
          ) : null}
        </ButtonContainer>
      </SecondLine>
    </CareCardContainer>
  );
};
export default CareCard;

const CareCardContainer = styled.div`
  padding: 12px;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PetsitterContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Photo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const DefaultImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColors.primary};
`;

const PetsitterInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-end;

  div:nth-child(1) {
    ${(props) => props.theme.fontSize.s16h24}
  }

  div:nth-child(2) {
    ${(props) => props.theme.fontSize.s12h18}
    color:${(props) => props.theme.textColors.gray40}
  }
`;

const PetInfo = styled.div`
  display: flex;
  gap: 4px;

  > label {
    ${({ theme }) => theme.fontSize.s14h21}
  }

  > div {
    ${({ theme }) => theme.fontSize.s14h21}
  }
`;

const PetName = styled.div`
  display: flex;
  ${({ theme }) => theme.fontSize.s12h18}
  gap: 8px;
`;

const PlaceTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > label {
    ${({ theme }) => theme.fontSize.s14h21}
  }

  > div {
    color: ${({ theme }) => theme.textColors.gray40};
    ${({ theme }) => theme.fontSize.s12h18}
  }
`;

const SecondLine = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const InActiveButton = styled.div`
  background-color: white;
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.mainBlue};
  border-radius: 4px;
  font-family: inherit;
  ${(props) => props.theme.fontSize.s14h21}
`;

const ActiveButton = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  border: none;
  ${({ theme }) => theme.fontSize.s14h21}
  font-family:inherit;

  &:hover {
    background-color: ${({ theme }) => theme.colors.subBlue};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: ${({ theme }) => theme.shadow.inset};
  }
`;

const ActiveLink = styled(Link)`
  color: white;
  cursor: pointer;
  ${({ theme }) => theme.fontSize.s14h21}
  background-color: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  padding: 4px 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.subBlue};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: ${({ theme }) => theme.shadow.inset};
  }
`;
