import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface NavBarButtonProps {
  children: React.ReactNode;
  link: string;
}

const NavBarButton = ({ children, link }: NavBarButtonProps) => {
  const { pathname } = useLocation();
  return (
    <Link to={link}>
      <NavBarButtonStyle isActive={pathname === link}>{children}</NavBarButtonStyle>
    </Link>
  );
};
export default NavBarButton;

const NavBarButtonStyle = styled.button<{ children: React.ReactNode; isActive: boolean }>`
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
