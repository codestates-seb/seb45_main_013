import { useState, ChangeEvent, useRef, useEffect } from 'react';
import HoverRating from '../components/HoverRating';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const CreateReview = () => {
  const { memberId: careMemberId, reservationId: careReservationId } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState<any>();
  const [star, setStar] = useState<number | null>(5);
  const [reviewText, setReviewText] = useState('');

  let year, month, day;
  if (reservation && reservation.reservationDay) {
    [year, month, day] = reservation.reservationDay.split('-');
  }

  console.log(reservation);

  const { isLogin, memberId, petsitterBoolean } = useSelector((state: IUser) => state.user);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  console.log(selectedFiles);

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

  const handleSubmit = async () => {
    const formData = new FormData();
    if (selectedFiles) {
      selectedFiles.map((file) => formData.append('file', file));
    }
    if (star) {
      formData.append('star', star.toString());
    }
  };

  useEffect(() => {
    if (!isLogin || petsitterBoolean || !careMemberId || !careReservationId || memberId !== +careMemberId) {
      alert('권한이 없습니다.');
      navigate('/');
    } else {
      try {
        axios.get(`${apiUrl}/reservations/${careReservationId}`).then((res) => {
          setReservation(res.data);
        });
      } catch (error: any) {
        if (error.response.status === 404) {
          alert(error.response.data.message);
          navigate('/');
        }
      }
    }
  }, []);

  return (
    <MainContainer>
      <TitleReservationContainer>
        <Title>리뷰 작성</Title>
        <ReservationContainer>
          <FirstLine>
            {reservation?.photo ? (
              <img src={reservation.photo.replace(/https:\/\/bucketUrl/g, `${bucketUrl}`)} alt="petsiiter" />
            ) : (
              <ImgDiv />
            )}
            <PetSitterInfo>
              <div>예약번호: {reservation?.reservationId}</div>
              <div>{reservation?.petsitterName} 펫시터님</div>
            </PetSitterInfo>
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
      <StarContainer>
        <StarTitle>별점</StarTitle>
        <HoverRating value={star} setValue={setStar} />
      </StarContainer>
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
        <ImgSelectWrapper style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
        <TextArea placeholder="케어는 어떠셨나요?" onChange={(e) => setReviewText(e.target.value)} />
      </TextContainer>
      <ButtonContainer>
        <button onChange={handleSubmit}>리뷰 작성</button>
      </ButtonContainer>
    </MainContainer>
  );
};

export default CreateReview;

const MainContainer = styled.main`
  height: 100%;
  padding: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
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
  border-radius: 8px;
  border: none;
  box-shadow: ${(props) => props.theme.shadow.dp02};
  padding: 8px;
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
  padding: 4px;
  margin: 2px;
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
  background-color: ${(props) => props.theme.textColors.primary};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.lineColors.coolGray80};
  position: absolute;
  right: 0;
  top: 0;
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
