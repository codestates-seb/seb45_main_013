import styled from 'styled-components';

const GoogleOAuthButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding-right: 28px;
  padding-left: 12px;
  border: 1px solid ${(props) => props.theme.textColors.gray40};
  border-radius: 8px;
  color: ${(props) => props.theme.textColors.gray60};
  background-color: white;
  width: 100%;
  font-family: 'Noto Sans KR';

  &:hover {
    background-color: ${(props) => props.theme.textColors.primary};
  }

  &:active {
    background-color: ${(props) => props.theme.textColors.gray50};
    box-shadow: ${(props) => props.theme.shadow.inset};
  }

  div {
    color: ${(props) => props.theme.textColors.gray40};
    ${(props) => props.theme.fontSize.s16h24};
  }
`;

interface ParentProps {
  children: string;
}

const GoogleOAuthButton = ({ children }: ParentProps) => {
  return (
    <GoogleOAuthButtonStyle>
      <img src="/imgs/GoogleLogo.svg" alt="google logo" width="24"></img>
      <div>{children}</div>
    </GoogleOAuthButtonStyle>
  );
};

export default GoogleOAuthButton;
