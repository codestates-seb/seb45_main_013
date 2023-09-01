import { styled } from 'styled-components';

const MainContainer = styled.div`
  height: calc(100vh - 52px);
  background-color: white;
`;
const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 50px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
`;
const InputConatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[16]};
`;

const Signup = () => {
  return (
    <MainContainer>
      <SignupContainer>
        <TitleContainer>
          <div>We&apos;re Petmily!</div>
          <div>회원가입</div>
        </TitleContainer>
        <img src="/icons/photo.png" width="40px" alt="hello" />
        <InputConatiner></InputConatiner>
        <div>ButtonContainer</div>
      </SignupContainer>
    </MainContainer>
  );
};

export default Signup;
