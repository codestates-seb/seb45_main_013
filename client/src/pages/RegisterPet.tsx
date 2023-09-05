import { useState } from 'react';
import styled from 'styled-components';
import UploadProfileImg from 'components/UploadProfileImg';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';

// 버튼 수정
// 성별 폰트
const RegisterPet = () => {
  const [isCat, setIsCat] = useState(false);
  const [gender, setGender] = useState(null);

  console.log(gender);

  const handleGenderCheck = (e: any) => {
    setGender(e.target.value);
  };

  return (
    <>
      <PageTitle>나의 Petmily 등록</PageTitle>

      <MainContainer>
        <UploadProfileImg />
        <ButtonContainer>
          <PetButton onClick={() => setIsCat(false)} iscat={isCat ? 'true' : 'false'}>
            <img src="/icons/DogIcon.svg" alt="dogIcon" />
          </PetButton>
          <PetButton onClick={() => setIsCat(true)} iscat={isCat ? 'false' : 'true'}>
            <img src="/icons/CatIcon.svg" alt="catIcon" />
          </PetButton>
        </ButtonContainer>
        <InputContainer>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">이름</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="ex) 도기" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <GenderText>성별</GenderText>
            <GenderWrapper>
              <CheckBoxContainer>
                <CheckBoxGenderWrapper>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleGenderCheck}
                    checked={gender === 'male'}
                  ></input>
                  <img src="/icons/MaleIcon.svg" alt="maleIcon"></img>
                </CheckBoxGenderWrapper>
                <CheckBoxGenderWrapper>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleGenderCheck}
                    checked={gender === 'female'}
                  ></input>
                  <img src="/icons/FemaleIcon.svg" alt="femaleIcon"></img>
                </CheckBoxGenderWrapper>
              </CheckBoxContainer>
            </GenderWrapper>
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">품종</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="ex) 화이트테리어" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">몸무게 (kg)</InputLabelStyle>
            <InputStyle type="text" id="username" placeholder="ex) 8.2" />
          </RegisterInputWrapper>
          <RegisterInputWrapper>
            <InputLabelStyle htmlFor="username">나의 펫소개</InputLabelStyle>
            <Textarea
              placeholder="우리 아이는요..."
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
            등록하기
          </Button>
        </InputContainer>
      </MainContainer>
    </>
  );
};
export default RegisterPet;

export const MainContainer = styled.main`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  height: 100%;
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
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 60px;
  width: 100%;
`;

const PetButton = styled.button<{ iscat: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  border: none;
  background-color: ${(props) =>
    props.iscat === 'true' ? props.theme.textColors.gray50 : props.theme.colors.mainBlue};
`;

export const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  margin-top: 30px;
`;

export const RegisterInputWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const InputLabelStyle = styled.label`
  ${(props) => props.theme.fontSize.s16h24};
`;

export const InputStyle = styled.input`
  padding: 8px;
  height: 32px;
  width: 60%;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.textColors.gray60};
`;

const GenderText = styled.div`
  ${(props) => props.theme.fontSize.s14h21}
`;

const GenderWrapper = styled.div`
  display: flex;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 44px;
  margin-right: 32px;
`;

const CheckBoxGenderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
