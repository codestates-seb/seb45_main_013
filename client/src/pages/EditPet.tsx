import styled from 'styled-components';
import {
  MainContainer,
  PageTitle,
  RegisterInputWrapper,
  InputContainer,
  InputLabelStyle,
  InputStyle,
} from './RegisterPet';
import UploadProfileImg from '../components/UploadProfileImg';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import { useParams, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { getCookieValue } from 'hooks/getCookie';
import { useForm } from 'react-hook-form';
import { StyledButton } from './EditUserProfile';

// 이름, 나이, 몸무게, 바디, 중성화 수정 가능

const apiUrl = process.env.REACT_APP_API_URL;
const token = getCookieValue('access_token');

interface IEditPet {
  name: string;
  age: string;
  species: string;
  weight: string;
  body: string;
  male: boolean;
  neutering: boolean;
  photo: string;
}

const EditPet = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setPet(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPetData();
  }, []);

  // 펫아이디 나오는지 확인
  const { petId } = useParams();
  console.log(petId);
  const [pet, setPet] = useState<IEditPet>({
    name: '',
    age: '',
    species: '',
    weight: '',
    body: '',
    male: false,
    neutering: false,
    photo: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  const { register, handleSubmit } = useForm<IEditPet>();

  const onSubmit = async (data: IEditPet) => {
    const token = getCookieValue('access_token');

    console.log(JSON.stringify(data));

    const formData = new FormData();
    if (imageFile) {
      formData.append('file', imageFile);
    }
    if (data.name !== undefined && data.name !== pet.name) {
      formData.append('name', data.name);
    }
    if (data.weight !== undefined && data.weight !== pet.weight) {
      formData.append('weight', data.weight);
    }
    if (data.age !== undefined && data.age !== pet.age) {
      formData.append('weight', data.age);
    }
    if (data.body !== undefined) {
      formData.append('body', data.body);
    }
    if (data.neutering === true) {
      formData.append('neutering', 'true');
    }

    formData.forEach((value, key) => {
      console.log(`key: ${key} value: ${value}`);
    });

    try {
      const response = await axios.patch(`${apiUrl}/pets/${petId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        alert('수정이 완료되었습니다');
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

  const deletePet = async () => {
    const token = getCookieValue('access_token');
    try {
      const response = await axios.delete(`${apiUrl}/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data === 'NO_CONTENT') {
        alert('펫이 삭제되었습니다');
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
      <PageTitle>Petmily 정보 수정</PageTitle>
      <BtnContainer>
        <StyledButton onClick={deletePet}>삭제</StyledButton>
      </BtnContainer>
      <MainContainer>
        <UploadProfileImg
          petId={petId}
          currentImageUrl={pet.photo}
          setImageFile={handleImageFileChange}
          defaultProfileImg="/imgs/PetProfile.png"
        />
        <InputContainer onSubmit={handleSubmit(onSubmit)}>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="name">이름</InputLabelStyle>
            <InputStyle type="text" defaultValue={pet.name} {...register('name')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="species">품종</InputLabelStyle>
            <Info> {pet.species}</Info>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="male">성별</InputLabelStyle>
            <Info>{pet.male ? '남자아이' : '여자아이'}</Info>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="weight">몸무게 (kg)</InputLabelStyle>
            <InputStyle type="text" defaultValue={pet.weight} {...register('weight')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="age">나이</InputLabelStyle>
            <InputStyle type="text" defaultValue={pet.age} {...register('age')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="body">나의 펫소개</InputLabelStyle>
            <Textarea
              placeholder="우리 냥이는 박스를 좋아해요"
              minRows={3}
              sx={{
                width: '60%',
                borderColor: '#A6A6A6',
                borderRadius: '8px',
                fontSize: 14,
              }}
              defaultValue={pet.body}
              {...register('body')}
            />
          </RegisterInputWrapper>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            수정하기
          </Button>
        </InputContainer>
      </MainContainer>
    </>
  );
};

const Info = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  width: 60%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 36px;
`;

export default EditPet;
