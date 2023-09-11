import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from '../store/userSlice';

const MyPetmily = () => {
  // 지우기
  const { name, memberId } = useSelector((state: IUser) => state.user);

  const token = getCookieValue('access_token');

  const [petmily, setPetmily] = useState<any[]>([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const getPets = await axios.get(`${process.env.REACT_APP_API_URL}/pets`, { headers });
        console.log(getPets);
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
            <PetsButton>
              <img src="imgs/Plus.svg" alt="AddPets" />
            </PetsButton>
          </Link>
        )}
      </TextContainer>

      {petmily.length > 0 ? (
        petmily.map((pet, petId) => (
          <PetmilyCard key={petId}>
            <div style={{ display: 'flex', justifyContent: 'end', padding: '4px' }}>
              <Link to="/mypage/pets/edit">
                <PetsButton>
                  <img src="imgs/Edit.svg" alt="EditPets" />
                </PetsButton>
              </Link>
            </div>
            <PetInfoContainer>
              {pet.photo ? <PetImg src={pet.photo} alt="pet" /> : <PetImg src="imgs/Pet.svg" alt="Default" />}
              <PetInfo>
                {pet.name} / {pet.gender}
              </PetInfo>
              <PetInfo>{pet.breed}</PetInfo>
              <PetInfo>
                {pet.age}살 / {pet.weight}kg
              </PetInfo>
            </PetInfoContainer>
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
