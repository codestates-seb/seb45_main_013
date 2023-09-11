import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const apiUrl = process.env.REACT_APP_API_URL;

const CreateJournal = () => {
  const navigate = useNavigate();
  const { petsitterId, reservationId } = useParams();

  useEffect(() => {
    try {
      axios.get(`${apiUrl}/reservations/${reservationId}`).then((res) => console.log(res));
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 404) {
        alert(error.response.data.message);
        navigate('/');
      }
    }
  }, []);
  return (
    <MainContainer>
      <div>
        <TitleReservationContainer>
          <Title>케어일지 작성</Title>
          <ReservationContainer>
            <FirstLine></FirstLine>
          </ReservationContainer>
        </TitleReservationContainer>
      </div>
    </MainContainer>
  );
};

export default CreateJournal;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  background-color: white;
  gap: 20px;
`;

const TitleReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  gap: 8px;
`;

const Title = styled.h1`
  ${(props) => props.theme.fontSize.s18h27}
`;

const ReservationContainer = styled.div`
  padding: 8px;
  border: none;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow.dp02};
`;

const ImgDiv = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColors.primary};
`;

const FirstLine = styled.div`
  display: flex;
  gap: 4px;
`;

const PetSitterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  div:nth-child(1) {
    ${(props) => props.theme.fontSize.s14h21}
    color:${(props) => props.theme.textColors.gray40}
  }

  dit:nth-child(2) {
    ${(props) => props.theme.fontSize.s16h24}
  }
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    text-align: right;
    color: ${(props) => props.theme.textColors.gray40};
    ${(props) => props.theme.fontSize.s14h21}
  }
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StarTitle = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ImgPreview = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const ImgPrevieItem = styled.div`
  position: relative;
  margin: 2px;
  padding: 4px;
`;

const Img = styled.img`
  width: 100px;
  border-radius: 8px;
`;

const ImgTitle = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
`;

const ImgSelectButton = styled.button`
  background-color: ${(props) => props.theme.colors.mainBlue};
  border: none;
  ${(props) => props.theme.fontSize.s14h21}
  padding:4px 8px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.colors.subBlue};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.darkBlue};
    box-shadow: ${(props) => props.theme.shadow.inset};
  }
`;

const ImgSelectWrapper = styled.div`
  display: flex;

  > div {
    ${({ theme }) => theme.fontSize.s12h18}
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border: 1px solid ${(props) => props.theme.lineColors.coolGray80};
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColors.primary};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TextTitle = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  border-radius: 8px;
  font-family: inherit;
  ${(props) => props.theme.fontSize.s14h21}
`;

const ButtonContainer = styled.div`
  > button {
    padding: 10px;
    width: 100%;
    ${({ theme }) => theme.fontSize.s16h24}
    background-color: ${({ theme }) => theme.colors.mainBlue};
    border-radius: 8px;
    border: none;
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.subBlue};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.darkBlue};
      box-shadow: ${({ theme }) => theme.shadow.inset};
    }
  }
`;
