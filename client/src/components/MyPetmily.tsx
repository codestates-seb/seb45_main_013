import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useState, useEffect } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// 펫 이미지 없을 때 디폴트 이미지 수정
// 펫밀리 카드 디자인 수정

const BucketUrl = process.env.REACT_APP_BUCKET_URL || '';
const apiUrl = process.env.REACT_APP_API_URL;

const MyPetmily = () => {
  const token = getCookieValue('access_token');
  const [petmily, setPetmily] = useState<any[]>([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const getPets = await axios.get(`${apiUrl}/pets`, { headers });
        console.log(getPets);
        const petmily = getPets.data;
        setPetmily(petmily);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchData();
  }, []);

  console.log(petmily);

  return (
    <PetmilyContainer>
      <TextContainer>
        <Text>나의 Petmily</Text>
        {petmily.length > 0 && (
          <Link to="/mypage/register">
            <PlusIcon />
          </Link>
        )}
      </TextContainer>

      <CardsContainer>
        {petmily.length > 0 ? (
          petmily.map((pet) => (
            <PetmilyCard key={pet.petId}>
              <ImageContainer>
                {pet.photo ? (
                  <PetPhoto src={pet.photo.replace(/https:\/\/bucketUrl/g, BucketUrl)} alt="pet" />
                ) : pet.type === 'CAT' ? (
                  <PetPhoto src="imgs/CatProfile.png" alt="Cat" />
                ) : (
                  <PetPhoto src="imgs//PetProfile.png" alt="Dog" />
                )}
              </ImageContainer>
              <PetInfoContainer>
                <Line>
                  <PetName>{pet.name}</PetName>
                  <PetInfo>{pet.species}</PetInfo>
                </Line>
                <Line>
                  <PetInfo>{pet.male ? '남자아이' : '여자아이'}</PetInfo>
                  <PetInfo>{pet.neutering && '중성화'}</PetInfo>
                </Line>
                <Line>
                  <PetInfo> {pet.age}살 </PetInfo>
                  <PetInfo>{pet.weight}kg</PetInfo>
                </Line>
              </PetInfoContainer>
              <ButtonContainer>
                <Link to={`/mypage/${pet.petId}/edit`}>
                  <Button>수정하기</Button>
                </Link>
              </ButtonContainer>
            </PetmilyCard>
          ))
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
      </CardsContainer>
    </PetmilyContainer>
  );
};

// petmily 카드 컨테이너
const PetmilyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PetPhoto = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const Text = styled.div`
  font-weight: 900;
  font-size: 18px;
`;

const PetName = styled.div`
  font-weight: 900;
  font-size: 18px;
  display: inline-block;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PetsButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  cursor: pointer;
  background-color: none;
`;

// 등록된 petmily 카드
export const PetmilyCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px 0 #cdcdcd;
`;

const PetInfo = styled.span`
  margin-top: 4px;
  color: ${(props) => props.theme.textColors.gray00};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s16h24};
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

const PlusIcon = styled(AddCircleOutlineIcon)`
  color: gray;
  margin: 0;
  &:hover {
    color: #279eff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
export default MyPetmily;
