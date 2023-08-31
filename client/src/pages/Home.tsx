import { styled } from 'styled-components';
import Button from '../components/Button';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-top: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
  width: 360px;
  height: 288px;
  background-image: url(${process.env.PUBLIC_URL}/imgs/TitleImg.svg);
`;

const AdBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  width: 360px;
  height: 200px;
  margin: 48px auto 48px;
  gap: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 32px;
  flex-shrink: 0;
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-top: 32px;
  padding: ${(props) => props.theme.spacing[4]} ${(props) => props.theme.spacing[8]};
  border: none;
  border-radius: ${(props) => props.theme.spacing[12]};
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: #fff;
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 25%));
  &:hover {
    background-color: ${(props) => props.theme.colors.subBlue};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.darkBlue};
  }
`;

const TitleText = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xxLarge};
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const TitleSubText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  text-align: center;
  margin-top: 32px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.fonts.join(', ')};
`;

const PetsitterAdText = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xxLarge};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  padding-left: 24px;
  padding-top: 46px;
`;

const PetsitterAdSubText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  padding: 16px 0 0 24px;
  line-height: 1.3;
`;

const TrainerAdText = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xxLarge};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  padding-right: 24px;
  padding-top: 46px;
`;

const TrainerAdSubText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-family: ${(props) => props.theme.fonts.join(', ')};
  padding: 16px 24px 0 0;
  line-height: 1.3;
`;

const Home = () => {
  return (
    <HomeContainer>
      <TitleContainer>
        <TitleText>우리 아이, 24시 밀착케어</TitleText>
        <TitleSubText>
          보다 더 안전하게
          <br /> 가족의 마음으로 보답해드립니다
        </TitleSubText>
        <ButtonContainer>
          <Button text="펫시터 찾기" link="/login"></Button>
        </ButtonContainer>
      </TitleContainer>
      <AdBox>
        <TextContainer>
          <PetsitterAdText>
            펫시터가
            <br /> 집으로 와요!
          </PetsitterAdText>
          <PetsitterAdSubText>
            팻밀리에만 있는
            <br /> 방문케어 시스템으로
            <br /> 언제 어디서든 안심하고
            <br /> 펫시터를 불러보세요!
          </PetsitterAdSubText>
        </TextContainer>
        <img src="/imgs/AdvertisementImg.svg" alt="Ad" />
      </AdBox>
      <AdBox>
        <img src="/imgs/SecondAdvertisementImg.svg" alt="Ad" />
        <TextContainer>
          <TrainerAdText>
            훈련사의
            <br /> 체계적 교육!
          </TrainerAdText>
          <TrainerAdSubText>
            방문 훈련을 예약하고
            <br /> 우리 아이 성향 맞춤
            <br /> 솔루션을 받아보세요!
          </TrainerAdSubText>
        </TextContainer>
      </AdBox>
    </HomeContainer>
  );
};

export default Home;