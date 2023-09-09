import React, { useState, useEffect } from 'react';

const UploadProfileImg = ({ setImageFile, currentImageUrl }: any) => {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImageUrl);
  const fileInputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    setPreviewImage(currentImageUrl);
  }, [currentImageUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageFile(file);
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
      <input
        type="file"
        accept="image/jpeg image/png"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default UploadProfileImg;
