import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarButtonStyle = styled.button<{ children: React.ReactNode; isactive: string }>`
  flex-shrink: 0;
  padding: 8px;
  border: none;
  background-color: white;
  font-weight: ${(props) =>
    props.isactive === 'true' ? props.theme.fontWeights.extrabold : props.theme.fontWeights.bold};
  color: ${(props) => (props.isactive === 'true' ? 'black' : props.theme.textColors.gray30)};
  border-bottom: ${(props) => (props.isactive === 'true' ? `3px solid ${props.theme.colors.mainBlue}` : null)};
  padding-bottom: 8px;
  ${(props) => props.theme.fontSize.s14h21}
`;

interface NavBarButtonProps {
  children: React.ReactNode;
  isactive: string;
  memberId?: number;
  isPetsitter?: boolean;
  petsitterId?: number;
  onClick: () => void;
}

const NavBarButton = ({ children, isactive, memberId, isPetsitter, petsitterId, onClick }: NavBarButtonProps) => {
  return (
    <Link
      to={
        children === '홈'
          ? '/'
          : children === '예약하기'
          ? '/reservation'
          : children === '예약현황' && isPetsitter
          ? `/cares/petsitter/${petsitterId}`
          : children === '예약현황' && !isPetsitter
          ? `/cares/client/${memberId}`
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
