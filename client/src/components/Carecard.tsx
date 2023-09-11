import { IUser } from 'store/userSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const CareCard = ({ reservation }: any) => {
  const { memberId, petsitterBoolean } = useSelector((state: IUser) => state.user);

  const [year, month, day] = reservation.reservationDay.split('-');

  return (
    <CareCardContainer>
      <FirstLine>
        <div>
          <PetsitterContainer>
            <PetsitterInfo>
              <div>{petsitterBoolean ? reservation.name : reservation.petsitterName}</div>
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
        {reservation.photo ? (
          <img src={reservation.photo.replace(/https:\/\/bucketUrl/g, `${bucketUrl}`)} alt="img" />
        ) : (
          <ImgDiv />
        )}
      </FirstLine>
      <SecondLine>
        <ButtonContainer>
          {petsitterBoolean && reservation.progress === 'RESERVATION_REQUEST' ? (
            <>
              <ActiveButton>예약확정</ActiveButton>
            </>
          ) : petsitterBoolean && reservation.progress === 'RESERVATION_CONFIRMED' ? (
            <>
              <InActiveButton>예약확정</InActiveButton>
              <ActiveButton>취소하기</ActiveButton>
            </>
          ) : petsitterBoolean && reservation.progess === 'RESERVATION_FINISHING' ? (
            <>
              <ActiveButton>케어일지</ActiveButton>
            </>
          ) : null}
          {!petsitterBoolean && reservation.progress == 'RESERVATION_REQUEST' ? (
            <>
              <InActiveButton>예약신청</InActiveButton>
              <ActiveButton>취소하기</ActiveButton>
            </>
          ) : !petsitterBoolean && reservation.progess === 'RESERVATION_CONFIRM' ? (
            <>
              <InActiveButton>예약확정</InActiveButton>
            </>
          ) : !petsitterBoolean && reservation.progress === 'FINISH_CARING' ? (
            <>
              <ActiveButton>케어일지</ActiveButton>
              <ActiveLink to={`/cares/${memberId}/${reservation.reservationId}/review`}>후기</ActiveLink>
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
