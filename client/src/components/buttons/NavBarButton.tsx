import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarButtonStyle = styled.button<{ children: React.ReactNode; isactive: string }>`
  flex-shrink: 0;
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding: 8px;
  border: none;
  background-color: white;
  font-weight: ${(props) =>
    props.isactive === 'true' ? props.theme.fontWeights.bold : props.theme.fontWeights.normal};
  color: ${(props) => (props.isactive === 'true' ? 'black' : props.theme.textColors.gray30)};
  border-bottom: ${(props) => (props.isactive === 'true' ? `3px solid ${props.theme.colors.mainBlue}` : null)};
  padding-bottom: 2px;
`;

interface NavBarButtonProps {
  children: React.ReactNode;
  isactive: string;
  onClick: () => void;
}

const NavBarButton = ({ children, isactive, onClick }: NavBarButtonProps) => {
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
      <NavBarButtonStyle isactive={isactive} onClick={onClick}>
        {children}
      </NavBarButtonStyle>
    </Link>
  );
};
export default NavBarButton;
