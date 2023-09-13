import DaumPostcode from 'react-daum-postcode';
import { Modal, Sheet } from '@mui/joy';
import { TextField } from '@mui/material';
import { useState } from 'react';

// 사용 : sitterschedu;e
// 마이페이지 주소 넣기

interface AddressInputProps {
  // 시군구 or 상세주소
  format?: 'short' | 'full';
  // 스타일 지정
  sx?: any;
  onChange?: (address: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ format = 'full', sx = {}, onChange }) => {
  const onToggleModal = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sido, setSido] = useState('');
  const [sigungu, setSigugu] = useState('');
  const [remainAddress, setRemainAddress] = useState('');
  const [zonecode, setZonecode] = useState('');

  const handleComplete = (data: { zonecode: string; sido: string; sigungu: string; address: string }) => {
    // 우편번호 저장
    setZonecode(data.zonecode);
    // 시.도 저장
    setSido(data.sido);
    // 구.군 저장
    setSigugu(data.sigungu.length > 3 ? data.sigungu.split('').splice(0, 3).join('') : data.sigungu);
    // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
    const splitAddress = data.address.split(' ').splice(2).join(' ');
    setRemainAddress(splitAddress);
    setIsModalOpen(false);
  };

  let addressValue = '';
  if (format === 'short') {
    addressValue = `${sido} ${sigungu}`;
  } else {
    addressValue = `${zonecode} ${sido} ${sigungu} ${remainAddress}`;
  }
  if (onChange) onChange(addressValue);

  return (
    <>
      <TextField
        id="outlined-basic"
        placeholder="주소"
        variant="outlined"
        value={addressValue}
        onClick={onToggleModal}
        onKeyDown={onToggleModal}
        sx={sx}
      />
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Sheet sx={{ width: '360px;' }}>
            <DaumPostcode onComplete={handleComplete} />
          </Sheet>
        </Modal>
      )}
    </>
  );
};

export default AddressInput;
