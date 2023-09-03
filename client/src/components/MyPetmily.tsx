import { styled } from 'styled-components';
import Button from '../components/Button';

// 펫 없을 때 버튼 (버튼 컴포넌트 props에 스타일 추가)

// 지우기
// const petmily = [];
const petmily = [
  {
    pet: 'dog',
    id: 3,
    sex: 'boy',
    name: 'Hotdog',
    age: 4,
    weight: '9kg',
    species: 'poodle',
  },
];

// petmily 카드 컨테이너
const PetmilyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 18px;
  font-family: 'Noto Sans';
  margin-bottom: 30px;
`;

const PetsButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  cursor: pointer;
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
// const CatOrDog = styled.img`
//   width: 30px;
//   height: 30px;
//   margin-left: 8px;
// `;

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

// 버튼 컨테이너 (수정, 삭제) -> 수정만??
// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
// `;

// 반려동물이 없을 때
const NoPetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  & > div {
    margin-bottom: 30px;
  }
`;

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
          <PetsButton /*onClick={handleAddPets}*/>
            <img src="imgs/Plus.svg" alt="AddPets" />
          </PetsButton>
        )}
      </TextContainer>

      {petmily.length > 0 ? (
        <PetmilyCard>
          {/* <CatOrDog src="imgs/CatIcon.svg" alt="Img" /> */}
          <PetsButton /*onClick={handleEditPets}*/>
            <img src="imgs/Edit.svg" alt="AddPets" />
          </PetsButton>
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
          <Button text="등록하기" /*link=""*/ style={{ width: '30%', height: '30px' }} />
        </NoPetsContainer>
      )}
    </PetmilyContainer>
  );
};

export default MyPetmily;
