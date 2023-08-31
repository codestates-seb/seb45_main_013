import styled from 'styled-components';

interface IconButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledIconButton = styled.button<IconButtonProps>`
  background-color: #CACACA;
  border: none;
  width: ${(props) => props.width || '24px'};
  height: ${(props) => props.height || '24px'};
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  
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
