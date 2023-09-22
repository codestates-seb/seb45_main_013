import { useEffect, useRef, useState } from 'react';
import NavBarButton from '../buttons/NavBarButton';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { IUser, deleteUser, login, setUser } from 'store/userSlice';
import { deleteCookie } from 'hooks/deleteCookie';
import { refreshAccessToken } from 'hooks/refreshAcessToken';

const apiUrl = process.env.REACT_APP_API_URL;

const NavHeader = () => {
  const accessToken = getCookieValue('access_token');
  const refreshToken = getCookieValue('refresh_token');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin, memberId, petsitterBoolean } = useSelector((state: IUser) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const NavItem = [
    { text: '홈', link: '/' },
    { text: '예약하기', link: '/reservation' },
    { text: '예약현황', link: `/cares` },
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

    navigate('/');
    alert('로그아웃 되었습니다.');
    window.location.reload();
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

  /// 유저 정보 가져오기
  useEffect(() => {
    if (accessToken || refreshToken) {
      const getUser = async () => {
        try {
          const response = await axios.get(`${apiUrl}/members/my-page`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          dispatch(login());
          dispatch(setUser(response.data));
        } catch (error: any) {
          console.log(error);
          if (error.response.data.status === 401 || error.response.data.status === 500) {
            try {
              const newAccessToken = await refreshAccessToken();
              if (newAccessToken) {
                const response = await axios.get(`${apiUrl}/members/my-page`, {
                  headers: { Authorization: `Bearer ${newAccessToken}` },
                });
                if (response) {
                  dispatch(login());
                  dispatch(setUser(response.data));
                }
              }
            } catch (refreshError) {
              console.error(refreshError);
              alert('로그인 세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
              navigate('/');
              dispatch(deleteUser());
              deleteCookie('access_token');
              deleteCookie('refresh_token');
            }
          }
        }
      };

      getUser();
    } else if (!accessToken && !refreshToken) {
      dispatch(deleteUser());
    }
  }, [isLogin, accessToken]);

  return (
    <Container>
      <HeaderContatiner>
        <TopHeader>
          <Link to="/">
            <img src="/imgs/Logo.svg" alt="logo"></img>
          </Link>
          <NotiUserContainer>
            <UserButton onClick={(e) => handleUserButton(e)}>
              {isLogin ? (
                <img src="/icons/User.svg" alt="user_icon" width="24" />
              ) : (
                <LoginNavLink to="/login">로그인/회원가입</LoginNavLink>
              )}
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
  z-index: 100;
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

// const NotiButton = styled.button`
//   width: 24px;
//   height: 24px;
//   border: none;
//   background-color: white;
//   cursor: pointer;
// `;

const UserButton = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
`;

const LoginNavLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.mainBlue};
  ${({ theme }) => theme.fontSize.s14h21}
  padding: 4px 8px;
  border-radius: 4px;
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.subBlue};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: ${({ theme }) => theme.shadow.inset};
  }
`;

const LoginNavModal = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 999;
  width: 100px;
  height: 80px;
  border-radius: 8px;
  background-color: white;
  gap: 12px;
  box-shadow: ${(props) => props.theme.shadow.dp03};
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
  justify-content: space-around;
  width: 100%;
`;
