import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledBackButton = styled.button`
  position: relative;
  z-index: 2;
  border: none;
  background-color: transparent;
`;

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <StyledBackButton onClick={() => navigate(-1)}>
      <img src="/icons/BackButton.svg" alt="back" width="20" />
    </StyledBackButton>
  );
};

export default BackButton;
