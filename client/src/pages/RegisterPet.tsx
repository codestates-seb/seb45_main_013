import { useState } from 'react';
import styled from 'styled-components';
import UploadProfileImg from '@components/UploadProfileImg';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import { useForm } from 'react-hook-form';
import { getCookieValue } from 'hooks/getCookie';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// 버튼 수정
// 라디오 간격
// 알림 모달/토스트

// interface PetButtonProps {
//   iscat?: boolean;
// }

interface IRegisterPet {
  type: 'DOG' | 'CAT';
  name: string;
  age: number;
  species: string;
  weight: number;
  body: string;
  male: boolean;
  neutering: boolean;
}
const apiUrl = process.env.REACT_APP_API_URL;

const RegisterPet = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<IRegisterPet>();

  const [type, setType] = useState<'DOG' | 'CAT' | null>(null);

  // Upload Image 사용
  const defaultProfileImg = 'imgs/DefaultUserProfile.jpg';
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  const onSubmit = async (data: IRegisterPet) => {
    const token = getCookieValue('access_token');

    console.log(JSON.stringify(data));

    const formData = new FormData();
    if (imageFile) {
      formData.append('file', imageFile);
    }
    formData.append('type', data.type);
    formData.append('name', data.name);
    formData.append('age', String(data.age));
    formData.append('species', data.species);
    formData.append('weight', String(data.weight));
    formData.append('body', data.body);
    formData.append('male', String(data.male));
    formData.append('neutering', String(data.neutering));

    formData.forEach((value, key) => {
      console.log(`key: ${key} value: ${value}`);
    });

    try {
      const response = await axios.post(`${apiUrl}/pets/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        console.log(response.data);
        alert('펫밀리 등록이 완료되었습니다!');
        navigate('/mypage');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          console.error('AxiosError caught (no response):', error.message);
        }
      } else {
        console.error('Non-Axios error caught:', error);
      }
    }
  };

  return (
    <>
      <PageTitle>나의 Petmily 등록</PageTitle>

      <MainContainer>
        <UploadProfileImg currentImageUrl={defaultProfileImg} setImageFile={handleImageFileChange} />
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
          <InputStyle type="hidden" {...register('type')} />
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="name">이름</InputLabelStyle>
            <InputStyle type="text" placeholder="ex) 도기" {...register('name')} />
          </RegisterInputWrapper>

          {/* 수정하기 */}
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="male">성별</InputLabelStyle>
            <RadioWrapper>
              <input type="radio" value="true" {...register('male')} />
              <RadioLabel htmlFor="male">남자아이</RadioLabel>
              <input type="radio" value="false" {...register('male')} />
              <RadioLabel htmlFor="female">여자아이</RadioLabel>
            </RadioWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="neutering">중성화</InputLabelStyle>
            <RadioWrapper>
              <input type="radio" value="true" {...register('neutering')} />
              <RadioLabel htmlFor="male">했음</RadioLabel>
              <input type="radio" value="false" {...register('neutering')} />
              <RadioLabel htmlFor="female">안했음</RadioLabel>
            </RadioWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="species">품종</InputLabelStyle>
            <InputStyle type="text" placeholder="ex) 화이트테리어" {...register('species')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="weight">나이</InputLabelStyle>
            <InputStyle type="text" placeholder="ex) 5" {...register('age')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="weight">몸무게 (kg)</InputLabelStyle>
            <InputStyle type="text" placeholder="ex) 8.2" {...register('weight')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="body">나의 펫소개</InputLabelStyle>
            <Textarea
              placeholder="우리 아이는요..."
              minRows={3}
              sx={{
                width: '60%',
                borderColor: '#A6A6A6',
                borderRadius: '8px',
                fontSize: 14,
              }}
              {...register('body')}
            />
          </RegisterInputWrapper>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            등록하기
          </Button>
        </InputContainer>
      </MainContainer>
    </>
  );
};
export default RegisterPet;

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
  margin-top: 60px;
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
  ${(props) => props.theme.fontSize.s16h24};
`;

export const InputStyle = styled.input`
  width: 60%;
  height: 32px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.textColors.gray60};
  border-radius: 8px;
`;

export const RadioLabel = styled.label`
  ${(props) => props.theme.fontSize.s14h21};
  margin-left: -3px;
  color: ${({ theme }) => theme.textColors.gray60};
  input:checked + & {
    color: #279eff;
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
`;
