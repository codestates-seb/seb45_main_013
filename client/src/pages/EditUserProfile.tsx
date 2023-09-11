import styled from 'styled-components';
import {
  MainContainer,
  PageTitle,
  RegisterInputWrapper,
  InputContainer,
  InputLabelStyle,
  InputStyle,
} from './RegisterPet';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import { useSelector } from 'react-redux';
import { getCookieValue } from 'hooks/getCookie';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import UploadProfileImg from '../components/UploadProfileImg';
import { useState } from 'react';
import { IUser } from 'store/userSlice';
import { deleteCookie } from 'hooks/deleteCookie';

// 보호자, 펫시터 같이 , 펫시터만 입력란 추가
// 버튼 수정
// 주소 API 사용하기
// 로그아웃, 회원탈퇴

interface IEditUser {
  nickName?: string;
  phone?: string;
  address?: string;
  body?: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

const EditUserProfile = () => {
  // 수정 후 이동
  const navigate = useNavigate();

  const { name, memberId, phone, address, email, nickName, body, petsitterBoolean, photo } = useSelector(
    (state: IUser) => state.user,
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  const { register, handleSubmit } = useForm<IEditUser>();

  const onSubmit = async (data: IEditUser) => {
    const token = getCookieValue('access_token');

    console.log(JSON.stringify(data));

    const formData = new FormData();
    if (imageFile) {
      formData.append('file', imageFile);
    }
    if (data.nickName !== undefined && data.nickName !== nickName) {
      formData.append('nickName', data.nickName);
    }
    if (data.phone !== undefined && data.phone !== phone) {
      formData.append('phone', data.phone);
    }
    if (data.address !== undefined) {
      formData.append('address', data.address);
    }
    if (data.body !== undefined) {
      formData.append('body', data.body);
    }

    formData.forEach((value, key) => {
      console.log(`key: ${key} value: ${value}`);
    });

    try {
      const response = await axios.patch(`${apiUrl}/members/${memberId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.data === 'success modify member') {
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

  const handleLogout = () => {
    deleteCookie('access_token');
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  const deleteAccount = async () => {
    const token = getCookieValue('access_token');
    try {
      const response = await axios.delete(`${apiUrl}/members/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.data === 'success delete member') {
        alert('계정이 삭제되었습니다');
        navigate('/');
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
      <PageTitle>회원 정보 수정</PageTitle>
       <MainContainer>
        <UploadProfileImg currentImageUrl={photo} setImageFile={handleImageFileChange} />
        <InputContainer onSubmit={handleSubmit(onSubmit)}>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">이름</InputLabelStyle>
            <Info>{name}</Info>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="email">이메일</InputLabelStyle>
            <Info>{email}</Info>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="nickName">닉네임</InputLabelStyle>
            <InputStyle type="text" defaultValue={nickName} {...register('nickName')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="phone">연락처</InputLabelStyle>
            <InputStyle type="text" defaultValue={phone} {...register('phone')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="address">주소</InputLabelStyle>
            <InputStyle type="text" defaultValue={address} {...register('address')} />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="body">나의 소개</InputLabelStyle>
            <Textarea
              minRows={3}
              sx={{
                width: '60%',
                borderColor: '#A6A6A6',
                borderRadius: '8px',
                fontSize: 14,
              }}
              defaultValue={body}
              {...register('body')}
            />
          </RegisterInputWrapper>
          {/* {petsitterBoolean && (
<>
<RegisterInputWrapper>
<InputLabelStyle htmlFor="petType">케어 가능한 펫</InputLabelStyle>
<Select
sx={{
width: '60%',
height: 32,
borderRadius: 8,
border: '1px solid #A6A6A6',
fontSize: 14,
}}
{...register('petType')}
>
<Option sx={{ fontSize: 14 }} value="dog">
강아지
</Option>
<Option sx={{ fontSize: 14 }} value="cat">
고양이
</Option>
<Option sx={{ fontSize: 14 }} value="both">
모두
</Option>
</Select>
</RegisterInputWrapper>
</>
)} */}
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            수정하기
          </Button>
        </InputContainer>
        <LinkContainer>
          <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
          <StyledButton onClick={deleteAccount}>회원 탈퇴</StyledButton>
        </LinkContainer>
      </MainContainer>
    </>
  );
};

const Info = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
  width: 60%;
`;

const LinkContainer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  ${(props) => props.theme.fontSize.s14h21}
  &:hover {
    color: ${(props) => props.theme.colors.mainBlue};
  }
`;

export default EditUserProfile;
