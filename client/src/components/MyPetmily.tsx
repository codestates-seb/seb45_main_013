import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// 버튼 수정

// 지우기
// const petmily = [];
const petmily = [1];

const MyPetmily = () => {
  /* const handleEditPets = () => {
  };


  const handleAddPets = () => {
  };
   */
  return (
    <PetmilyContainer>
      <TextContainer>
        <Text>나의 Petmily</Text>
        {petmily.length > 0 && (
          <Link to="/mypage/register">
            <PetsButton /*onClick={handleAddPets}*/>
              <img src="imgs/Plus.svg" alt="AddPets" />
            </PetsButton>
          </Link>
        )}
      </TextContainer>

      {petmily.length > 0 ? (
        <PetmilyCard>
          {/* <CatOrDog src="imgs/CatIcon.svg" alt="Img" /> */}
          <div style={{ display: 'flex', justifyContent: 'end', padding: '4px' }}>
            <Link to="/mypage/pets/edit">
              <PetsButton /*onClick={handleEditPets}*/>
                <img src="imgs/Edit.svg" alt="EditPets" />
              </PetsButton>
            </Link>
          </div>
          <PetInfoContainer>
            <PetImg
              src="https://mblogthumb-phinf.pstatic.net/20160809_55/aplusah7582_1470731982453vnYwJ_JPEG/image_1691272651470727942346.jpg?type=w800"
              alt="Img"
            />
            <PetInfo>냥이 / 여아 </PetInfo>
            <PetInfo>브리티시 숏헤어</PetInfo>
            <PetInfo>16살 / 12kg</PetInfo>
          </PetInfoContainer>
        </PetmilyCard>
      ) : (
        <NoPetsContainer>
          <div>등록된 펫밀리가 없습니다.</div>
          <div>프로필을 등록하면 빠른 예약이 가능해요!</div>
          <Link to="/mypage/register">
            <Button variant="contained" sx={{ backgroundColor: '#279eff', mt: 5 }}>
              등록하러 가기
            </Button>
          </Link>
        </NoPetsContainer>
      )}
    </PetmilyContainer>
  );
};

// petmily 카드 컨테이너
const PetmilyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 18px;
  font-family: 'Noto Sans';
`;

const PetsButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  cursor: pointer;
  background-color: none;
`;

// 등록된 petmily 카드
const PetmilyCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 #cdcdcd;
`;

const PetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PetImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
const PetInfo = styled.div`
  margin-top: 4px;
  color: ${(props) => props.theme.textColors.gray00};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s14h21};
`;

// 반려동물이 없을 때
const NoPetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > div {
    margin-bottom: 30px;
  }
`;

export default MyPetmily;
