import { styled } from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';

const MainContainer = styled.div`
  height: calc(100vh - 52px);
  padding: 60px;

  background-color: white;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[32]};
  width: 100%;

  gap: ${(props) => props.theme.spacing[8]};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[12]};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[8]};
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
          <Button text="로 그 인" size="240" fontSize="16px" />
          <Button text="Sign in with Google" size="240" usage="google" fontSize="16px" />
        </ButtonContainer>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
