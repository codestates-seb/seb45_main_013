import { BarLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingFallback = () => (
  <Container>
    <Loader loading={true} />
  </Container>
);
export default LoadingFallback;

const Container = styled.div``;

const Loader = styled(BarLoader)`
  color: ${({ theme }) => theme.colors.mainBlue};
`;
