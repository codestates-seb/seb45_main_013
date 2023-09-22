import { useState, ChangeEvent, useRef, useEffect } from 'react';
import HoverRating from '../../components/HoverRating';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import axios from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import jwt_decode from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_URL;
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const CreateReview = () => {
  const navigate = useNavigate();
  const { reservationId: careReservationId } = useParams();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const [reservation, setReservation] = useState<any>();
  const [review, setReview] = useState<any>();
  const [reviewImages, setReviewImages] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [star, setStar] = useState<number | null>(review?.star || 5);
  const [reviewText, setReviewText] = useState('');

  const { isLogin, memberId, email, petsitterBoolean } = useSelector((state: IUser) => state.user);

  let year, month, day;
  if (reservation && reservation.reservationDay) {
    [year, month, day] = reservation.reservationDay.split('-');
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (selectedFiles.length + reviewImages.length + files.length <= 5) {
        setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      } else {
        alert('최대 5개의 이미지를 선택할 수 있습니다.');
      }
    }
  };

  const handleRemoveInputImage = (indexToRemove: number) => {
    // 해당 인덱스의 이미지를 목록에서 제거
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveReviewImage = (indexToRemove: number) => {
    setReviewImages(reviewImages.filter((_, index) => index !== indexToRemove));
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 후기 등록
  const handleSubmit = async () => {
    const accessToken = getCookieValue('access_token');
    setIsRegisterLoading(true);

    const formData = new FormData();

    // input으로 선택한 이미지 넣기(하나씩)
    if (selectedFiles) {
      selectedFiles.map((file) => formData.append('file', file));
    }

    formData.append('star', String(star));
    formData.append('reservationId', String(reservation.reservationId));
    formData.append('body', reviewText);

    try {
      const response = await axios.post(`${apiUrl}/reviews`, formData, {
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('리뷰가 등록되었습니다.');
        navigate(-1);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        alert(error.response.data.message);
        navigate(-1);
      }
    }

    setIsRegisterLoading(false);
  };

  // 리뷰 수정
  const handleEditSubmit = async () => {
    const accessToken = getCookieValue('access_token');
    setIsRegisterLoading(true);

    const formData = new FormData();

    formData.append('body', reviewText);
    formData.append('star', String(star));

    // review 이미지 다 삭제하고 보내거나 review 이미지 있으면 보내기
    if (reviewImages) {
      const reviewImagesString = reviewImages.join(',');
      formData.append('photos', reviewImagesString);
    } else if (!reviewImages) {
      formData.append('photos', '');
    }

    if (selectedFiles) {
      selectedFiles.map((file) => formData.append('file', file));
    }

    try {
      const response = await axios.patch(`${apiUrl}/reviews/${review?.reviewId}`, formData, {
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        alert('리뷰가 수정되었습니다.');
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }

    setIsRegisterLoading(false);
  };

  // 해당 예약 1개 조회
  useEffect(() => {
    const accessToken = getCookieValue('access_token');

    if (!isLogin || petsitterBoolean || !careReservationId) {
      alert('권한이 없습니다.');
      navigate('/');
    }
    if (accessToken) {
      const decoded: any = jwt_decode(accessToken);

      if (decoded.id !== memberId && email !== decoded.email) {
        alert('권한이 없습니다.');
        navigate('/');
      } else {
        try {
          axios.get(`${apiUrl}/reservations/${careReservationId}`).then((res) => {
            setReservation(res.data);

            // const photos = res?.data?.review?.photos;

            // if (review) {
            //   setReview(review);
            //   setReviewText(review.body);
            //   setStar(review.star);

            //   if (photos) {
            //     const modifiedReviewImages = photos.map((photoUrl: any) => {
            //       if (photoUrl.includes('https://bucketUrl')) {
            //         return photoUrl.replace('https://bucketUrl', bucketUrl);
            //       }
            //       return '';
            //     });

            //     setReviewImages(modifiedReviewImages);
            //   }
            // }
          });
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  }, []);

  // 리뷰 1개 조회
  useEffect(() => {
    if (reservation?.reviewId) {
      try {
        axios.get(`${apiUrl}/reviews/${reservation.reviewId}`).then((res) => {
          if (res.status === 200) {
            setReview(res.data);
            setReviewText(res.data.body);
            setStar(res.data.star);

            const photos = res.data.reviewPhotos;
            if (photos) {
              const modifiedReviewImages = photos.map((photoUrl: any) => {
                if (photoUrl.includes('https://bucketUrl')) {
                  return photoUrl.replace('https://bucketUrl', bucketUrl);
                }
              });
              setReviewImages(modifiedReviewImages);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [reservation]);

  return (
    <MainContainer>
      <TitleReservationContainer>
        <Title>후기 작성</Title>
        <ReservationContainer>
          <FirstLine>
            <Info>
              {reservation?.photo ? (
                <Photo src={reservation.petsitter.photo.replace('https://bucketUrl', bucketUrl)} alt="petsitter" />
              ) : (
                <DefaultImg src="/imgs/User.svg" alt="default img" />
              )}
              <PetSitterInfo>
                <div>예약번호: {reservation?.reservationId}</div>
                <div>{reservation?.petsitter && reservation?.petsitter.name} 펫시터님</div>
              </PetSitterInfo>
            </Info>
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
        <ImgSelectWrapper>
          <ImgSelectButton onClick={openFileInput}>파일 선택</ImgSelectButton>
          <div>최대 5개의 이미지를 선택할 수 있습니다.</div>
        </ImgSelectWrapper>
        <ImgPreview>
          {selectedFiles.map((file, index) => (
            <ImgPrevieItem key={index} className="image-preview-item">
              <Img src={URL.createObjectURL(file)} alt={`Selected ${index}`} />
              <RemoveButton onClick={() => handleRemoveInputImage(index)}>
                <img src="/icons/X.png" alt="x" width="10"></img>
              </RemoveButton>
            </ImgPrevieItem>
          ))}
          {reviewImages.map((imageUrl, index) => (
            <ImgPrevieItem key={index} className="image-preview-item">
              <Img src={imageUrl} alt={`Review Image ${index}`} />
              <RemoveButton onClick={() => handleRemoveReviewImage(index)}>
                <img src="/icons/X.png" alt="x" width="10"></img>
              </RemoveButton>
            </ImgPrevieItem>
          ))}
        </ImgPreview>
      </ImgContainer>
      <TextContainer>
        <TextTitle>후기 내용</TextTitle>
        <TextArea
          placeholder="케어는 어떠셨나요?"
          defaultValue={review?.body && review.body}
          onChange={(e) => setReviewText(e.target.value)}
          maxLength={255}
        />
      </TextContainer>
      <ButtonContainer>
        <button onClick={review ? handleEditSubmit : handleSubmit}>{review ? '후기 수정' : '후기 등록'}</button>
        {isRegisterLoading && (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}
      </ButtonContainer>
    </MainContainer>
  );
};

export default CreateReview;

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

const Info = styled.div`
  display: flex;
  gap: 4px;
`;

const PetName = styled.div`
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
    position: relative;
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
