import { useEffect } from 'react';
import BackButton from '../../components/buttons/BackButton';
import styled from 'styled-components';
import { getCookieValue } from 'hooks/getCookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, login, setUser } from 'modules/userSlice';

const Container = styled.header`
  width: 100%;
  height: 64px;
  padding: 20px 8px;
  background-color: white;
`;

const BackHeader = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { isLogin } = useSelector((state: IUser) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookieValue('access_token');

    if (accessToken) {
      axios
        .get(`${apiUrl}/members/my-page`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          dispatch(login());
          dispatch(setUser(res.data));
        })
        .catch((error) => console.log(error));
    }
  }, [isLogin]);
  return (
    <Container>
      <BackButton></BackButton>
    </Container>
  );
};

export default BackHeader;
