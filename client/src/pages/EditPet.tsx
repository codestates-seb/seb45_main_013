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

const EditPet = () => {
  return (
    <>
      <PageTitle>Petmily 정보 수정</PageTitle>

      <MainContainer>
        <UploadProfileImg />

        <InputContainer>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">이름</InputLabelStyle>
            <Info>냥이</Info>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">품종</InputLabelStyle>
            <Info>브리티시 숏헤어</Info>
          </RegisterInputWrapper>

          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">성별</InputLabelStyle>
            <Info>남자아이</Info>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">몸무게 (kg)</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="12" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">나이</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="16" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">나의 펫소개</InputLabelStyle>
            <Textarea
              placeholder="우리 냥이는 박스를 좋아해요"
              minRows={3}
              sx={{
                width: '60%',
                borderColor: '#A6A6A6',
                borderRadius: '8px',
                fontSize: 14,
              }}
            />
          </RegisterInputWrapper>
          <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
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

export default EditPet;
