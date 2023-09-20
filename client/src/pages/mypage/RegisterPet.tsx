import styled from 'styled-components';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import UploadProfileImg from '@components/UploadProfileImg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { InfoText } from './EditUserProfile';

// 버튼 수정
// 라디오 간격
// 알림 모달/토스트

const schema = yup.object().shape({
  type: yup.string().oneOf(['DOG', 'CAT'], '강아지인가요 고양이인가요?').required('이 항목은 필수입니다.'),
  name: yup.string().max(50, '이름은 최대 50자를 초과할 수 없습니다.').required('이 항목은 필수입니다.'),
  age: yup
    .number()
    .required('이 항목은 필수입니다.')
    .typeError('이 항목은 필수입니다.(정수만 가능)')
    .integer('나이는 정수로 입력해 주세요.')
    .min(1, '나이는 1살 이상이어야 합니다.')
    .max(100, '나이는 100살 이하이어야 합니다.'),
  species: yup.string().max(50, '품종은 최대 50자를 초과할 수 없습니다.').required('이 항목은 필수입니다.'),
  weight: yup
    .number()
    .typeError('몸무게는 숫자만 입력해 주세요.')
    .min(1, '몸무게는 1kg 이상이어야 합니다.')
    .max(100, '몸무게는 100kg 이하이어야 합니다.')
    .required('이 항목은 필수입니다.'),
  male: yup.string().oneOf(['true', 'false'], '성별을 선택해주세요.').required('이 항목은 필수입니다.'),
  neutering: yup.string().oneOf(['true', 'false'], '중성화 여부를 선택해주세요.').required('이 항목은 필수입니다.'),
  body: yup.string().max(1000, '소개는 최대 1000자를 초과할 수 없습니다.'),
});

type IRegisterPet = yup.InferType<typeof schema>;

const apiUrl = process.env.REACT_APP_API_URL;

const defaultDogProfile = '/imgs/PetProfile.png';
const defaultCatProfile = '/imgs/CatProfile.png';

