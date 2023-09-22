import styled from 'styled-components';
import { MainContainer, PageTitle, RegisterInputWrapper, InputContainer, InputLabelStyle } from './RegisterPet';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieValue } from 'hooks/getCookie';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UploadProfileImg from '../../components/UploadProfileImg';
import { useState } from 'react';
import { IUser, deleteUser } from 'store/userSlice';
import { deleteCookie } from 'hooks/deleteCookie';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import DaumPostcode from 'react-daum-postcode';
import { Modal, Sheet } from '@mui/joy';

// 버튼 수정

const schema = yup.object().shape({
  nickName: yup
    .string()
    .min(4, '닉네임은 4자 이상이어야 합니다.')
    .matches(/^[a-zA-Z0-9\uac00-\ud7a3]+$/, '닉네임에는 한국어, 영어, 숫자만 허용됩니다.')
    .defined(),
  phone: yup
    .string()
    .defined()
    .matches(/^010\d{8}$/, '연락처는 010으로 시작하는 11자리 숫자여야 합니다.'),
  address: yup.string().defined(),
  body: yup.string().defined(),
});

type IEditUser = yup.InferType<typeof schema>;

const apiUrl = process.env.REACT_APP_API_URL;

const EditUserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, memberId, phone, address, email, nickName, body, photo } = useSelector((state: IUser) => state.user);

  // 프로필 사진 변경
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  const { register, clearErrors, handleSubmit, formState } = useForm<IEditUser>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  // 주소 API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onToggleModal = () => {
    setIsModalOpen(true);
  };
  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

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

  const onSubmit = async (data: IEditUser) => {
    const token = getCookieValue('access_token');

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
      console.log(error);
    }
  };

  const handleLogout = () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    dispatch(deleteUser());
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  const deleteAccount = async () => {
    const token = getCookieValue('access_token');
    const isConfirmed = window.confirm('정말 탈퇴하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const response = await axios.patch(
        `${apiUrl}/members/${memberId}/disable`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.data === 'success delete member') {
        alert('계정이 삭제되었습니다');
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        dispatch(deleteUser());
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle>회원 정보 수정</PageTitle>
      <MainContainer>
        <UploadProfileImg
          currentImageUrl={photo}
          setImageFile={handleImageFileChange}
          defaultProfileImg="/imgs/DefaultUserProfile.jpg"
        />
        <InfoText>프로필 사진 선택</InfoText>
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
            <InputWrapper>
              <TextField type="text" defaultValue={nickName} {...register('nickName')} />
              {errors.nickName && <ErrorMsg>{errors.nickName.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="phone">연락처</InputLabelStyle>
            <InputWrapper>
              <TextField type="text" defaultValue={phone} {...register('phone')} />
              {errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
            </InputWrapper>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="address">주소</InputLabelStyle>
            <StyledTextField
              type="text"
              defaultValue={address}
              value={zonecode ? `${zonecode} ${sido} ${sigungu} ${remainAddress}` : address}
              onClick={onToggleModal}
              onKeyDown={onToggleModal}
              {...register('address')}
            />

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
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="body">나의 소개</InputLabelStyle>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              minRows={3}
              sx={{
                width: '60%',
                fontSize: 14,
              }}
              defaultValue={body}
              {...register('body')}
            />
          </RegisterInputWrapper>

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
  ${(props) => props.theme.fontSize.s16h24};
  width: 60%;
`;

export const InfoText = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: 800;
  margin-top: 20px;
  color: #2792ff;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 36px;
`;

export const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  ${(props) => props.theme.fontSize.s14h21}
  &:hover {
    color: ${(props) => props.theme.colors.mainBlue};
  }
`;

// RegisterPet 같이 사용할 수 있게 수정
export const StyledTextField = styled(TextField)`
  ${(props) => props.theme.fontSize.s14h21}
  width: 60%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const ErrorMsg = styled.div`
  color: red;
  display: bolck;
  margin-top: 5px;
  ${(props) => props.theme.fontSize.s14h21}
`;

export default EditUserProfile;
