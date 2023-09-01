import { styled } from 'styled-components';

import { Link } from 'react-router-dom';
import Input from '../components/Input';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
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
  margin-top: 8px;
  gap: 12px;
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
        <ButtonContainer></ButtonContainer>
        <LinkContainer>
          <Link to="/signup">회원가입하기</Link>
        </LinkContainer>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
