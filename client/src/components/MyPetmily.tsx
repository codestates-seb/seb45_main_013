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

        const petmily = getPets.data;
        setPetmily(petmily);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchData();
  }, []);

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
                </Line>
                <Line>
                  <PetInfo>
                    {pet.male ? '남아' : '여아'}, {pet.age}살
                  </PetInfo>
                </Line>
                <Line>
                  <PetInfo>{pet.species}</PetInfo>
                </Line>
                <AdditionalInfo>
                  <Line>
                    <Item>중성화</Item>
                    <Info>{pet.neutering ? 'O' : 'X'}</Info>
                  </Line>
                  <Line>
                    <Item>몸무게</Item>
                    <Info>{pet.weight}kg</Info>
                  </Line>
                  <Line>
                    <Item>펫 소개</Item>
                    <Info>{pet.body ? pet.body : '펫 소개를 작성해주세요!'}</Info>
                  </Line>
                </AdditionalInfo>
              </PetInfoContainer>
              <ButtonContainer>
                <Link to={`/mypage/${pet.petId}/edit`}>
                  <Button sx={{ color: '#279eff', mt: 5 }}>수정하기</Button>
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
  justify-content: center;
  width: 100%;
`;

const PetPhoto = styled.img`
  width: 160px;
  height: 160px;
  margin-bottom: 20px;
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

const PetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin-top: 8px;
`;

const Text = styled.div`
  font-weight: 900;
  font-size: 18px;
`;

const Item = styled.div`
  color: #279eff;
  font-weight: 900;
  font-size: 16px;
`;

const PetName = styled.div`
  display: inline-block;
  font-weight: 900;
  font-size: 18px;
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
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 #cdcdcd;
`;

const PetInfo = styled.span`
  margin-top: 4px;
  color: #a1a1a1;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s16h24};
`;

const Info = styled.span`
  margin-left: 20px;
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
  margin: 0;
  color: gray;

  &:hover {
    color: #279eff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;
export default MyPetmily;
