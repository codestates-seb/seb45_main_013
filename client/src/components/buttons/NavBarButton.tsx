import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const NavBarButtonStyle = styled.button<NavBarButtonProps>`
  flex-shrink: 0;
  padding: 8px;
  border: none;
  background-color: white;
  font-weight: ${(props) => (props.isActive ? props.theme.fontWeights.bold : props.theme.fontWeights.normal)};
  color: ${(props) => (props.isActive ? 'black' : props.theme.textColors.gray30)};
  border-bottom: ${(props) => (props.isActive ? `3px solid ${props.theme.colors.mainBlue}` : null)};
`;

interface NavBarButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavBarButton = ({ children, isActive, onClick }: NavBarButtonProps) => {
  return (
    <Link
      to={
        children === '홈'
          ? '/'
          : children === '예약하기'
          ? '/reservation'
          : children === '예약현황'
          ? '/cares'
          : '/reviews'
      }
    >
      <NavBarButtonStyle isActive={isActive} onClick={onClick}>
        {children}
      </NavBarButtonStyle>
    </Link>
  );
};
export default NavBarButton;
