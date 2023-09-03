import BackButton from '../../components/buttons/BackButton';
import { styled } from 'styled-components';

const Container = styled.header`
  width: 100%;
  height: 64px;
  padding: 20px;
  background-color: white;
`;

const BackHeader = () => {
  return (
    <Container>
      <BackButton></BackButton>
    </Container>
  );
};

export default BackHeader;
