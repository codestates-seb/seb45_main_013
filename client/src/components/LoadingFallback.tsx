import { PulseLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingFallback = () => (
  <Container>
    <Loader loading={true} />
  </Container>
);
export default LoadingFallback;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Loader = styled(PulseLoader)`
  display: flex;
  color: ${({ theme }) => theme.colors.mainBlue};
`;
