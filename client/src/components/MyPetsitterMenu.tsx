import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyPetsitterMenu = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const handleMouseOver = (itemId: string) => {
    setHoveredItem(itemId);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };

  //    링크 수정하기
  const menuItems = [
    {
      id: '/reservation',
      originalImage: 'imgs/Calendar.svg',
      hoveredImage: 'imgs/CalendarBlue.svg',
      title: '예약 관리',
    },
    {
      id: '/cares',
      originalImage: 'imgs/Diary.svg',
      hoveredImage: 'imgs/DiaryBlue.svg',
      title: '케어 일지',
    },
    {
      id: '/mypage/edit',
      originalImage: 'imgs/User.svg',
      hoveredImage: 'imgs/UserBlue.svg',
      title: '회원정보 수정',
    },
  ];

  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <MenuItem key={item.id} onMouseOver={() => handleMouseOver(item.id)} onMouseOut={handleMouseOut}>
          <StyledLink to={item.id}>
            <MenuItemWrapper>
              <MenuImage
                src={hoveredItem === item.id ? item.hoveredImage : item.originalImage}
                alt={`Button ${item.id}`}
              />
              <Title>{item.title}</Title>
            </MenuItemWrapper>
          </StyledLink>
        </MenuItem>
      ))}
    </MenuContainer>
  );
};

// 메뉴 컨테이너
const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
`;

const MenuItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border: none;
  text-align: center;
  cursor: pointer;
  background-color: white;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const MenuImage = styled.img`
  width: auto;
  height: 24px;
`;

const Title = styled.span`
  margin-top: 10px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
export default MyPetsitterMenu;
