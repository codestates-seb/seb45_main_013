import { useEffect, useRef, useState } from 'react';
import NavBarButton from '../buttons/NavBarButton';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { IUser, deleteUser, login, setUser } from 'store/userSlice';
import { deleteCookie } from 'hooks/deleteCookie';

const NavHeader = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin, memberId } = useSelector((state: IUser) => state.user);
  console.log('로그인: ', isLogin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const NavItem = [
    { text: '홈', link: '/' },
    { text: '예약하기', link: '/reservation' },
    { text: '예약현황', link: `/cares/${memberId}` },
    { text: '이용후기', link: '/reviews' },
  ];

  const handleUserButton = (e: any) => {
    if (!isLogin) {
      navigate('/login');
    } else if (isLogin) {
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  // 모달 외부 클릭 시 모달을 닫는 이벤트 핸들러
  const handleOutsideClick = (e: MouseEvent) => {
    if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const handleLogout = () => {
    setIsModalOpen(false);
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    dispatch(deleteUser());

    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  useEffect(() => {
    if (isModalOpen) {
      // 모달이 열려있을 때만 클릭 이벤트 리스너를 추가
      window.addEventListener('click', handleOutsideClick);
    } else {
      // 모달이 닫혔을 때는 클릭 이벤트 리스너를 제거
      window.removeEventListener('click', handleOutsideClick);
    }

    // 컴포넌트 언마운트 시 클릭 이벤트 리스너를 정리
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isModalOpen]);

  // 유저 정보 가져오기
  useEffect(() => {
    const accessToken = getCookieValue('access_token');
    const refreshToken = getCookieValue('refresh_token');

    if (accessToken) {
      axios
        .get(`${apiUrl}/members/my-page`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log(res);
          dispatch(login());
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          console.log(error);
          dispatch(deleteUser());
          // access token 재발급
          if (error.response.data.status === 401) {
            const refreshToken = getCookieValue('refresh_token');
            axios
              .post(`${apiUrl}/refreshToken`, { headers: { Authorization: `Bearer ${refreshToken}` } })
              .then((res) => {
                if (res.data.access_token) {
                  document.cookie = `access_token=${res.data.accessToken}; path=/;`;
                }
              })
              .catch((error) => console.log(error));
          }
        });
    } else if (!accessToken || !refreshToken) {
      dispatch(deleteUser());
    }
  }, [isLogin]);

  console.log(isModalOpen);

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
            <UserButton onClick={(e) => handleUserButton(e)}>
              <img src="/icons/User.svg" alt="user_icon" width="24"></img>
            </UserButton>
          </NotiUserContainer>
          {isModalOpen && isLogin && (
            <LoginNavModal ref={modalRef} onMouseLeave={() => setIsModalOpen(false)}>
              <MypageLink to="/mypage" onClick={() => setIsModalOpen(false)}>
                마이페이지
              </MypageLink>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
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
  align-items: center;
`;

const NotiUserContainer = styled.nav`
  display: flex;
  gap: 12px;
`;

const NotiButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const UserButton = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
`;

const LoginNavModal = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  gap: 12px;
  top: 24px;
  right: 24px;
  width: 100px;
  height: 80px;
  border-radius: 8px;
  background-color: white;
  box-shadow: ${(props) => props.theme.shadow.dp03};
  z-index: 999;
`;

const MypageLink = styled(Link)`
  color: black;
  ${({ theme }) => theme.fontSize.s14h21}
  cursor:pointer;
`;

const LogoutButton = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  ${({ theme }) => theme.fontSize.s14h21};
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;
