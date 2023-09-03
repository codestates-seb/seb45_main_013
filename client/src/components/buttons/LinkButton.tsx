import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLinkButton = styled.button<{ fontSize: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: ${(props) => `${props.fontSize}px`};
  background-color: ${(props) => props.theme.colors.mainBlue};

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
}

const LinkButton = ({ text, fontSize = '14', link }: ButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };
  return (
    <StyledLinkButton fontSize={fontSize} onClick={handleClick}>
      <a href={link}>{text}</a>
    </StyledLinkButton>
  );
};

export default LinkButton;
