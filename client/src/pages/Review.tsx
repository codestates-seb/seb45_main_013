import { useState, ChangeEvent, useRef } from 'react';
import HoverRating from '../components/HoverRating';
import styled from 'styled-components';

const Review = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <MainContainer>
      <div>
        <Title>리뷰작성</Title>
        <ReservationContainer>
          <FirstLine>
            <ImgDiv />
            <PetSitterInfo>
              <div>예약번호: 0831</div>
              <div>홍길동 펫시터님</div>
            </PetSitterInfo>
          </FirstLine>
          <SecondLine>
            <div>서울 강남구 테헤란로 415 8층</div>
            <div>23.08.12 09:00 ~ 23.08.12 18:00</div>
          </SecondLine>
        </ReservationContainer>
      </div>
      <StarContainer>
        <StarTitle>별점</StarTitle>
        <HoverRating />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ImgSelectButton onClick={openFileInput}>파일 선택</ImgSelectButton>
          <div>최대 5개의 이미지를 선택할 수 있습니다.</div>
        </div>
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
        <TextArea placeholder="케어는 어떠셨나요?" />
      </TextContainer>
    </MainContainer>
  );
};

export default Review;

const MainContainer = styled.main`
  height: 100%;
  padding: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  margin-top: 4px;
  ${(props) => props.theme.fontSize.s18h27}
`;

const ReservationContainer = styled.div`
  margin-top: 8px;
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
`;

const ImgPrevieItem = styled.div`
  position: relative;
  padding: 4px;
  margin: 2px;
`;

const Img = styled.img`
  width: 80px;
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
  &:hover {
    background-color: ${(props) => props.theme.colors.subBlue};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.darkBlue};
    box-shadow: ${(props) => props.theme.shadow.inset};
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
