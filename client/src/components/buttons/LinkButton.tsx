import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLinkButton = styled.button<{ fontSize: string; width: any; height: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: ${(props) => `${props.fontSize}px`};
  background-color: ${(props) => props.theme.colors.mainBlue};
  width: ${(props) => props.width || 'auto'}; //기본값 'auto'
  height: ${(props) => props.height || 'auto'}; //기본값 'auto'

  &:hover {
    background-color: ${(props) => props.theme.colors.subBlue};
  }

  &:active {
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%) inset;
    background-color: ${(props) => props.theme.colors.darkBlue};
  }

  a {
    text-decoration: none;
    color: white;
    flex-shrink: 0;

    &:visited {
      text-decoration: none;
    }
  }
`;

interface ButtonProps {
  text: string;
  fontSize?: string;
  link: string;
  width?: string;
  height?: string;
  onClick?: () => void; // onClick prop 추가
}

const LinkButton = ({ text, fontSize = '14', link, width, height, onClick }: ButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
    if (onClick) {
      // 외부에서 전달받은 OnClick이 있으면 실행
      onClick();
    }
  };
  return (
    <StyledLinkButton fontSize={fontSize} onClick={handleClick} width={width} height={height}>
      <a href={link}>{text}</a>
    </StyledLinkButton>
  );
};

export default LinkButton;
