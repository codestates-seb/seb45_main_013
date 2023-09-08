import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getCookieValue } from 'hooks/getCookie';
import NavBarButton from '../buttons/NavBarButton';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, login, setUser } from 'modules/userSlice';
// * 디자인 수정, CSS 변경, Arr로 관리, 함수 분리
const apiUrl = process.env.REACT_APP_API_URL;

const NavHeader = () => {
  const dispatch = useDispatch();
  const accessToken = getCookieValue('access_token');
  const { isLogin, memberId } = useSelector((state: IUser) => state.login);

  const NavItem = [
    {
      text: '홈',
      link: '/',
    },
    {
      text: '예약하기',
      link: '/reservation',
    },
    {
      text: '예약현황',
      link: `/cares/${memberId}`,
    },
    {
      text: '이용후기',
      link: '/reviews',
    },
  ];

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  // 로그인 확인
  const handleGetToken = async () => {
    try {
      if (accessToken) {
        const result = axios.get(`${apiUrl}/members/my-page`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (result) {
          dispatch(login());
          dispatch(setUser(result));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (accessToken) {
      handleGetToken();
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('click', handleOutsideClick);
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
          {isModalOpen && isLogin && (
            <LoginNavModal ref={modalRef}>
              <Link to="/mypage">마이페이지</Link>
              <button>로그아웃</button>
            </LoginNavModal>
          )}
        </TopHeader>
        <NavBar>
          {NavItem.map((nav) => (
            <NavBarButton key={nav.text} link={nav.link}>
              {nav.text}
            </NavBarButton>
          ))}
        </NavBar>
      </HeaderContatiner>
    </Container>
  );
};

export default NavHeader;

const Container = styled.header`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const HeaderContatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  background-color: white;
  max-width: 600px;
  box-shadow: ${(props) => props.theme.shadow.onlyBottom};
`;

const TopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

const NotiUserContainer = styled.nav`
  display: flex;
  gap: 12px;
`;

const NotiButton = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
`;

const UserButton = styled.button`
  border: none;
  cursor: pointer;
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
