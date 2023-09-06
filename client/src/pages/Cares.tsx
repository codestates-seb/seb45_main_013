import { useState } from 'react';
import styled from 'styled-components';

const Cares = () => {
  const [filter, setFilter] = useState('전체');

  console.log(filter);
  const handleFilter = (e: any) => {
    setFilter(e.target.innerText);
  };
  return (
    <MainContainer>
      <CareContainer>
        <FilterContainer>
          <FilterButtonStyle onClick={handleFilter}>전체</FilterButtonStyle>
          <FilterButtonStyle onClick={handleFilter}>예정</FilterButtonStyle>
          <FilterButtonStyle onClick={handleFilter}>완료</FilterButtonStyle>
        </FilterContainer>
        <CareCardConatainer>
          <CareCard>
            <FirstLine>
              <PetsitterContainer>
                <ImgDiv></ImgDiv>
                <PetsitterInfo>
                  <div>홍길동 펫시터님</div>
                </PetsitterInfo>
              </PetsitterContainer>
              <Pets>나비, 백구</Pets>
            </FirstLine>
            <SecondLine>
              <PlaceTimeWrapper>
                <div>서울 강남구 테헤란로 415 8층</div>
                <div>23년 8월 12일 9시 ~ 23년 8월 12일 18시</div>
              </PlaceTimeWrapper>
            </SecondLine>
            <ThirdLine>
              <ButtonContainer>
                <ApplicationButton>예약신청</ApplicationButton>
                <CancelButton>취소하기</CancelButton>
              </ButtonContainer>
            </ThirdLine>
          </CareCard>
        </CareCardConatainer>
      </CareContainer>
    </MainContainer>
  );
};

export default Cares;

const MainContainer = styled.main`
  height: 100%;
  background-color: white;
  padding: 12px;
`;

const CareContainer = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: flex;

  gap: 8px;
`;

const FilterButtonStyle = styled.div`
  padding: 4px 8px;
  background-color: red;
  border-radius: 4px;
`;

const CareCardConatainer = styled.div`
  padding-top: 16px;
`;

const CareCard = styled.div`
  padding: 12px;
  border: 1px solid ${(props) => props.theme.lineColors.coolGray80};
  border-radius: 8px;
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PetsitterContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const ImgDiv = styled.div`
  background-color: ${(props) => props.theme.textColors.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const PetsitterInfo = styled.div`
  display: flex;
  flex-direction: column;

  div:nth-child(1) {
    ${(props) => props.theme.fontSize.s16h24}
  }
`;
const Pets = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
`;

const SecondLine = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PlaceTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  div:nth-child(1) {
    text-align: right;
    ${(props) => props.theme.fontSize.s12h18}
  }
  div:nth-child(2) {
    text-align: right;
    ${(props) => props.theme.fontSize.s12h18}
  }
`;

const ThirdLine = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ApplicationButton = styled.div`
  background-color: white;
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.mainBlue};
  border-radius: 4px;
  font-family: inherit;
  ${(props) => props.theme.fontSize.s14h21}
`;

const CancelButton = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  border: none;
  ${(props) => props.theme.fontSize.s14h21}
  font-family:inherit;
`;
