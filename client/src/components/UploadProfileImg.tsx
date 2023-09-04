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
        <CameraIcon src="/imgs/Camera.svg" alt="icon" />
      </UserImage>

      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
    </>
  );
};

const UserImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  background-color: lightgray;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
`;

const CameraIcon = styled.img`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
`;

export default UploadProfileImg;
