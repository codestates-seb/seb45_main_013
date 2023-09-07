import styled, { keyframes } from 'styled-components';
import { ErrorMessage, SubmitButtonStyle } from './Login';
import GoogleOAuthButton from '../components/buttons/OAuthButton';
// import UploadProfileImg from '../components/UploadProfileImg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Modal, Sheet } from '@mui/joy';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IFormSignpInputs {
  name: string;
  phone: number;
  address: string;
  detailAddress: string;
  email: string;
  nickName: string;
  password: string;
  passwordConfirm: string;
  petsitterBoolean: boolean;
}

const Signup = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const naviagate = useNavigate();
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormSignpInputs>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

  const onToggleModal = () => {
    setIsModalOpen(true);
  };

  const handleComplete = (data: any) => {
    // 우편번호 저장
    setZonecode(data.zonecode);
    // 시.도 저장
    setSido(data.sido);
    // 구.군 저장
    setSigugu(data.sigungu.length > 3 ? data.sigungu.split('').splice(0, 3).join('') : data.sigungu);
    // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    const splitAddress = data.address.split(' ').splice(2).join(' ');
    if (data) {
      clearErrors('address');
    }
    setRemainAddress(splitAddress);
    setIsModalOpen(false);
  };

  const onSubmit = async (data: IFormSignpInputs) => {
    setIsSignupLoading(true);

    const { name, phone, address, detailAddress, email, nickName, password, petsitterBoolean } = data;

    if (data.password !== data.passwordConfirm) {
      setError('password', { type: 'dismatch', message: '비밀번호가 서로 다릅니다.' });
      setError('passwordConfirm', { type: 'dismatch', message: '비밀번호가 서로 다릅니다.' });
      setIsSignupLoading(false);
      return;
    }

    try {
      const data = await axios.post(`${apiUrl}/members`, {
        name,
        phone,
        address: `${address} ${detailAddress}`,
        email,
        nickName,
        password,
        petsitterBoolean,
      });
      if (data.status === 200) {
        naviagate('/login');
      }
    } catch (error: any) {
      const { fieldErrors } = error.response.data;

      if (error?.response.status === 400) {
        for (let i = 0; i < fieldErrors.length; i++) {
          if (fieldErrors[i].field === 'name') {
            setError('name', { type: 'serverError', message: fieldErrors[i].reason });
          } else if (fieldErrors[i].field === 'password') {
            setError('password', { type: 'serverError', message: fieldErrors[i].reason });
          } else if (fieldErrors[i].field === 'phone') {
            setError('phone', { type: 'serverError', message: fieldErrors[i].reason });
          } else if (fieldErrors[i].field === 'nickName') {
            setError('nickName', { type: 'serverError', message: fieldErrors[i].reason });
          } else if (fieldErrors[i].field === 'email') {
            setError('email', { type: 'serverError', message: fieldErrors[i].reason });
          } else if (fieldErrors[i].field === 'address') {
            setError('address', { type: 'serverError', message: fieldErrors[i].reason });
          }
        }
      }
    }
    setIsSignupLoading(false);
  };

  return (
    <MainContainer>
      <SignupContainer>
        <TitleContainer>
          <div>We&apos;re Petmily!</div>
          <div>회원가입</div>
        </TitleContainer>
        <ImgContainer>{/* <UploadProfileImg /> */}</ImgContainer>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <SignupInputStyle
              placeholder="이름"
              type="text"
              {...register('name', { required: true })}
              error={errors.name?.type}
            ></SignupInputStyle>
            {errors.name?.type === 'required' ? (
              <ErrorMessage>이름을 입력해주세요.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <SignupInputStyle
              placeholder="연락처"
              {...register('phone', { required: true })}
              error={errors.phone?.type}
            ></SignupInputStyle>
            {errors.phone?.type === 'required' ? (
              <ErrorMessage>연락처를 입력해주세요.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors.phone?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <SignupInputStyle
              placeholder="주소"
              value={zonecode ? `${zonecode} ${sido} ${sigungu} ${remainAddress}` : ''}
              {...register('address', { required: true })}
              error={errors.address?.type}
              onClick={onToggleModal}
              onKeyDown={onToggleModal}
            ></SignupInputStyle>
            {errors.address?.type === 'required' ? (
              <ErrorMessage>주소를 입력해주세요.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors.address?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <SignupInputStyle
              placeholder="상세주소"
              {...register('detailAddress', { required: true })}
              error={errors.detailAddress?.type}
            ></SignupInputStyle>
            {errors.detailAddress?.type === 'required' ? (
              <ErrorMessage>상세주소를 입력해주세요.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors.detailAddress?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <SignupInputStyle
              placeholder="이메일"
              type="email"
              {...register('email', { required: true })}
              error={errors.email?.type}
            ></SignupInputStyle>
            {errors.email?.type === 'required' ? (
              <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <SignupInputStyle
              placeholder="닉네임"
              {...register('nickName', { required: true })}
              error={errors.nickName?.type}
            ></SignupInputStyle>
            {errors.nickName?.type === 'required' ? (
              <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors.nickName?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <SignupInputStyle
              placeholder="비밀번호"
              type="password"
              {...register('password', { required: true })}
              error={errors.password?.type}
            ></SignupInputStyle>
            {errors.password?.type === 'required' ? (
              <ErrorMessage>비밀번호를 입력해주세요</ErrorMessage>
            ) : (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <SignupInputStyle
              placeholder="비밀번호 확인"
              type="password"
              {...register('passwordConfirm', { required: true })}
              error={errors.passwordConfirm?.type}
            ></SignupInputStyle>
            {errors.passwordConfirm?.type === 'required' ? (
              <ErrorMessage>비밀번호 확인을 입력해주세요</ErrorMessage>
            ) : errors.passwordConfirm?.type === 'dismatch' || errors.passwordConfirm?.type === 'serverError' ? (
              <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
            ) : null}
          </div>
          <CheckBoxWrapper>
            <CheckBoxLabel htmlFor="isPetsitter">펫시터로 가입하기</CheckBoxLabel>
            <input type="checkbox" id="isPetsitter" {...register('petsitterBoolean')} />
          </CheckBoxWrapper>
          <ButtonContainer>
            <div style={{ position: 'relative' }}>
              <SubmitButtonStyle type="submit">펫밀리 등록</SubmitButtonStyle>
              {isSignupLoading && (
                <LoadingContainer>
                  <Spinner />
                </LoadingContainer>
              )}
            </div>
            <GoogleOAuthButton>Sign up with Google</GoogleOAuthButton>
          </ButtonContainer>
        </InputForm>
      </SignupContainer>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Sheet sx={{ width: '360px;' }}>
            <DaumPostcode onComplete={handleComplete} />
          </Sheet>
        </Modal>
      )}
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
  width: 280px;
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
  border: 1px solid
    ${(props) =>
      props.error === 'required' || props.error === 'dismatch' || props.error === 'serverError'
        ? props.theme.colors.mainblue
        : props.theme.linecolors.coolgray80};
  padding: 8px;
  ${(props) => props.theme.fontSize.s14h21}
  font-family: inherit;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  padding-left: 4px;
  gap: 8px;
`;

const CheckBoxLabel = styled.label`
  ${(props) => props.theme.fontSize.s14h21}
  color:${(props) => props.theme.textColors.gray40}
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
