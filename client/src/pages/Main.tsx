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

const PetsitterForm = styled.div`
  width: 360px;
  height: 216px;
  flex-shrink: 0;
  background-image: url(${process.env.PUBLIC_URL}/imgs/mainpetsitter.svg);
`;

const PetsitterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 74px;
  padding-right: 64px;
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.25);
`;

const PetButtonContainer = styled.div`
  padding-top: 4px;
  padding-left: 224px;
`;

const TrainButtonContainer = styled.div`
  padding-top: 4px;
  padding-left: 76px;
`;

const Adbox = styled.div`
  width: 360px;
  height: 110px;
  flex-shrink: 0;
  text-align: center;
  background: ${(props) => props.theme.lineColors.coolGray90};
`;

const AdText = styled.div`
  color: #424242;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  padding-top: 53px;
`;

const Procedure = styled.div`
  width: 360px;
  height: 186px;
  flex-shrink: 0;
`;

const TrainerForm = styled.div`
  width: 360px;
  height: 216px;
  flex-shrink: 0;
  background-image: url(${process.env.PUBLIC_URL}/imgs/mainTrainer.svg);
`;

const TrainerText = styled.div`
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.25);
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  padding-top: 88px;
  padding-left: 76px;
`;

const Main = () => {
  return (
    <MainContainer>
      <PetsitterForm>
        <PetsitterText>
          반려동물
          <br />
          케어 서비스
        </PetsitterText>
        <PetButtonContainer>
          <Button text="예약하기" link="/Reservation"></Button>
        </PetButtonContainer>
      </PetsitterForm>
      <Adbox>
        <AdText>업계 최고 케어 서비스, 펫밀리와 함께 하세요</AdText>
      </Adbox>
      <Procedure>
        <img src="/imgs/Procedure.svg" alt="Procedure" />
      </Procedure>
      <TrainerForm>
        <TrainerText>
          펫시터
          <br />
          돌봄의 시작
        </TrainerText>
        <TrainButtonContainer>
          <Button text="지원하기" link="/Mypage"></Button>
        </TrainButtonContainer>
      </TrainerForm>
    </MainContainer>
  );
};

export default Main;
