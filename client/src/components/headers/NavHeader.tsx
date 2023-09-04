import { useEffect, useRef, useState } from 'react';
import NavBarButton from '../buttons/NavBarButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavHeader = () => {
  const [activeButton, setActiveButton] = useState('홈');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleNavButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
  };

  useEffect(() => {
    const handleOutsideClose = (e: any) => {
      console.log(isModalOpen);
      console.log(e.target);
      console.log(modalRef.current);
      if (isModalOpen && !modalRef.current?.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClose);

    return () => {
      document.removeEventListener('click', handleOutsideClose);
    };
  }, [isModalOpen]);

  return (
    <Container>
      <HeaderContatiner>
        <TopHeader>
          <Link to="/">
            <img src="/imgs/Logo.svg" alt="logo"></img>
          </Link>
          <NotiUserContainer>
            <NotiButton>
              <img src="/icons/Notification.svg" alt="notification_icon" width="24"></img>
            </NotiButton>
            <UserButton onClick={() => setIsModalOpen(true)}>
              <img src="/icons/User.svg" alt="user_icon" width="24"></img>
            </UserButton>
          </NotiUserContainer>
          {isModalOpen ? (
            <LoginNavModal ref={modalRef}>
              <Link to="/mypage">마이페이지</Link>
              <button>로그아웃</button>
            </LoginNavModal>
          ) : null}
        </TopHeader>
        <NavBar>
          <NavBarButton isactive={activeButton === '홈' ? 'true' : 'false'} onClick={() => handleNavButtonClick('홈')}>
            홈
          </NavBarButton>
          <NavBarButton
            isactive={activeButton === '예약하기' ? 'true' : 'false'}
            onClick={() => handleNavButtonClick('예약하기')}
          >
            예약하기
          </NavBarButton>
          <NavBarButton
            isactive={activeButton === '예약현황' ? 'true' : 'false'}
            onClick={() => handleNavButtonClick('예약현황')}
          >
            예약현황
          </NavBarButton>
          <NavBarButton
            isactive={activeButton === '이용후기' ? 'true' : 'false'}
            onClick={() => handleNavButtonClick('이용후기')}
          >
            이용후기
          </NavBarButton>
        </NavBar>
      </HeaderContatiner>
    </Container>
  );
};

export default NavHeader;

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

  width: 100%;
  height: 84px;
  padding: 12px 12px 0 12px;
  background-color: white;
  justify-content: space-between;
  max-width: 600px;
  box-shadow: ${(props) => props.theme.shadow.onlyBottom};
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const NotiUserContainer = styled.nav`
  display: flex;
  gap: 12px;
`;

const NotiButton = styled.button`
  border: none;
  background-color: white;
`;

const UserButton = styled.button`
  border: none;
  background-color: white;
`;

const LoginNavModal = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  z-index: 999;
  box-shadow: ${(props) => props.theme.shadow.dp01};
  border-radius: 8px;
  top: 12px;
  right: 12px;

  width: 100px;
  height: 80px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
`;
