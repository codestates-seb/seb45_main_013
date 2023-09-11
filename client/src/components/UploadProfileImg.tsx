import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import { getCookieValue } from 'hooks/getCookie';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';

//  DefaultUserProfile 이미지 안보임
//  모달 디자인

const apiUrl = process.env.REACT_APP_API_URL;
const BucketUrl = process.env.REACT_APP_BUCKET_URL;
const defaultProfileImg = 'imgs/DefaultUserProfile.jpg';

const UploadProfileImg = ({ setImageFile, currentImageUrl }: any) => {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImageUrl);
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [openModal, setOpenModal] = useState(false);
  const { memberId } = useSelector((state: IUser) => state.user);

  useEffect(() => {
    if (currentImageUrl) {
      setPreviewImage(currentImageUrl.replace(/https:\/\/bucketUrl/g, BucketUrl));
    } else {
      console.log(defaultProfileImg);
      setPreviewImage(defaultProfileImg);
    }
  }, [currentImageUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageFile(file);
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAdd = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    // handleCloseModal();
  };

  const handleEdit = () => {
    handleAdd();
  };

  const handleDelete = async () => {
    const token = getCookieValue('access_token');
    console.log(token);
    try {
      const response = await axios.patch(`${apiUrl}/members/${memberId}/photo`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data === 'success delete photo') {
        alert('삭제되었습니다');
        setPreviewImage(defaultProfileImg);
        setImageFile(null);
        handleCloseModal();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          console.error('AxiosError caught (no response):', error.message);
        }
      } else {
        console.error('Non-Axios error caught:', error);
      }
    }
  };

  const handleClickUploadArea = () => {
    handleOpenModal();
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalBody
          hasImage={!!previewImage && previewImage !== defaultProfileImg}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

const ModalBody = ({ hasImage, onAdd, onEdit, onDelete, onClose }: any) => {
  const [hadImage, setHadImage] = useState(hasImage);

  useEffect(() => {
    if (hadImage && !hasImage) {
      onClose();
    }
    setHadImage(hasImage);
  }, [hasImage, onClose, hadImage]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '16px',
        outline: 'none',
      }}
    >
      <h2>{hasImage ? '프로필 사진 수정' : '프로필 사진 추가'}</h2>
      {hasImage ? (
        <>
          <Button onClick={onEdit}>수정</Button>
          <Button onClick={onDelete}>삭제</Button>
        </>
      ) : (
        <Button onClick={onAdd}>추가</Button>
      )}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        취소
      </Button>
    </div>
  );
};
export default UploadProfileImg;
