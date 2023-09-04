import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GoogleOAuthButton from '../components/buttons/OAuthButton';

const Login = () => {
  return (
    <MainContainer>
      <LoginContainer>
        <img src="/imgs/Logo.svg" alt="logo" width="150px" height="48px" />
        <InputContainer>
          <LoginInputStyle placeholder="아이디" />
          <LoginInputStyle type="password" placeholder="비밀번호" />
        </InputContainer>
        <ButtonContainer>
          <SubmitButtonStyle>로 그 인</SubmitButtonStyle>
          <GoogleOAuthButton>Log in with Google</GoogleOAuthButton>
        </ButtonContainer>
        <LinkContainer>
          <Link to="/signup">회원가입하기</Link>
        </LinkContainer>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: white;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 25%;
  width: 240px;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
  gap: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
  gap: 12px;
`;

export const SubmitButtonStyle = styled.button`
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.mainBlue};
  border: none;
  color: white;
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  &:hover {
    background-color: ${(props) => props.theme.colors.subBlue};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.darkBlue};
    box-shadow: ${(props) => props.theme.shadow.inset};
  }
`;

const LinkContainer = styled.div`
  margin-top: 12px;

  a {
    font-size: ${(props) => props.theme.fontSize.s14h21};
    text-decoration-line: none;
  }
`;

const LoginInputStyle = styled.input`
  width: 100%;
  height: 32px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.mainBlue};
  ${(props) => props.theme.fontSize.s14h21};
`;
