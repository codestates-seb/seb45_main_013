import { styled } from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 32px;
  border: 1px solid ${(props) => props.theme.colors.mainBlue};
  border-radius: ${(props) => props.theme.spacing[8]};
`;

const LabelContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  padding: 0 8px;

  color: ${(props) => props.theme.textColors.gray30};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const InputStyle = styled.input`
  flex: 1;

  width: 100%;
  height: 100%;
  border: none;
  border-radius: ${(props) => props.theme.spacing[8]};

  font-size: ${(props) => props.theme.fontSizes.medium};

  font-family: ${(props) => props.theme.fonts.join(', ')};

  &:focus {
    outline: none;
  }
`;

interface InputProps {
  label: string;
  type?: string;
}

const Input = ({ label, type }: InputProps) => {
  return (
    <InputContainer>
      <LabelContainer>{label}</LabelContainer>
      <InputStyle type={type}></InputStyle>
    </InputContainer>
  );
};

export default Input;
