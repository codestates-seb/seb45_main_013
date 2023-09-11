import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';

interface NavBarButtonProps {
  children: React.ReactNode;
  link: string;
}

const NavBarButton = ({ children, link }: NavBarButtonProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isLogin } = useSelector((state: IUser) => state.user);

  const handleClick = (e: any) => {
    const ClickedLink = e.target.innerText;
    if (!isLogin && (ClickedLink === '예약하기' || ClickedLink === '예약현황')) {
      alert('로그인 후 이용가능합니다.');
    } else {
      navigate(link);
    }
  };

  return (
    <NavBarButtonStyle isActive={pathname === link} onClick={handleClick}>
      {children}
    </NavBarButtonStyle>
  );
};
export default NavBarButton;

const NavBarButtonStyle = styled.button<{ isActive: boolean }>`
  flex-shrink: 0;
  padding: 8px;
  border: none;
  background-color: white;
  font-weight: ${({ theme, isActive }) => (isActive ? theme.fontWeights.extrabold : theme.fontWeights.bold)};
  color: ${({ theme, isActive }) => (isActive ? 'black' : theme.textColors.gray30)};
  border-bottom: ${({ theme, isActive }) => (isActive ? `2px solid ${theme.colors.mainBlue}` : null)};
  padding-bottom: 8px;
  margin-bottom: ${({ isActive }) => (isActive ? '-2px' : '0px')};
  ${(props) => props.theme.fontSize.s14h21}
`;
