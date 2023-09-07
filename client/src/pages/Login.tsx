import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import GoogleOAuthButton from '../components/buttons/OAuthButton';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'modules/userSlice';

interface IFormLoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInputs>();

  const onSubmit = async (data: IFormLoginInputs) => {
    setIsLoginLoading(true);
    const { email, password } = data;
    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, { email, password });
      document.cookie = `access_token=${data.accessToken}; path=/;`;
      document.cookie = `refresh_token=${data.refreshToken}; path=/;`;

      dispatch(login());
      navigate('/');
    } catch (error: any) {
      console.log(error);
      if (error.response.data.status === 400) {
        for (let i = 0; i < error.response.data.length; i++) {}
      }
    }
    setIsLoginLoading(false);
  };

  return (
    <MainContainer>
      <LoginContainer onSubmit={handleSubmit(onSubmit)}>
        <img src="/imgs/Logo.svg" alt="logo" width="150px" height="48px" />
        <InputForm>
          <div>
            <LoginInputStyle
              type="text"
              placeholder="아이디"
              {...register('email', { required: true })}
              error={errors.email?.type}
            />
            {errors.email?.type === '' && <ErrorMessage>아이디를 입력해주세요.</ErrorMessage>}
          </div>
          <div>
            <LoginInputStyle
              type="password"
              placeholder="비밀번호"
              {...register('password', { required: true })}
              error={errors.password?.message}
            />
            {errors.password?.message === '' && <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>}
          </div>
          <div style={{ position: 'relative' }}>
            <SubmitButtonStyle type="submit">로 그 인</SubmitButtonStyle>
            {isLoginLoading && (
              <LoadingContainer>
                <Spinner />
              </LoadingContainer>
            )}
          </div>
          <GoogleOAuthButton>Log in with Google</GoogleOAuthButton>
        </InputForm>
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

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
  gap: 12px;
`;

export const SubmitButtonStyle = styled.button`
  margin-top: 12px;
  height: 32px;
  width: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.mainBlue};
  border: none;
  color: white;
  ${(props) => props.theme.fontSize.s16h24};
  font-family: inherit;
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
    color: ${(props) => props.theme.colors.mainBlue};
    font-size: ${(props) => props.theme.fontSize.s14h21};
    text-decoration-line: none;
  }
`;

const LoginInputStyle = styled.input<{ error: string | undefined }>`
  width: 100%;
  height: 32px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.error === 'required' ? props.theme.colors.mainBlue : props.theme.lineColors.coolGray80)};
  ${(props) => props.theme.fontSize.s14h21};
`;

export const ErrorMessage = styled.p`
  margin-top: 4px;
  padding-left: 4px;
  color: ${(props) => props.theme.colors.paleBlue};
  font-size: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 19px;
  left: 12px;
  width: 18px;
  height: 18px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid rgb(255 255 255 / 60%);
  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;
  border-top: 2px solid #fff;
`;
