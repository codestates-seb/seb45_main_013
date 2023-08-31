import { styled } from 'styled-components';
import Input from '../components/Input';

const MainContainer = styled.div`
  height: calc(100vh - 52px);
  background-color: white;
`;
const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  height: 100%;
`;

const TitleContainer = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
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
        <img src="/icons/photo.png" width="40px"></img>
        <InputConatiner>
          <Input label="이름" />
          <Input label="연락처" />
          <Input label="주소" />
          <Input label="이메일" />
          <Input label="닉네임" />
          <Input label="비밀번호" />
          <Input label="비밀번호 확인" />
        </InputConatiner>
        <div>ButtonContainer</div>
      </SignupContainer>
    </MainContainer>
  );
};

export default Signup;
