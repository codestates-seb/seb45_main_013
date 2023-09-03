import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <div>
        <img src="/imgs/Logo.svg" alt="logo"></img>
      </div>
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
  align-items: center;
  padding: 12px;
  box-shadow: ${(props) => props.theme.shadow.onlyBottom};

  height: 64px;
  background-color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;

  > button {
    border: none;
    background-color: white;
  }
`;
