import styled, { keyframes } from 'styled-components';
import { ErrorMessage, SubmitButtonStyle } from './Login';
import GoogleOAuthButton from '@components/buttons/OAuthButton';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Modal, Sheet } from '@mui/joy';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const apiUrl = process.env.REACT_APP_API_URL;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, '이름은 2자 이상이어야 합니다.')
    .matches(/[가-힣]+/, '한글만 가능합니다.')
    .required('이름은 필수입니다.'),
  phone: yup
    .string()
    .matches(/^010[0-9]{8}$/, "010으로 시작해야 하며 '-'를 제외한 총 11자리 숫자여야 합니다.")
    .required('전화번호는 필수입니다.'),
  address: yup.string().required('주소는 필수입니다.'),
  detailAddress: yup.string().required('상세주소는 필수입니다.'),
  email: yup.string().email('이메일 형식을 지켜주세요.').required('ID는 필수입니다.'),
  nickName: yup
    .string()
    .min(2, '닉네임은 2자 이상부터 가능합니다.')
    .matches(/^[^!@#$%^&*()_+{}[\]:;<>,.?~|]+$/, '특수문자가 없어야 합니다.')
    .required('닉네임은 필수입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, '최소 1개의 영문자와 1개의 숫자를 반드시 포함해야 합니다. ')
    .required('비밀번호는 필수입니다.'),
  passwordConfirm: yup.lazy(() => {
    return yup.string().oneOf([yup.ref('password'), ''], '비밀번호가 서로 다릅니다.');
  }),
  photo: yup.string(),
  petsitterBoolean: yup.boolean(),
});
type IFormSignupInputs = yup.InferType<typeof schema>;

const Signup = () => {
  const navigate = useNavigate();
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormSignupInputs>({ resolver: yupResolver(schema) });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
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
    setSigungu(data.sigungu);
    // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    const splitAddress = data.address.split(' ').splice(2).join(' ');
    if (data) {
      clearErrors('address');
    }
    setRemainAddress(splitAddress);
    setIsModalOpen(false);
  };

  const onSubmit = async (data: IFormSignupInputs) => {
    setIsSignupLoading(true);

    const { name, phone, address, detailAddress, email, nickName, password, petsitterBoolean } = data;

    if (data.password !== data.passwordConfirm) {
      setError('password', { type: 'dismatch', message: '비밀번호가 서로 다릅니다.' });
      setError('passwordConfirm', { type: 'dismatch', message: '비밀번호가 서로 다릅니다.' });
      setIsSignupLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${apiUrl}/members`, {
        name,
        phone,
        address: `${address} ${detailAddress}`,
        email,
        nickName,
        password,
        petsitterBoolean,
      });
      if (data.data === 'success create member') {
        alert('가입을 축하합니다.');
        navigate('/login');
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data.status === 409) {
        setError('email', { type: 'serverError', message: error.response.data.message });
      }
      // if (error.response.data.fieldErrors) {
      //   const fieldErrors = error.response.data.fieldErrors;
      // }
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
        <InputFormContainer onSubmit={handleSubmit(onSubmit)}>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="이름"
              type="text"
              {...register('name', { required: true })}
              error={errors.name ? true : false}
            />
            {errors.name?.message && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
          </InputFormWrapper>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="연락처"
              {...register('phone', { required: true })}
              error={errors.phone ? true : false}
            />
            {errors.phone?.message && <ErrorMessage>{errors.phone?.message}</ErrorMessage>}
          </InputFormWrapper>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="주소"
              value={zonecode ? `${zonecode} ${sido} ${sigungu} ${remainAddress}` : ''}
              {...register('address', { required: true })}
              onClick={onToggleModal}
              onKeyDown={onToggleModal}
              error={errors.address ? true : false}
            />
            {errors.address?.message && <ErrorMessage>{errors.address?.message}</ErrorMessage>}
          </InputFormWrapper>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="상세주소"
              {...register('detailAddress', { required: true })}
              error={errors.detailAddress ? true : false}
            />
            {errors.detailAddress?.message && <ErrorMessage>{errors.detailAddress?.message}</ErrorMessage>}
          </InputFormWrapper>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="이메일"
              type="email"
              {...register('email', { required: true })}
              error={errors.email ? true : false}
            />
            {errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          </InputFormWrapper>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="닉네임"
              {...register('nickName', { required: true })}
              error={errors.nickName ? true : false}
            />
            {errors.nickName?.message && <ErrorMessage>{errors.nickName?.message}</ErrorMessage>}
          </InputFormWrapper>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="비밀번호"
              type="password"
              {...register('password', { required: true })}
              error={errors.password ? true : false}
            />
            {errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          </InputFormWrapper>
          <InputFormWrapper>
            <SignupInputStyle
              placeholder="비밀번호 확인"
              type="password"
              {...register('passwordConfirm', { required: true })}
              error={errors.passwordConfirm ? true : false}
            />
            {errors.passwordConfirm?.message && <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>}
          </InputFormWrapper>
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
        </InputFormContainer>
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
  width: 100%;
  background-color: white;
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  max-width: 360px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  div:nth-child(1) {
    ${(props) => props.theme.fontSize.s20h30}
  }

  div:nth-child(2) {
    ${(props) => props.theme.fontSize.s16h24}
  }
`;

const InputFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
  gap: 16px;
`;

const InputFormWrapper = styled.div``;

const SignupInputStyle = styled.input<{ error: boolean | null }>`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: 1px solid;
  border: 1px solid ${({ theme, error }) => (error ? 'red' : theme.lineColors.coolGray80)};
  padding: 8px;
  ${({ theme }) => theme.fontSize.s14h21}
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
