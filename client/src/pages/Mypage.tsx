import UserProfile from '../components/UserProfile';
import MyPetmily from '../components/MyPetmily';
import { styled } from 'styled-components';

const Container = styled.div`
  height: 100%;
  margin-top: 52px;
`;

const Mypage = () => {
  return (
    <Container>
      <UserProfile />
      <MyPetmily />
    </Container>
  );
};

export default Mypage;
