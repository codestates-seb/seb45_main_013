import { useState } from 'react';
import styled from 'styled-components';

const RegisterPet = () => {
  const [isCat, setIsCat] = useState(false);
  const [gender, setGender] = useState(null);

  console.log(gender);

  const handleGenderCheck = (e: any) => {
    setGender(e.target.value);
  };

  return (
    <MainContainer>
      <div></div>
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
          <InputStyle type="text" id="username" />
        </RegisterInputWrapper>
        <RegisterInputWrapper>
          <GenderText>성별</GenderText>
          <GenderWrapper>
            <CheckBoxContainer>
              <CheckBoxGenderWrapper>
                <img src="/icons/MaleIcon.svg" alt="maleIcon"></img>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleGenderCheck}
                  checked={gender === 'male'}
                ></input>
              </CheckBoxGenderWrapper>
              <CheckBoxGenderWrapper>
                <img src="/icons/FemaleIcon.svg" alt="femaleIcon"></img>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleGenderCheck}
                  checked={gender === 'female'}
                ></input>
              </CheckBoxGenderWrapper>
            </CheckBoxContainer>
          </GenderWrapper>
        </RegisterInputWrapper>
        <RegisterInputWrapper>
          <InputLabelStyle htmlFor="username">품종</InputLabelStyle>
          <InputStyle type="text" id="username" />
        </RegisterInputWrapper>
        <RegisterInputWrapper>
          <InputLabelStyle htmlFor="username">몸무게</InputLabelStyle>
          <InputStyle type="text" id="username" />
        </RegisterInputWrapper>
        <RegisterInputWrapper>
          <InputLabelStyle htmlFor="username">나의 펫소개</InputLabelStyle>
          <InputStyle type="text" id="username" />
        </RegisterInputWrapper>
      </InputContainer>
    </MainContainer>
  );
};
export default RegisterPet;

const MainContainer = styled.main`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 32px;

  width: 272px;
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

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 288px;
  margin-top: 60px;
  gap: 24px;
`;

const RegisterInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputLabelStyle = styled.label`
  ${(props) => props.theme.fontSize.s14h21}
`;

const InputStyle = styled.input`
  padding: 8px;
  height: 32px;
  width: 208px;
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
