import styled from 'styled-components';

const Home = () => {
  return (
    <HomeContainer>
      <AdContainer>
        <img src="/imgs/HomeTitleAd.svg" alt="Advertising" width="100%" />
      </AdContainer>
      <SearchInputContainer>
        <SearchInput placeholder="펫시터 검색" />
      </SearchInputContainer>
      <LinkContainer>
        <PetsitterLink>펫시터 보기</PetsitterLink>
        <PetsitterQnaLink>펫시터 Q&A</PetsitterQnaLink>
      </LinkContainer>
      <AdSubContainer>
        <AdSubText>{'첫 만남\n 50% 할인 쿠폰'}</AdSubText>
        <img src="/imgs/HomeSubAd.svg" alt="Advertising" />
      </AdSubContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  border: 1px solid black;
  background-color: #fefdff;
`;

const AdContainer = styled.a`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 92px 12px 0 12px;
`;

const SearchInputContainer = styled.div`
  margin: 16px 12px 0 12px;
  height: 28px;
`;

const SearchInput = styled.input`
  padding: 10px 0 10px 14px;
  ${(props) => props.theme.fontSize.s14h21};
  color: #a3a3a3;
  font-family: 'Noto Sans KR';
  font-weight: bold;
  border-radius: 8px;
  width: 100%;
  background-color: ${(props) => props.theme.lineColors.coolGray90};
  border: none;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: space-between;
  margin: 28px 12px 0 12px;
  /* margin-top: 20px; */
  gap: 12px;
  height: 67px;
  background-color: ${(props) => props.theme.colors.white};
`;

const PetsitterLink = styled.a`
  width: calc(100% - 162px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s18h27};
  box-shadow: 0px 10px 34px 0px rgba(39, 44, 86, 0.08);
`;

const PetsitterQnaLink = styled.a`
  width: calc(100% - 162px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR';
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s18h27};
  box-shadow: 0px 10px 34px 0px rgba(39, 44, 86, 0.08);
`;

const AdSubContainer = styled.div`
  margin: 24px 12px 0 12px;
  height: 64px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  padding-right: 24px;
  box-shadow: 0px 10px 34px 0px rgba(39, 44, 86, 0.08);
`;

const AdSubText = styled.div`
  ${(props) => props.theme.fontSize.s18h27};
  font-family: 'Noto Sans KR';
  font-weight: bold;
  padding-left: 24px;
  display: flex;
  align-items: center;
  white-space: pre-line;
`;

export default Home;
