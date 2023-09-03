import { useState } from 'react';
import NavBarButton from '../buttons/NavBarButton';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = () => {
  const [activeButton, setActiveButton] = useState('홈');
  const handleNavButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
  };
  return (
    <Container>
      <HeaderContatiner>
        <TopHeader>
          <Link to="/">
            <img src="/imgs/Logo.svg" alt="logo"></img>
          </Link>
          <NotiUserContainer>
            <img src="/icons/Notification.svg" alt="notification_icon" width="24"></img>
            <img src="/icons/User.svg" alt="user_icon" width="24"></img>
          </NotiUserContainer>
        </TopHeader>
        <NavBar>
          <NavBarButton isActive={activeButton === '홈'} onClick={() => handleNavButtonClick('홈')}>
            홈
          </NavBarButton>
          <NavBarButton isActive={activeButton === '예약하기'} onClick={() => handleNavButtonClick('예약하기')}>
            예약하기
          </NavBarButton>
          <NavBarButton isActive={activeButton === '예약현황'} onClick={() => handleNavButtonClick('예약현황')}>
            예약현황
          </NavBarButton>
          <NavBarButton isActive={activeButton === '이용후기'} onClick={() => handleNavButtonClick('이용후기')}>
            이용후기
          </NavBarButton>
        </NavBar>
      </HeaderContatiner>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;
const HeaderContatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  padding: 12px 12px 0;
  background-color: white;
  max-width: 600px;
  box-shadow: ${(props) => props.theme.shadow.onlyBottom};
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NotiUserContainer = styled.nav`
  display: flex;
  gap: 12px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
`;
