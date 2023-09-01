import { styled } from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 52px);
  padding: 60px;
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
  margin-top: ${(props) => props.theme.spacing[32]};
  gap: ${(props) => props.theme.spacing[8]};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[8]};
  gap: 12px;
`;

const LinkContainer = styled.div`
  margin-top: 12px;

  a {
    font-size: ${(props) => props.theme.fontSizes.medium};
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
          <Button text="로 그 인" fontSize="16" />
          <Button text="Sign in with Google" usage="google" fontSize="16" />
        </ButtonContainer>
        <LinkContainer>
          <Link to="/signup">회원가입하기</Link>
        </LinkContainer>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
