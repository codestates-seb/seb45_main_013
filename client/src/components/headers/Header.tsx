import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { setUser } from 'modules/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state: any) => state.login);

  useEffect(() => {
    const accessToken = getCookieValue('access_token');

    axios.get(`${apiUrl}/members/my-page`, { headers: { Authorization: `Bearer ${accessToken}` } }).then((data) => {
      console.log(data.data);
      dispatch(setUser(data.data));
    });
  }, [isLogin]);
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

  height: 64px;
  padding: 12px;
  background-color: white;
  box-shadow: ${(props) => props.theme.shadow.onlyBottom};
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;

  gap: 12px;

  > button {
    border: none;
    background-color: white;
    width: 24px;
    height: 24px;
  }
`;
