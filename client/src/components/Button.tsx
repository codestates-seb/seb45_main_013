import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledButton = styled.button<{ widthsize: string | undefined; fontSize: string; usage: string | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.theme.fonts.join(', ')};

  width: ${(props) => (props.widthsize ? '100%' : null)};
  height: ${(props) => (props.widthsize ? '32px' : null)};
  padding: ${(props) => props.theme.spacing[4]} ${(props) => props.theme.spacing[8]};
  border: none;
  border-radius: ${(props) => props.theme.spacing[8]};

  background-color: ${(props) => (props.usage === 'google' ? props.theme.colors.white : props.theme.colors.mainBlue)};
  border: 1px solid ${(props) => (props.usage === 'google' ? props.theme.textColors.gray30 : null)};

  color: ${(props) => (props.usage === 'google' ? props.theme.textColors.gray30 : '#fff')};

  &:hover {
    background-color: ${(props) =>
      props.usage === 'google' ? props.theme.textColors.primary : props.theme.colors.subBlue};
  }

  &:active {
    background-color: ${(props) =>
      props.usage === 'google' ? props.theme.textColors.gray60 : props.theme.colors.darkBlue};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;

interface ButtonProps {
  text: string;
  usage?: string;
  fontSize?: string;
  link?: string;
  size?: string;
}

const Button = ({ text, usage, link, fontSize = '14px', size }: ButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };
  return (
    <StyledButton widthsize={size} fontSize={fontSize} usage={usage} onClick={handleClick}>
      {usage === 'google' ? <img src="/imgs/GoogleLogo.svg"></img> : null}
      <span>{text}</span>
    </StyledButton>
  );
};

export default Button;
