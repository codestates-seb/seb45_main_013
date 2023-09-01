import { styled } from 'styled-components';
import Button from '../components/buttons/LinkButton';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  background-color: white;
`;

const ReservationContainer = styled.div`
  height: 359px;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 360px;
  height: 48px;
  padding: 19px 28px 0;
  background-color: #f5f5f5;
  flex-shrink: 0;
`;

const StatusText = styled.h3`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const ImgContainer = styled.div``;

const StatusNum = styled.div`
  color: ${(props) => props.theme.textColors.gray60};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const WhenText = styled.div`
  padding-top: 38px;
  padding-right: 167px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const WhenInput = styled.div``;

const WhereText = styled.div`
  padding-top: 38px;
  padding-right: 167px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const WhereInput = styled.div``;

const TimeWrap = styled.div`
  display: flex;
`;

const CheckInText = styled.div`
  padding-top: 38px;
  padding-right: 167px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const CheckOutText = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const CarePetText = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const CarePetImg = styled.div``;

const RequestText = styled.div`
  margin: 36px 287px 0 36px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  white-space: nowrap;
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const RequestInput = styled.div``;

const ContactText = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s12s18};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const RequestContainer = styled.div`
  width: 360px;
  height: 229px;
  flex-shrink: 0;
  border-top: 0.5px solid #c9c9c9;
  border-bottom: 0.5px solid #c9c9c9;
  background: rgb(255 255 255 / 71%);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 32px;
  padding-top: 37px;
  flex-shrink: 0;
`;

const Reservation = () => {
  return (
    <MainContainer>
      <StatusContainer>
        <ImgContainer>
          <img src="/imgs/Arrow.svg" alt="back" />
        </ImgContainer>
        <StatusText>예약</StatusText>
        <StatusNum>1/2</StatusNum>
      </StatusContainer>
      <ReservationContainer>
        <WhenText>언제 펫시터가 필요하신가요?</WhenText>
        <img src="/imgs/inputone.svg" alt="inputone" />
        <WhenInput></WhenInput>
        <WhereText>어디로 방문할까요?</WhereText>
        <img src="/imgs/inputTwo.svg" alt="inputTwo" />
        <WhereInput></WhereInput>
        <TimeWrap>
          <CheckInText>체크인 시간</CheckInText>
          {/* <img src="/imgs/inputThree.svg" alt="inputThree" /> */}
          <CheckOutText>체크아웃 시간</CheckOutText>
          {/* <img src="/imgs/inputFour.svg" alt="inputFour" /> */}
        </TimeWrap>
        <CarePetText>맡기시는 반려동물</CarePetText>
        <img src="/imgs/inputPet.svg" alt="inputPet" />
        <img src="/imgs/inputPetTwo.svg" alt="inputPetTwo" />
        <img src="/imgs/Ellipse 116.svg" alt="Ellipse 116" />
        <CarePetImg></CarePetImg>
      </ReservationContainer>
      <RequestContainer>
        <RequestText>요청사항</RequestText>
        <img src="/imgs/inputRequest.svg" alt="Request" />
        <RequestInput></RequestInput>
        <ContactText>연락처</ContactText>
      </RequestContainer>
      <ButtonContainer>
        <Button text="다음단계" link="/Reservation"></Button>
      </ButtonContainer>
    </MainContainer>
  );
};

export default Reservation;
