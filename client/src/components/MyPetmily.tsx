import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';

// 펫 이미지 없을 때 크기 수정

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
            <PetsButton>
              <img src="imgs/Plus.svg" alt="AddPets" />
            </PetsButton>
          </Link>
        )}
      </TextContainer>

      {petmily.length > 0 ? (
        petmily.map((pet) => (
          <Card key={pet.petId} variant="outlined" sx={{ width: '100%', mb: '32px' }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                {pet.photo ? (
                  <img src={pet.photo.replace(/https:\/\/bucketUrl/g, BucketUrl)} alt="pet" />
                ) : pet.type === 'CAT' ? (
                  <img src="imgs/CatProfile.png" alt="Cat" />
                ) : (
                  <img src="imgs//PetProfile.png" alt="Dog" />
                )}
              </AspectRatio>
              <Link to={`/mypage/${pet.petId}/edit`}>
                <PetsButton>
                  <img src="imgs/Edit.svg" alt="EditPets" />
                </PetsButton>
              </Link>
            </CardOverflow>
            <CardContent>
              <PetInfo>{pet.name}</PetInfo>
            </CardContent>
            <CardOverflow variant="soft">
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <PetInfo>
                  {pet.age}살 / {pet.weight}kg
                </PetInfo>
              </CardContent>
            </CardOverflow>
          </Card>
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
  font-weight: 900;
  ${(props) => props.theme.fontSize.s18h27};
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
  box-shadow: 0 2px 10px 0 #cdcdcd;
`;

const PetInfo = styled.div`
  margin-top: 4px;
  color: ${(props) => props.theme.textColors.gray00};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  ${(props) => props.theme.fontSize.s14h21};
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
