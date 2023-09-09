import styled from 'styled-components';
import {
  MainContainer,
  PageTitle,
  RegisterInputWrapper,
  InputContainer,
  InputLabelStyle,
  InputStyle,
} from './RegisterPet';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import Textarea from '@mui/joy/Textarea';
import { useSelector } from 'react-redux';

import { getCookieValue } from 'hooks/getCookie';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import UploadProfileImg from '../components/UploadProfileImg';
import { useState } from 'react';
import { IUser } from 'store/userSlice';

// 펫시터일 때 페이지 만들기
// 버튼 수정
//  유효성 검사 (변경 x -> x)

interface IEditUser {
  nickName?: string;
  phone?: string;
  address?: string;
  body?: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

const EditUserProfile = () => {
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

    if (nickName === data.nickName) {
      delete data.nickName;
    }
    if (phone === data.phone) {
      delete data.phone;
    }
    if (address === data.address) {
      delete data.address;
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append('file', imageFile);
    }
    formData.append('requestBody', JSON.stringify(data));

    console.log(JSON.stringify(data));
    try {
      console.log(token);
      const response = await axios.patch(`${apiUrl}/members/${memberId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
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
      <UploadProfileImg setImageFile={handleImageFileChange} />
      <MainContainer>
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
          {/* <RegisterInputWrapper>
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
          </RegisterInputWrapper> */}
          {/* {petsitter && (
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
          <Link to="/">로그아웃</Link>
          <Link to="/">회원 탈퇴</Link>
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
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default EditUserProfile;
