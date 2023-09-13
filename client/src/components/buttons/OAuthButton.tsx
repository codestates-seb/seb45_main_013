import styled from 'styled-components';

interface Props {
  children: string;
}

const GoogleOAuthButton = ({ children }: Props) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleGooleOAuth = () => {
    window.location.assign(`${apiUrl}/oauth2/authorization/google`);
  };
  return (
    <GoogleOAuthButtonStyle onClick={handleGooleOAuth}>
      <img src="/imgs/GoogleLogo.svg" alt="google logo" width="24"></img>
      <div>{children}</div>
    </GoogleOAuthButtonStyle>
  );
};

export default GoogleOAuthButton;

const GoogleOAuthButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding-right: 80px;
  padding-left: 12px;
  border: 1px solid ${({ theme }) => theme.textColors.gray40};
  border-radius: 8px;
  color: ${({ theme }) => theme.textColors.gray60};
  background-color: white;
  font-family: inherit;

  &:hover {
    background-color: ${({ theme }) => theme.textColors.primary};
  }

  &:active {
    background-color: ${({ theme }) => theme.textColors.gray50};
    box-shadow: ${({ theme }) => theme.shadow.inset};
  }

  div {
    color: ${({ theme }) => theme.textColors.gray40};
    ${({ theme }) => theme.fontSize.s16h24};
  }
`;
