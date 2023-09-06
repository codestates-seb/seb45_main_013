import React, { useState } from 'react';

// revokeObjectURL(?)

const UploadProfileImg: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
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
        width: '40px',
        height: '40px',
        backgroundColor: 'red',
        cursor: 'pointer',
      }}
    >
      {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%' }} />}
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
    </div>
  );
};

export default UploadProfileImg;
