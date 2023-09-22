import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { refreshAccessToken } from 'hooks/refreshAcessToken';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from 'store/userSlice';
import styled, { keyframes } from 'styled-components';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const CreateJournal = () => {
  const navigate = useNavigate();
  const { reservationId } = useParams();

  const { isLogin, memberId, petsitterBoolean } = useSelector((state: IUser) => state.user);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const [reservation, setReservation] = useState<any>();
  const [journal, setJournal] = useState<any>();
  const [journalImages, setJournalImages] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [journalText, setJournalText] = useState('');

  let year, month, day;
  if (reservation && reservation.reservationDay) {
    [year, month, day] = reservation.reservationDay.split('-');
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (selectedFiles.length + journalImages.length + files.length <= 5) {
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

  const handleRemoveReviewImage = (indexToRemove: number) => {
    setJournalImages(journalImages.filter((_, index) => index !== indexToRemove));
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 일지 등록
  const handleSubmit = async () => {
    setIsRegisterLoading(true);
    const accessToken = getCookieValue('access_token');

    const formData = new FormData();

    formData.append('reservationId', String(reservation.reservationId));
    formData.append('body', journalText);

    if (selectedFiles) {
      selectedFiles.map((file) => formData.append('file', file));
    }

    try {
      const response = await axios.post(`${apiUrl}/journals`, formData, {
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.journalId) {
        alert('일지가 등록 되었습니다.');
        navigate('/cares');
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            try {
              const response = await axios.post(`${apiUrl}/journals`, formData, {
                headers: { Authorization: `Bearer ${newAccessToken}`, 'Content-Type': 'multipart/form-data' },
              });
              if (response.data.journalId) {
                alert('일지가 등록 되었습니다.');
                navigate('/cares');
              }
            } catch (refreshError) {}
          }
        } catch (error) {
          alert('일지 등록에 실패 했습니다. 다시 시도해 주세요.');
        }
      }
      if (error) {
        alert('일지 등록에 실패 했습니다. 다시 시도해 주세요.');
      }
    }

    setIsRegisterLoading(false);
  };

  // 일지 수정
  const handleEditSubmit = async () => {
    const accessToken = getCookieValue('access_token');
    setIsRegisterLoading(true);

    const formData = new FormData();
    formData.append('body', journalText);

    if (journalImages) {
      const journalImagesString = journalImages.join(',');
      formData.append('photos', journalImagesString);
    } else if (!journal) {
      formData.append('photos', '');
    }

    if (selectedFiles) {
      selectedFiles.map((file) => formData.append('file', file));
    }

    if (journal?.journalId) {
      try {
        const response = await axios.patch(`${apiUrl}/journals/${journal?.journalId}`, formData, {
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 200) {
          alert('일지가 수정되었습니다.');
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setIsRegisterLoading(false);
  };

  // 해당 예약 1개 조회
  useEffect(() => {
    if (!isLogin || !petsitterBoolean) {
      alert('권한이 없습니다.');
      navigate('/');
    } else {
      try {
        axios.get(`${apiUrl}/reservations/${reservationId}`).then((res) => {
          setReservation(res.data);
        });
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
          alert(error.response.data.message);
        }
      }
    }
  }, []);

  // 일지 조회
  useEffect(() => {
    if (reservation?.journalId) {
      const fetchData = async () => {
        const accessToken = getCookieValue('access_token');
        try {
          const response = await axios.get(`${apiUrl}/journals/${reservation.journalId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setJournal(response.data);
          setJournalText(response.data.body);

          if (response.data.photos) {
            const modifiedJournalImages = response.data.photos.map((photo: any) => {
              if (photo.includes('https://bucketUrl')) {
                return photo.replace('https://bucketUrl', bucketUrl);
              }
            });
            setJournalImages(modifiedJournalImages);
          }
        } catch (error) {
          console.error(error);
          try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              const response = await axios.get(`${apiUrl}/journals/${reservation.journalId}`, {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              setJournal(response.data);
              if (response.data.photos) {
                const modifiedJournalImages = response.data.photos.map((photoUrl: any) => {
                  if (photoUrl.includes('https://bucketUrl')) {
                    return photoUrl.replace('https://bucketUrl', bucketUrl);
                  }
                });
                setJournalImages(modifiedJournalImages);
              }
            }
          } catch (refreshError) {
            console.error(refreshError);
            // Handle refresh error
          }
        }
      };

      fetchData();
    }
  }, [reservation]);

  return (
    <MainContainer>
      <TitleReservationContainer>
        <Title>케어일지 작성</Title>
        <ReservationContainer>
          <FirstLine>
            <InfoContainer>
              {reservation?.petsitter?.photo ? (
                <Photo src={reservation?.petsitter?.photo.replace('https://bucketUrl', bucketUrl)} alt="client" />
              ) : (
                <DefaultImg src="/imgs/User.svg" alt="default img" />
              )}
              <ClientInfo>
                <div>예약번호: {reservation?.reservationId}</div>
                <div>{reservation?.member?.name} 고객님</div>
              </ClientInfo>
            </InfoContainer>
            <PetName>{reservation?.pets?.map((pet: any) => <div key={pet.petId}>{pet.name}</div>)}</PetName>
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
          {journalImages.map((imageUrl, index) => (
            <ImgPrevieItem key={index} className="image-preview-item">
              <Img src={imageUrl} alt={`Journal Image ${index}`} />
              <RemoveButton onClick={() => handleRemoveReviewImage(index)}>
                <img src="/icons/X.png" alt="x" width="10"></img>
              </RemoveButton>
            </ImgPrevieItem>
          ))}
        </ImgPreview>
      </ImgContainer>
      <TextContainer>
        <TextTitle>리뷰</TextTitle>
        <TextArea
          placeholder="케어 중 무슨 일이 있었나요?"
          defaultValue={journal?.body && journal?.body}
          onChange={(e) => setJournalText(e.target.value)}
          maxLength={255}
        />
      </TextContainer>
      <ButtonContainer>
        <button onClick={journal ? handleEditSubmit : handleSubmit}>
          {journal ? '케어일지 수정' : '케어일지 등록'}
        </button>
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

const Photo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const DefaultImg = styled.img`
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

const PetName = styled.div`
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
