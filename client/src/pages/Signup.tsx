import { styled } from 'styled-components';
import { SubmitButtonStyle } from './Login';
import GoogleOAuthButton from '../components/buttons/OAuthButton';

const Signup = () => {
  return (
    <MainContainer>
      <SignupContainer>
        <TitleContainer>
          <div>We&apos;re Petmily!</div>
          <div>회원가입</div>
        </TitleContainer>
        <ImgContainer>
          <img src="/icons/photo.png" width="40px" alt="hello" />
        </ImgContainer>
        <InputConatiner>
          <SignupInputStyle placeholder="이름"></SignupInputStyle>
          <SignupInputStyle placeholder="연락처"></SignupInputStyle>
          <SignupInputStyle placeholder="주소"></SignupInputStyle>
          <SignupInputStyle placeholder="이메일"></SignupInputStyle>
          <SignupInputStyle placeholder="닉네임"></SignupInputStyle>
          <SignupInputStyle placeholder="비밀번호" type="password"></SignupInputStyle>
          <SignupInputStyle placeholder="비밀번호 확인" type="password"></SignupInputStyle>
        </InputConatiner>
        <ButtonContainer>
          <SubmitButtonStyle>펫밀리 등록</SubmitButtonStyle>
          <GoogleOAuthButton>Sign up with Google</GoogleOAuthButton>
        </ButtonContainer>
      </SignupContainer>
    </MainContainer>
  );
};

export default Signup;

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: white;
`;
const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
  width: 260px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  div:nth-child(1) {
    ${(props) => props.theme.fontSize.s12h18}
  }

  div:nth-child(2) {
    ${(props) => props.theme.fontSize.s16h24}
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 36px;
`;

const InputConatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SignupInputStyle = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.lineColors.coolGray80};
  padding: 8px;
  ${(props) => props.theme.fontSize.s14h21}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  gap: 16px;
`;
