import styled from 'styled-components';
import { ErrorMessage, SubmitButtonStyle } from './Login';
import GoogleOAuthButton from '../components/buttons/OAuthButton';
import UploadProfileImg from '../components/UploadProfileImg';
import { useForm } from 'react-hook-form';

interface IFormSignpInputs {
  name: string;
  phoneNumber: number;
  address: string;
  email: string;
  displayName: string;
  password: string;
  passwordConfirm: string;
}

const Signup = () => {
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignpInputs>();
  console.log(errors);
  const onSubmit = (data: IFormSignpInputs) => {
    console.log(data);
  };
  return (
    <MainContainer>
      <SignupContainer>
        <TitleContainer>
          <div>We&apos;re Petmily!</div>
          <div>회원가입</div>
        </TitleContainer>
        <ImgContainer>
          <UploadProfileImg />
        </ImgContainer>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <SignupInputStyle
              placeholder="이름"
              type="text"
              {...register('name', { required: true })}
              error={errors.name?.message}
            ></SignupInputStyle>
            {errors.name?.message === '' && <ErrorMessage>이름을 입력해주세요.</ErrorMessage>}
          </div>
          <div>
            <SignupInputStyle
              placeholder="연락처"
              {...register('phoneNumber', { required: true })}
              error={errors.phoneNumber?.message}
            ></SignupInputStyle>
            {errors.phoneNumber?.message === '' && <ErrorMessage>연락처를 입력해주세요.</ErrorMessage>}
          </div>
          <div>
            <SignupInputStyle
              placeholder="주소"
              {...register('address', { required: true })}
              error={errors.address?.message}
            ></SignupInputStyle>
            {errors.address?.message === '' && <ErrorMessage>이름을 입력해주세요.</ErrorMessage>}
          </div>
          <div>
            <SignupInputStyle
              placeholder="이메일"
              type="email"
              {...register('email', { required: true })}
              error={errors.email?.message}
            ></SignupInputStyle>
            {errors.email?.message === '' && <ErrorMessage>이름을 입력해주세요.</ErrorMessage>}
          </div>
          <div>
            <SignupInputStyle
              placeholder="닉네임"
              {...register('displayName', { required: true })}
              error={errors.displayName?.message}
            ></SignupInputStyle>
            {errors.displayName?.message === '' && <ErrorMessage>이름을 입력해주세요.</ErrorMessage>}
          </div>
          <div>
            <SignupInputStyle
              placeholder="비밀번호"
              type="password"
              {...register('password', { required: true })}
              error={errors.password?.message}
            ></SignupInputStyle>
            {errors.password?.message === '' && <ErrorMessage>이름을 입력해주세요.</ErrorMessage>}
          </div>
          <div>
            <SignupInputStyle
              placeholder="비밀번호 확인"
              type="password"
              {...register('passwordConfirm', { required: true })}
              error={errors.passwordConfirm?.message}
            ></SignupInputStyle>
            {errors.passwordConfirm?.message === '' && <ErrorMessage>이름을 입력해주세요.</ErrorMessage>}
          </div>
          <ButtonContainer>
            <SubmitButtonStyle type="submit">펫밀리 등록</SubmitButtonStyle>
            <GoogleOAuthButton>Sign up with Google</GoogleOAuthButton>
          </ButtonContainer>
        </InputForm>
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
  top: 10%;
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

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SignupInputStyle = styled.input<{ error: string | undefined }>`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.error === '' ? props.theme.colors.mainBlue : props.theme.lineColors.coolGray80)};
  padding: 8px;
  ${(props) => props.theme.fontSize.s14h21}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
