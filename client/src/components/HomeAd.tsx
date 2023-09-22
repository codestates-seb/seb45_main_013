import styled from 'styled-components';

const HomeAd = () => {
  return (
    <AdContainer>
      <GifContainer src="/imgs/HomeAd.gif" alt="ad" />
      <TextContainer>
        <Image src="/imgs/CatsAndDogs.png" alt="Image" />
        <TextWrapper>
          <InfoText>딩동~</InfoText>
          <AdText>펫시터 방문 케어 서비스</AdText>
        </TextWrapper>
        <AdText color="#279eff">We&apos;re Petmily!</AdText>
      </TextContainer>
    </AdContainer>
  );
};

const AdContainer = styled.div`
  display: flex;

  width: 100%;
  height: auto;
  justify-content: space-around;
  margin-top: 24px;
`;

const Image = styled.img`
  width: 80px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 36px;
  gap: 24px;
`;

const AdText = styled.div`
  color: ${(props) => props.color || 'black'};
  font-size: 18px;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const InfoText = styled.div`
  color: #a9a9a9;
  font-size: 14px;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;
const GifContainer = styled.img`
  width: 300px;
`;

export default HomeAd;
