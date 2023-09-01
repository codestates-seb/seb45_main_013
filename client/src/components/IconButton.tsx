import { styled } from 'styled-components';

/* 사용방법
<IconButton onClick={handleAddPets}>
<Icon src="imgs/PlusIcon.svg" alt="Icon" />
</IconButton>
*/

interface IconButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledIconButton = styled.button<IconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || '24px'};
  height: ${(props) => props.height || '24px'};
  border: none;
  border-radius: 50%;
  background-color: #cacaca;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const Icon = styled.img<{ width?: string; height?: string }>`
  width: ${(props) => props.width || '12px'};
  height: ${(props) => props.height || '12px'};
`;

const IconButton = ({ width, height, onClick, children }: IconButtonProps) => {
  return (
    <StyledIconButton width={width} height={height} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
};

export { IconButton, Icon };
