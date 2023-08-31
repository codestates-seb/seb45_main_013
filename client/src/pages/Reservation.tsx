import { styled } from 'styled-components';
import Button from '../components/Button';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-top: 0;
`;

const ReservationContainer = styled.div`
  height: 359px;
`;

const StatusContainer = styled.div`
  display: flex;
  width: 360px;
  height: 48px;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 19px 28px 0px 28px;
  background-color: #f5f5f5;
`;

const StatusText = styled.h3`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const ImgContainer = styled.div``;

const StatusNum = styled.div`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.textColors.gray60};
`;

const WhenText = styled.div`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding-top: 38px;
  padding-right: 167px;
`;

const WhenInput = styled.div``;

const WhereText = styled.div`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding-top: 38px;
  padding-right: 167px;
`;

const WhereInput = styled.div``;

const TimeWrap = styled.div`
  display: flex;
`;

const CheckInText = styled.div`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding-top: 38px;
  padding-right: 167px;
`;

const CheckOutText = styled.div`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const CarePetText = styled.div`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const CarePetImg = styled.div``;

const RequestText = styled.div`
  margin: 36px 287px 0px 36px;
  white-space: nowrap;
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const RequestInput = styled.div``;

const ContactText = styled.div`
  font-family: ${(props) => props.theme.fonts.join(', ')};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const RequestContainer = styled.div`
  width: 360px;
  height: 229px;
  flex-shrink: 0;
  border-top: 0.5px solid #c9c9c9;
  border-bottom: 0.5px solid #c9c9c9;
  background: rgba(255, 255, 255, 0.71);
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 330px;
  height: 32px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding-top: 37px;
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
