import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const { isLogin } = useSelector((state: any) => state.user);

  return (
    <Container>
      <Link to="/">
        <img src="/imgs/Logo.svg" alt="logo"></img>
      </Link>
      <ButtonContainer>
        <button>
          <img src="/icons/Notification.svg" alt="notification_icon" width="24"></img>
        </button>
        <button>
          <img src="/icons/User.svg" alt="user_icon" width="24"></img>
        </button>
      </ButtonContainer>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  height: 64px;
  padding: 12px;
  background-color: white;
  box-shadow: ${(props) => props.theme.shadow.onlyBottom};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;

  > button {
    width: 24px;
    height: 24px;
    border: none;
    background-color: white;
  }
`;
