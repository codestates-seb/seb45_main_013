// * CSS, Props 수정
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface NavBarButtonProps {
  children: React.ReactNode;
  link: string;
}

const NavBarButton = ({ children, link }: NavBarButtonProps) => {
  const { pathname } = useLocation();
  return (
    <Link to={link} style={{ width: '100%' }}>
      <NavBarButtonStyle isActive={pathname === link}>{children}</NavBarButtonStyle>
    </Link>
  );
};
export default NavBarButton;

const NavBarButtonStyle = styled.button<{ isActive: boolean }>`
  width: 100%;
  flex: 1;
  border: none;
  background-color: white;
  font-weight: ${(props) => (props.isActive ? props.theme.fontWeights.extrabold : props.theme.fontWeights.bold)};
  color: ${(props) => (props.isActive ? 'black' : props.theme.textColors.gray30)};
  border-bottom: ${(props) => (props.isActive ? `2px solid ${props.theme.colors.mainBlue}` : null)};
  padding-bottom: 8px;
  margin-bottom: ${(props) => (props.isActive ? '-2px' : '0px')};
  ${(props) => props.theme.fontSize.s14h21};
`;
