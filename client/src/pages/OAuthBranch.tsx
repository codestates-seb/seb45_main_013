import styled from 'styled-components';

const OAuthBranch = () => {
  return (
    <MainContainer>
      <ImgContainer>
        <Image src="/imgs/Signupforclient.png" alt="보호자로 가입하기"></Image>
        <Image src="/imgs/Signupforpetsitter.png" alt="펫시터로 가입하기"></Image>
      </ImgContainer>
    </MainContainer>
  );
};
export default OAuthBranch;

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Image = styled.img``;
