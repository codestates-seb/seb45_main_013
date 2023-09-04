import styled from 'styled-components';
import { useState, useRef } from 'react';

const UploadProfileImg = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleClickUserImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <UserImage onClick={handleClickUserImage}>
        {selectedImage && <Image src={selectedImage} alt="profile image" />}
        <img src="/icons/PlusIcon.svg" width="16" alt="plusIcon" />
        <CameraIconWrapper>
          <CameraIcon src="/icons/Camera.svg" alt="icon" />
        </CameraIconWrapper>
      </UserImage>

      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
    </>
  );
};

const UserImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  background-color: lightgray;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;

  object-fit: contain;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  width: 16px;
  right: 2px;
  bottom: 2px;

  overflow: hidden; /* CameraIconWrapper에 overflow: hidden 스타일 적용 */
`;

const CameraIcon = styled.img`
  width: 100%;

  /* position: absolute;
  bottom: 2px;
  right: 2px;
  width: 20px;
  height: 20px; */
`;

export default UploadProfileImg;
