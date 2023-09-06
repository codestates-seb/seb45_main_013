import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyPetItem = [
  // 추후 UseEffect로 데이터 받아올 데이터 (내 반려동물)
  {
    petId: 4,
    memberId: 1,
    type: 'CAT',
    name: '나비나비나비',
    age: 3,
    species: '코숏',
    weight: 5,
    photo: 'https://bucketUrl.s3.ap-northeast-2.amazonaws.com/ab7a57d8-48f4-40b6-aed2-742edb06dde0_cat002.jpeg',
    body: '착한냥이냥이냥이',
    male: null,
    neutering: null,
    createdAt: '2023-09-03T13:10:08.337088',
    lastModifiedAt: '2023-09-04T22:45:10.208151',
  },
];

const ReservationStepTwo = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <MainContainer>
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>2/3</PageNumberText>
      </StatusHeader>

      <ReservationContainer>
        {MyPetItem.map((item) => (
          <SelectPetContainer key={item.petId}>
            <SelectPetText>맡기시는 반려동물</SelectPetText>

            <SelectPetImgContainer>
              <SelectPetImg src={item.photo} alt="PetImg" />
              <SelectPetName>{item.name}</SelectPetName>
            </SelectPetImgContainer>
          </SelectPetContainer>
        ))}
      </ReservationContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.white};
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.textColors.secondary};
  min-height: 48px;
  gap: 120px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; //컨테이너 하단에 위치하도록 설정
    width: 240px; // 밑줄의 길이 설정
    height: 2px; // 밑줄의 두께 설정
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const BackImg = styled.img``;

const StatusTitleText = styled.div`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const PageNumberText = styled.div`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

const ReservationContainer = styled.div``;

const SelectPetContainer = styled.div`
  margin: 36px 212px 0 36px;
`;

const SelectPetText = styled.div`
  font-family: 'Noto Sans KR';
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const SelectPetImgContainer = styled.div``;

const SelectPetImg = styled.img`
  margin: 20px 0 0 36px;
`;

const SelectPetName = styled.div``;

export default ReservationStepTwo;
