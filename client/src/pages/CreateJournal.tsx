import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from 'store/userSlice';
import styled, { keyframes } from 'styled-components';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const CreateJournal = () => {
  const navigate = useNavigate();
  const { petsitterId, reservationId } = useParams();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [reservation, setReservation] = useState<any>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [journalText, setJournalText] = useState('');

  const { isLogin, petsitterBoolean } = useSelector((state: IUser) => state.user);

  let year, month, day;
  if (reservation && reservation.reservationDay) {
    [year, month, day] = reservation.reservationDay.split('-');
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (selectedFiles.length + files.length <= 5) {
        setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      } else {
        alert('최대 5개의 이미지를 선택할 수 있습니다.');
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    // 해당 인덱스의 이미지를 목록에서 제거
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 리뷰 등록
  const handleSubmit = async () => {
    const accessToken = getCookieValue('access_token');
    setIsRegisterLoading(true);

    if (accessToken && isLogin) {
      const formData = new FormData();
      formData.append('reservationId', reservation.reservationId);
      formData.append('body', journalText);
      if (selectedFiles) {
        selectedFiles.map((file) => formData.append('file', file));
      }

      try {
        const response = await axios.post(`${apiUrl}/journals`, formData, {
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      setIsRegisterLoading(false);
    }
  };

  console.log(reservation);

  useEffect(() => {
    if (isLogin && petsitterBoolean) {
      try {
        axios.get(`${apiUrl}/reservations/${reservationId}`).then((res) => setReservation(res.data));
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
          alert(error.response.data.message);
          navigate('/');
        }
      }
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     axios.get(`${apiUrl}/journals/${}`)
  //   } catch (error) {}
  // }, []);

  return (
    <MainContainer>
      <TitleReservationContainer>
        <Title>케어일지 작성</Title>
        <ReservationContainer>
          <FirstLine>
            <InfoContainer>
              {reservation?.photo ? (
                <ImgPhoto src={reservation.photo.replace(/https:\/\/bucketUrl/g, `${bucketUrl}`)} alt="client" />
              ) : (
                <EmptyImgDiv />
              )}
              <ClientInfo>
                <div>예약번호: {reservation?.reservationId}</div>
                <div>{reservation?.name} 고객님</div>
              </ClientInfo>
            </InfoContainer>
            <div>나비 백구</div>
          </FirstLine>
          <SecondLine>
            <div>{reservation?.address}</div>
            {reservation?.reservationDay && (
              <div>
                {year.split('20')[1]}년 {month}월 {day}일 {reservation.reservationTimeStart.slice(0, 5)} ~{' '}
                {year.split('20')[1]}년 {month}월 {day}일 {reservation.reservationTimeEnd.slice(0, 5)}
              </div>
            )}
          </SecondLine>
        </ReservationContainer>
      </TitleReservationContainer>
      <ImgContainer>
        <ImgTitle>사진 첨부</ImgTitle>
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <ImgSelectWrapper>
          <ImgSelectButton onClick={openFileInput}>파일 선택</ImgSelectButton>
          <div>최대 5개의 이미지를 선택할 수 있습니다.</div>
        </ImgSelectWrapper>
        <ImgPreview>
          {selectedFiles.map((file, index) => (
            <ImgPrevieItem key={index} className="image-preview-item">
              <Img src={URL.createObjectURL(file)} alt={`Selected ${index}`} />
              <RemoveButton onClick={() => handleRemoveImage(index)}>
                <img src="/icons/X.png" alt="x" width="10"></img>
              </RemoveButton>
            </ImgPrevieItem>
          ))}
        </ImgPreview>
      </ImgContainer>
      <TextContainer>
        <TextTitle>리뷰</TextTitle>
        <TextArea placeholder="케어 중 무슨 일이 있었나요?" onChange={(e) => setJournalText(e.target.value)} />
      </TextContainer>
      <ButtonContainer>
        <button onChange={handleSubmit}>케어일지 등록</button>
        {isRegisterLoading && (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}
      </ButtonContainer>
    </MainContainer>
  );
};

export default CreateJournal;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: 16px;
  background-color: white;
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

const ImgPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const EmptyImgDiv = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColors.primary};
`;

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const ClientInfo = styled.div`
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
  align-items: center;
  gap: 4px;

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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 19px;
  left: 12px;
  width: 18px;
  height: 18px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid rgb(255 255 255 / 60%);
  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;
  border-top: 2px solid #fff;
`;
