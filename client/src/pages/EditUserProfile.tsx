import styled from 'styled-components';
import { RegisterInputWrapper, InputContainer, InputLabelStyle, InputStyle } from './RegisterPet';
import UploadProfileImg from '../components/UploadProfileImg';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

// 지우기
const petsitter = true;
//  버튼 수정

const EditUserProfile = () => {
  return (
    <EditPage>
      <EditTitle>회원 정보 수정</EditTitle>
      <EditContianer>
        <UploadProfileImg />
        <InputContainer>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">이름</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="김코딩" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">닉네임</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="코딩맨" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">이메일</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="test@gmail.com" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">비밀번호 변경</InputLabelStyle>
            <InputStyle type="password" id="username" placeholder="******" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">비밀번호 확인</InputLabelStyle>
            <InputStyle type="password" id="username" placeholder="******" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">연락처</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="010-1111-2222" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">주소</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="서울 강남구 테헤란로 415 8층" />
          </RegisterInputWrapper>
          {/* 펫시터라면 소개 입력란 추가 */}
          {petsitter && (
            <>
              <RegisterInputWrapper>
                <InputLabelStyle htmlFor="username">케어 가능한 펫</InputLabelStyle>
                <StyledTextarea placeholder="펫시터님에 대해 소개해주세요! (최대 200자)" />
              </RegisterInputWrapper>
              <RegisterInputWrapper>
                <InputLabelStyle htmlFor="username">나의 소개</InputLabelStyle>
                <StyledTextarea placeholder="펫시터님에 대해 소개해주세요! (최대 200자)" />
              </RegisterInputWrapper>
            </>
          )}
        </InputContainer>
        <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
          수정하기
        </Button>
        <div>
          <Link to="/signup">로그아웃</Link>
          <Link to="/signup">회원 탈퇴</Link>
        </div>
      </EditContianer>
    </EditPage>
  );
};

export const EditPage = styled.div`
  padding: 36px;
`;

export const EditTitle = styled.div`
  ${(props) => props.theme.fontSize.s20h30}
`;

export const EditContianer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  div {
  }
`;

export const EditItem = styled.div`
  ${(props) => props.theme.fontSize.s18h27};
`;

const StyledTextarea = styled.textarea`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.textColors.gray60};
  border-radius: 8px;
  font-size: 14px;
  outline: none;
`;
export default EditUserProfile;