const RegisterPet = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState } = useForm<IRegisterPet>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'DOG',
    },
  });

  const { errors } = formState;

  const [type, setType] = useState<'DOG' | 'CAT' | null>('DOG');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  const onSubmit = async (data: IRegisterPet) => {
    const token = getCookieValue('access_token');

    const formData = new FormData();
    if (imageFile) {
      formData.append('file', imageFile);
    }
    formData.append('type', data.type);
    formData.append('name', data.name);
    formData.append('age', String(data.age));
    formData.append('species', data.species);
    formData.append('weight', String(data.weight));
    formData.append('body', data.body || '');
    formData.append('male', String(data.male));
    formData.append('neutering', String(data.neutering));

    try {
      const response = await axios.post(`${apiUrl}/pets/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        alert('펫밀리 등록이 완료되었습니다!');
        navigate('/mypage');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle>나의 Petmily 등록</PageTitle>

      <MainContainer>
        <UploadProfileImg
          currentImageUrl={
            imageFile ? URL.createObjectURL(imageFile) : type === 'DOG' ? defaultDogProfile : defaultCatProfile
          }
          setImageFile={handleImageFileChange}
          defaultProfileImg={type === 'DOG' ? defaultDogProfile : defaultCatProfile}
        />
        <InfoText>프로필 사진 선택</InfoText>
        <InputContainer onSubmit={handleSubmit(onSubmit)}>
          <ButtonContainer>
            <PetButton
              onClick={(e) => {
                e.preventDefault();
                setType('DOG');
                setValue('type', 'DOG');
              }}
              isSelected={type === 'DOG'}
            >
              <img src="/icons/DogIcon.svg" alt="dogIcon" />
            </PetButton>

            <PetButton
              onClick={(e) => {
                e.preventDefault();
                setType('CAT');
                setValue('type', 'CAT');
              }}
              isSelected={type === 'CAT'}
            >
              <img src="/icons/CatIcon.svg" alt="catIcon" />
            </PetButton>
          </ButtonContainer>
          {errors.type && <ErrorMsg>{errors.type.message}</ErrorMsg>}
          <InputStyle type="hidden" {...register('type')} />

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="name">이름</InputLabelStyle>
            <InputWrapper>
              <TextField
                type="text"
                label="e.g. 도기"
                {...register('name')}
                sx={{
                  width: '80%',
                  fontSize: 14,
                }}
              />
              {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          {/* 수정하기 */}
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="male">성별</InputLabelStyle>
            <InputWrapper>
              <RadioContainer>
                <RadioWrapper>
                  <input id="maleTrue" type="radio" value="true" {...register('male')} />
                  <RadioLabel htmlFor="maleTrue">남자아이</RadioLabel>
                </RadioWrapper>
                <RadioWrapper>
                  <input id="maleFalse" type="radio" value="false" {...register('male')} />
                  <RadioLabel htmlFor="maleFalse">여자아이</RadioLabel>
                </RadioWrapper>
              </RadioContainer>
              {errors.male && <ErrorMsg>{errors.male.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="neutering">중성화</InputLabelStyle>
            <InputWrapper>
              <RadioContainer>
                <RadioWrapper>
                  <input id="neuteringTrue" type="radio" value="true" {...register('neutering')} />
                  <RadioLabel htmlFor="neuteringTrue">했음</RadioLabel>
                </RadioWrapper>

                <RadioWrapper>
                  <input id="neuteringFalse" type="radio" value="false" {...register('neutering')} />
                  <RadioLabel htmlFor="neuteringFalse">안했음</RadioLabel>
                </RadioWrapper>
              </RadioContainer>

              {errors.neutering && <ErrorMsg>{errors.neutering.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="species">품종</InputLabelStyle>
            <InputWrapper>
              <TextField
                type="text"
                label="e.g. 화이트테리어"
                {...register('species')}
                sx={{
                  width: '80%',
                  fontSize: 14,
                }}
              />
              {errors.species && <ErrorMsg>{errors.species.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="weight">나이</InputLabelStyle>
            <InputWrapper>
              <TextField
                type="text"
                label="e.g. 5"
                {...register('age')}
                sx={{
                  width: '80%',
                  fontSize: 14,
                }}
              />
              {errors.age && <ErrorMsg>{errors.age.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="weight">몸무게 (kg)</InputLabelStyle>
            <InputWrapper>
              <TextField
                type="text"
                label="e.g. 8.2"
                {...register('weight')}
                sx={{
                  width: '80%',
                  fontSize: 14,
                }}
              />
              {errors.weight && <ErrorMsg>{errors.weight.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="body">나의 펫소개</InputLabelStyle>
            <InputWrapper>
              <TextField
                id="outlined-multiline-flexible"
                label="e.g. 저의 펫밀리를 소개합니다!"
                multiline
                minRows={3}
                sx={{
                  width: '80%',
                  fontSize: 14,
                }}
                {...register('body')}
              />
              {errors.body && <ErrorMsg>{errors.body.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <Button type="submit" variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            등록하기
          </Button>
        </InputContainer>
      </MainContainer>
    </>
  );
};

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 60px;
  background-color: white;
`;

export const PageTitle = styled.div`
  ${(props) => props.theme.fontSize.s20h30}
  margin-top: 36px;
  margin-left: 36px;
  font-weight: 700;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 32px;
  margin-top: 36px;
  border-radius: 8px;
`;

const PetButton = styled.button<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  background-color: ${(props) => (props.isSelected ? props.theme.colors.mainBlue : props.theme.textColors.gray50)};
  cursor: pointer;
`;

export const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
  margin-top: 30px;
`;

export const RegisterInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const InputLabelStyle = styled.label`
  width: 20%;
  ${(props) => props.theme.fontSize.s16h24};
  white-space: nowrap;
`;

export const InputStyle = styled.input`
  width: 60%;
  height: 32px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.textColors.gray60};
  border-radius: 8px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export const RadioLabel = styled.label`
  ${(props) => props.theme.fontSize.s14h21};
  margin-left: 8px;
  color: ${({ theme }) => theme.textColors.gray60};

  input:checked + & {
    color: #279eff;
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  width: 50%;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
`;

export const ErrorMsg = styled.div`
  color: red;
  display: bolck;
  margin-top: 5px;
  ${(props) => props.theme.fontSize.s14h21}
`;
export default RegisterPet;
