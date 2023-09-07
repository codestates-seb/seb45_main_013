import React, { useState } from 'react';
import axios from 'axios';

// 확인하기
//  <UploadProfileImg apiUrl='REACT_APP_UPLOAD_URL' />

interface UploadProfileImgProps {
  apiUrl: string;
}

const UploadProfileImg: React.FC<UploadProfileImgProps> = ({ apiUrl }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
      } catch (error) {
        console.error('error:', error);
      }
    }
  };

  const handleClickUploadArea = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClickUploadArea();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClickUploadArea}
      onKeyPress={handleKeyPress}
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        cursor: 'pointer',
        backgroundColor: 'lightgray',
      }}
    >
      {previewImage && (
        <img src={previewImage} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
    </div>
  );
};

export default UploadProfileImg;
