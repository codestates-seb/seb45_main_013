import { IUser } from 'modules/userSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CareCard = ({ reservation }: any) => {
  console.log(reservation);
  const { petsitterBoolean } = useSelector((state: IUser) => state.login);

  const [year, month, day] = reservation.reservationDay.split('-');

  return (
    <CareCardContainer>
      <FirstLine>
        <div>
          <PetsitterContainer>
            <PetsitterInfo>
              <div>{reservation.name}</div>
              <div>{petsitterBoolean ? '펫시터님' : '고객님'}</div>
            </PetsitterInfo>
          </PetsitterContainer>
          <PetInfo>
            {reservation.pets.map((pet: any) => (
              <div key={pet.petId}>{pet.name}</div>
            ))}
          </PetInfo>
          <PlaceTimeWrapper>
            <div>{reservation.location}</div>
            <div>
              {year}.{month}.{day} {reservation.reservationTimeStart} ~ {year}.{month}.{day}{' '}
              {reservation.reservationTimeEnd}
            </div>
          </PlaceTimeWrapper>
        </div>
        <ImgDiv />
      </FirstLine>
      <SecondLine>
        {petsitterBoolean ? (
          // 펫시터 부분
          <ButtonContainer>
            <InActiveButton>예약신청</InActiveButton>
            <ActiveButton>취소하기</ActiveButton>
          </ButtonContainer>
        ) : (
          // 고객 부분
          <ButtonContainer>
            {reservation.progress === 'BEFORE_PETSITTER_SELECTION' ? (
              <>
                <InActiveButton>예약신청</InActiveButton>
                <ActiveButton>취소하기</ActiveButton>
              </>
            ) : reservation.progress === 'RESERVATION_REQUEST' ? (
              <InActiveButton>예약확정</InActiveButton>
            ) : (
              <>
                <ActiveButton>케어일지</ActiveButton>
                <ActiveButton>후기</ActiveButton>
              </>
            )}
          </ButtonContainer>
        )}
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

const ImgDiv = styled.div`
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
  > div {
    ${(props) => props.theme.fontSize.s12h18}
  }
`;

const PlaceTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    ${(props) => props.theme.fontSize.s12h18}
    color: ${(props) => props.theme.textColors.gray40}
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
  ${(props) => props.theme.fontSize.s14h21}
  font-family:inherit;
`;
