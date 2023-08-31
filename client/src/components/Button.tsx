import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledButton = styled.button<{ fontSize: string; usage: string | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: ${(props) => (Number(props.fontSize) > 14 ? '32px' : null)};
  padding: ${(props) => props.theme.spacing[4]} ${(props) => props.theme.spacing[8]};
  border: ${(props) => (props.usage === 'google' ? `1px solid ${props.theme.textColors.gray30}` : 'none')};
  border-radius: ${(props) => (Number(props.fontSize) > 14 ? props.theme.spacing[8] : props.theme.spacing[4])};

  background-color: ${(props) => (props.usage === 'google' ? props.theme.colors.white : props.theme.colors.mainBlue)};

  color: ${(props) => (props.usage === 'google' ? props.theme.textColors.gray30 : '#fff')};
  font-size: ${(props) => `${props.fontSize}px`};

  font-family: ${(props) => props.theme.fonts.join(', ')};

  &:hover {
    background-color: ${(props) =>
      props.usage === 'google' ? props.theme.textColors.primary : props.theme.colors.subBlue};
  }

  &:active {
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%) inset;
    background-color: ${(props) =>
      props.usage === 'google' ? props.theme.textColors.gray60 : props.theme.colors.darkBlue};
  }
`;

interface ButtonProps {
  text: string;
  usage?: string;
  fontSize?: string;
  link?: string;
  size?: string;
}

const Button = ({ text, usage, link, fontSize = '14' }: ButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };
  return (
    <StyledButton fontSize={fontSize} usage={usage} onClick={handleClick}>
      {usage === 'google' ? <img src="/imgs/GoogleLogo.svg"></img> : null}
      <div style={{ flexShrink: 0 }}>{text}</div>
    </StyledButton>
  );
};

export default Button;
