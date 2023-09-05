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
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';

// 지우기
const petsitter = true;
//  버튼 수정
//  케어가능동물 select 높이

const EditUserProfile = () => {
  return (
    <>
      <PageTitle>회원 정보 수정</PageTitle>

      <MainContainer>
        <UploadProfileImg />

        <InputContainer>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">이름</InputLabelStyle>
            <Info>김코딩</Info>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">이메일</InputLabelStyle>
            <Info>test@gmail.com</Info>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">닉네임</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="코딩맨" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">연락처</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="010-1111-2222" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">주소</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="서울 강남구 테헤란로 415 8층" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">나의 소개</InputLabelStyle>
            <Textarea
              placeholder="안녕하세요,홍길동 펫시터입니다!"
              minRows={3}
              sx={{
                width: '60%',
                borderColor: '#A6A6A6',
                borderRadius: '8px',
                fontSize: 14,
              }}
            />
          </RegisterInputWrapper>
          {/* 펫시터라면 소개 입력란 추가 */}
          {petsitter && (
            <>
              <RegisterInputWrapper>
                <InputLabelStyle htmlFor="username">케어 가능한 펫</InputLabelStyle>
                <Select
                  sx={{
                    width: '60%',
                    height: 32,
                    borderRadius: 8,
                    border: '1px solid #A6A6A6',
                    fontSize: 14,
                  }}
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
              <RegisterInputWrapper>
                <InputLabelStyle htmlFor="username">케어 가능 시간</InputLabelStyle>
                {/* 날짜, 시간 추가 */}
              </RegisterInputWrapper>
            </>
          )}
          <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
            수정하기
          </Button>
          <LinkContainer>
            <Link to="/">로그아웃</Link>
            <Link to="/">회원 탈퇴</Link>
          </LinkContainer>
        </InputContainer>
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
  width: 100;
`;

export default EditUserProfile;
