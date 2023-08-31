import { styled } from 'styled-components';
import Button from '../components/Button';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 52px);

  background-color: white;
`;

const InputContainer = styled.form``;

const ButtonContainer = styled.div``;

const InputBox = styled.div``;
const LogoImg = styled.img`
  width: 150px;
  height: 48px;
`;

const Login = () => {
  return (
    <MainContainer>
      <LogoImg src="/imgs/Logo.svg" alt="logo" />
      <div>
        <InputContainer>
          <InputBox>
            <label></label>
            <input></input>
          </InputBox>
          <InputBox>
            <label></label>
            <input></input>
          </InputBox>
        </InputContainer>
        <ButtonContainer>
          <Button text="로 그 인"></Button>
          <button></button>
        </ButtonContainer>
      </div>
    </MainContainer>
  );
};

export default Login;
