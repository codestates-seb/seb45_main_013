import styled from 'styled-components';
import {
  MainContainer,
  PageTitle,
  RegisterInputWrapper,
  InputContainer,
  RadioWrapper,
  RadioLabel,
  InputLabelStyle,
} from './RegisterPet';
import UploadProfileImg from '../../components/UploadProfileImg';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getCookieValue } from 'hooks/getCookie';
import { useForm } from 'react-hook-form';
import { StyledButton, ErrorMsg, StyledTextField, InfoText } from './EditUserProfile';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//  중성화 수정 (등록할 떄 중성화 하지 않은 펫만 가능)
//  펫 삭제 확인

const schema = yup.object().shape({
  name: yup.string().max(50, '이름은 최대 50자를 초과할 수 없습니다.').required('이 항목은 필수입니다.'),
  age: yup
    .number()
    .integer('나이는 정수로 입력해 주세요.')
    .min(1, '나이는 1살 이상이어야 합니다.')
    .max(100, '나이는 100살 이하이어야 합니다.')
    .required('이 항목은 필수입니다.')
    .typeError('나이는 숫자만 입력해 주세요.'),
  species: yup.string(),
  weight: yup
    .number()
    .min(1, '몸무게는 1kg 이상이어야 합니다.')
    .max(100, '몸무게는 100kg 이하이어야 합니다.')
    .required('이 항목은 필수입니다.')
    .typeError('몸무게는 숫자만 입력해 주세요.'),
  body: yup.string().max(1000, '소개는 최대 1000자를 초과할 수 없습니다.'),
  male: yup.boolean(),
  neutering: yup.boolean(),
  photo: yup.string(),
});

type IEditPet = yup.InferType<typeof schema>;

const apiUrl = process.env.REACT_APP_API_URL;

const EditPet = () => {
  const navigate = useNavigate();

  // 펫아이디 나오는지 확인
  const { petId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  const [pet, setPet] = useState<IEditPet>({
    name: '',
    age: 0,
    species: '',
    weight: 0,
    body: '',
    male: false,
    neutering: false,
    photo: '',
  });

  const { register, setValue, clearErrors, handleSubmit, formState } = useForm<IEditPet>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  useEffect(() => {
    const token = getCookieValue('access_token');
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setPet(response.data);
          setIsLoaded(true);

          setValue('name', response.data.name);
          setValue('species', response.data.species);
          setValue('weight', response.data.weight);
          setValue('age', response.data.age);
          setValue('body', response.data.body);
          setValue('male', response.data.male);
          setValue('neutering', response.data.neutering);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPetData();
  }, []);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  const onSubmit = async (data: IEditPet) => {
    const token = getCookieValue('access_token');

    const formData = new FormData();
    if (imageFile) {
      formData.append('file', imageFile);
    }
    if (data.name !== undefined && data.name !== pet.name) {
      formData.append('name', data.name);
    }
    if (data.weight !== undefined && data.weight !== pet.weight) {
      formData.append('weight', data.weight.toString());
    }
    if (data.age !== undefined && data.age !== pet.age) {
      formData.append('age', data.age.toString());
    }
    if (data.body !== undefined) {
      formData.append('body', data.body);
    }
    if (data.neutering === true && pet.neutering === false) {
      formData.append('neutering', 'true');
    }

    try {
      const response = await axios.patch(`${apiUrl}/pets/${petId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        alert('수정이 완료되었습니다.');
        navigate('/mypage');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePet = async () => {
    const token = getCookieValue('access_token');
    const isConfirmed = window.confirm('정말 펫을 삭제하시겠습니까?');
    if (!isConfirmed) return;
    else {
      try {
        const response = await axios.patch(
          `${apiUrl}/pets/${petId}/disable`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data === 'Disable Pet Success') {
          alert('펫이 삭제되었습니다.');
          navigate('/mypage');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <PageTitle>Petmily 정보 수정</PageTitle>
      <BtnContainer>
        <StyledButton onClick={deletePet}>삭제</StyledButton>
      </BtnContainer>
      {isLoaded && (
        <MainContainer>
          <UploadProfileImg
            petId={petId}
            currentImageUrl={pet.photo}
            setImageFile={handleImageFileChange}
            defaultProfileImg="/imgs/PetProfile.png"
          />
          <InfoText>프로필 사진 선택</InfoText>

          <InputContainer onSubmit={handleSubmit(onSubmit)}>
            <RegisterInputWrapper>
              <InputLabelStyle htmlFor="name">이름</InputLabelStyle>
              <InputWrapper>
                <TextField type="text" defaultValue={pet.name} {...register('name')} />
                {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
              </InputWrapper>
            </RegisterInputWrapper>

            <RegisterInputWrapper>
              <InputLabelStyle htmlFor="species">품종</InputLabelStyle>
              <Info> {pet.species}</Info>
            </RegisterInputWrapper>

            <RegisterInputWrapper>
              <InputLabelStyle htmlFor="male">성별</InputLabelStyle>
              <Info>{pet.male ? '남자아이' : '여자아이'}</Info>
            </RegisterInputWrapper>

            {!pet.neutering && (
              <RegisterInputWrapper>
                <InputLabelStyle htmlFor="neutering">중성화</InputLabelStyle>
                <InputWrapper>
                  <RadioWrapper>
                    <input id="neuteringTrue" type="radio" value="true" {...register('neutering')} />
                    <RadioLabel htmlFor="neuteringTrue">했음</RadioLabel>
                  </RadioWrapper>
                </InputWrapper>
              </RegisterInputWrapper>
            )}

            <RegisterInputWrapper>
              <InputLabelStyle htmlFor="weight">몸무게 (kg)</InputLabelStyle>
              <InputWrapper>
                <TextField type="text" defaultValue={pet.weight} {...register('weight')} />
                {errors.weight && <ErrorMsg>{errors.weight.message}</ErrorMsg>}
              </InputWrapper>
            </RegisterInputWrapper>

            <RegisterInputWrapper>
              <InputLabelStyle htmlFor="age">나이</InputLabelStyle>
              <InputWrapper>
                <TextField type="text" defaultValue={pet.age} {...register('age')} />
                {errors.age && <ErrorMsg>{errors.age.message}</ErrorMsg>}
              </InputWrapper>
            </RegisterInputWrapper>

            <RegisterInputWrapper>
              <InputLabelStyle htmlFor="body">나의 펫소개</InputLabelStyle>
              <InputWrapper>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  minRows={3}
                  sx={{
                    width: '100%',
                    fontSize: 14,
                  }}
                  defaultValue={pet.body}
                  {...register('body')}
                />
                {errors.body && <ErrorMsg>{errors.body.message}</ErrorMsg>}
              </InputWrapper>
            </RegisterInputWrapper>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
              수정하기
            </Button>
          </InputContainer>
        </MainContainer>
      )}
    </>
  );
};

const Info = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  width: 60%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 36px;
`;

export default EditPet;
