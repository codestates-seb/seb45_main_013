import { styled } from 'styled-components';
import { IconButton, Icon } from './IconButton';

// petmily 카드 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.white};
`;

const Text = styled.div`
  margin-bottom: 12px;
  color: ${(props) => props.theme.textColors.gray30};
  font-weight: 800;
  font-size: ${(props) => props.theme.fontSize.s16h24};
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

// 강아지 or 고양이
const CatOrDog = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 8px;
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

// 버튼 컨테이너 (수정, 삭제)
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// 펫 추가 버튼 가운데
const AddPet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

// 유저의 펫 수 만큼 카드 만들기
// 버튼 함수 작성하기

const MyPetmily = () => {
  /* const handleEdit = () => {
  };

  const handleDelete = () => {
  };

  const handleAddPets = () => {
  };
   */
  return (
    <Container>
      <Text>나의 Petmily</Text>
      <PetmilyCard>
        <CatOrDog src="imgs/CatIcon.svg" alt="Img" />
        <PetInfoContainer>
          <PetImg
            src="https://m.hollycat.co.kr/web/product/medium/202109/f5443b4361cbebfde529f9d29577b705.jpg"
            alt="Img"
          />
          <PetInfo>🚺 / 냥이</PetInfo>
          <PetInfo>브리티시 숏헤어</PetInfo>
          <PetInfo>16살 / 12kg</PetInfo>
        </PetInfoContainer>
        <ButtonContainer>
          <IconButton /*onClick={handleEdit}*/>
            <Icon src="imgs/EditIcon.svg" alt="Icon" />
          </IconButton>
          <IconButton /*onClick={handleDelete}*/>
            <Icon src="imgs/DeleteIcon.svg" alt="Icon" />
          </IconButton>
        </ButtonContainer>
      </PetmilyCard>

      <AddPet>
        <IconButton /*onClick={handleAddPets}*/>
          <Icon src="imgs/PlusIcon.svg" alt="Icon" />
        </IconButton>
      </AddPet>
    </Container>
  );
};

export default MyPetmily;
