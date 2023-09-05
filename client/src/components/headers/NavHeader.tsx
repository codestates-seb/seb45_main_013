import { useEffect, useRef, useState } from 'react';
import NavBarButton from '../buttons/NavBarButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { setUser } from 'modules/userSlice';

const NavHeader = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { isLogin, memberId, name, nickName } = useSelector((state: any) => state.login);

  console.log(isLogin, memberId, name, nickName);

  const [activeButton, setActiveButton] = useState('홈');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleNavButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
  };

  useEffect(() => {
    const accessToken = getCookieValue('access_token');

    axios.get(`${apiUrl}/members/my-page`, { headers: { Authorization: `Bearer ${accessToken}` } }).then((data) => {
      console.log(data.data);
      dispatch(setUser(data.data));
    });
  }, [isLogin]);

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

  position: relative;
`;

const NotiUserContainer = styled.nav`
  display: flex;
  gap: 12px;
`;

const NotiButton = styled.button`
  border: none;
  background-color: white;
  width: 24px;
  height: 24px;
`;

const UserButton = styled.button`
  border: none;
  background-color: white;
`;

const LoginNavModal = styled.nav`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 999;
  width: 100px;
  height: 80px;
  border-radius: 8px;
  background-color: white;
  box-shadow: ${(props) => props.theme.shadow.dp01};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
`;
