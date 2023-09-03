import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledBackButton = styled.button`
  border: none;
  background-color: white;
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
