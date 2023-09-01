import { styled } from 'styled-components';

import { Link } from 'react-router-dom';
import Input from '../components/Input';

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
  justify-content: center;
  width: 240px;
  height: 100%;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
  gap: 12px;
`;

const LoginButton = styled.button`
  height: 32px;

  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.mainBlue};
  border: none;

  color: white;
  ${(props) => props.theme.fontSize.s16h24};
  &:hover {
    background-color: ${(props) => props.theme.colors.subBlue};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.darkBlue};
  }
`;

const GoogleOAuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  border: 1px solid ${(props) => props.theme.textColors.gray40};
  color: ${(props) => props.theme.textColors.gray60};
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 20px;
  background-color: white;

  &:hover {
    background-color: ${(props) => props.theme.textColors.primary};
  }

  &:active {
    background-color: ${(props) => props.theme.textColors.gray50};
  }

  div {
    color: ${(props) => props.theme.textColors.gray40};
    ${(props) => props.theme.fontSize.s16h24};
  }
`;

const LinkContainer = styled.div`
  margin-top: 12px;

  a {
    font-size: ${(props) => props.theme.fontSize.s14h21};
    text-decoration-line: none;
  }
`;

const Login = () => {
  return (
    <MainContainer>
      <LoginContainer>
        <img src="/imgs/Logo.svg" alt="logo" width="150px" height="48px" />
        <InputContainer>
          <Input type="text" label="아이디" />
          <Input type="password" label="비밀번호" />
        </InputContainer>
        <ButtonContainer>
          <LoginButton>로 그 인</LoginButton>
          <GoogleOAuthButton>
            <img src="/imgs/GoogleLogo.svg" alt="google logo" width="24"></img>
            <div>Sign in with Google</div>
          </GoogleOAuthButton>
        </ButtonContainer>
        <LinkContainer>
          <Link to="/signup">회원가입하기</Link>
        </LinkContainer>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
