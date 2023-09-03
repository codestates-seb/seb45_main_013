import { styled } from 'styled-components';
import { useState } from 'react';
import MyPetmily from '../components/MyPetmily';

// ${(props) => props.theme.colors.white}
// Q: 호버시 이미지 색상 변화
// 아이콘 메뉴 간격
// 회원정보 수정 페이지

// 전체 페이지
const MypageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 100%;
  padding: 60px;
`;

// 유저 컨테이너
const MyProfileContianer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-bottom: 30px;
`;

const MyPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const TextField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NameText = styled.div`
  /* font-size: 20px;
  font-weight: 700;
  font-family: 'Noto Sans'; */
  ${(props) => props.theme.fontSize.s20h30};
  ${(props) => props.theme.fontWeights.bold};
`;

const HelloText = styled.div`
  ${(props) => props.theme.fontSize.s20h30};
  font-weight: 600;
`;

// 메뉴 컨테이너
const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const MenuItem = styled.button`
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const MenuImage = styled.img`
  width: auto;
  height: 24px;
`;

// 호버 시 이미지 변화
const menuItems = [
  {
    id: 1,
    originalImage: 'imgs/Calendar.svg',
    hoveredImage: 'imgs/CalendarBlue.svg',
    title: '나의 예약',
  },
  {
    id: 2,
    originalImage: 'imgs/Diary.svg',
    hoveredImage: 'imgs/DiaryBlue.svg',
    title: '케어 일지',
  },
  {
    id: 3,
    originalImage: 'imgs/Heart.svg',
    hoveredImage: 'imgs/HeartBlue.svg',
    title: '자주 찾는 펫시터',
  },
];

const Title = styled.span`
  font-size: 14px;
  margin-top: 10px;
`;

const EditLink = styled.a`
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 30px;
`;

const Mypage = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleMouseOver = (itemId: number) => {
    setHoveredItem(itemId);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };
  return (
    <MypageContainer>
      <MyProfileContianer>
        <MyPhoto
          src="https://brandsmkt.com/wp-content/uploads/2020/06/dog-lover-760x506-1-696x463.jpg"
          alt="user profile image"
        />
        <TextField>
          <NameText>김코딩 님</NameText>
          <HelloText>안녕하세요!</HelloText>
        </TextField>
      </MyProfileContianer>

      <MenuContainer>
        {menuItems.map((item) => (
          <MenuItem key={item.id} onMouseOver={() => handleMouseOver(item.id)} onMouseOut={handleMouseOut}>
            <MenuImage
              src={hoveredItem === item.id ? item.hoveredImage : item.originalImage}
              alt={`Button ${item.id}`}
            />
            <Title>{item.title}</Title>
          </MenuItem>
        ))}
      </MenuContainer>
      <EditLink href="/edit/myprofile">회원정보 수정</EditLink>
      <MyPetmily />
    </MypageContainer>
  );
};

export default Mypage;
