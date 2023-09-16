import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPetAdd } from 'store/petaddSlice';
import { RootState } from 'store';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

import LinkButton from '@components/buttons/LinkButton';
import UploadPetImg from '@components/UploadProfileImg';
import { getCookieValue } from 'hooks/getCookie';

const apiUrl = process.env.REACT_APP_API_URL;

// const MyPetItem = [
//   // 추후 useEffect로 데이터 받아올 데이터 (내 반려동물)
//   {
//     petId: 4,
//     memberId: 1,
//     type: 'CAT',
//     name: '나비',
//     age: 3,
//     species: '코숏',
//     weight: 5,
//     photo: 'https://petmily-img.s3.ap-northeast-2.amazonaws.com/ab7a57d8-48f4-40b6-aed2-742edb06dde0_cat002.jpeg',
//     body: '착한냥이냥이냥이',
//     male: null,
//     neutering: null,
//     createdAt: '2023-09-03T13:10:08.337088',
//     lastModifiedAt: '2023-09-04T22:45:10.208151',
//   },
// ];

interface IRegisterPet {
  type: 'DOG' | 'CAT';
  name: string;
  age: number;
  species: string;
  weight: number;
  body: string;
  male: boolean;
  neutering: boolean;
}

const ReservationStepTwo = () => {
  const accessToken = getCookieValue('access_token');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultProfileImg = 'imgs/DefaultUserProfile.jpg'; // Upload Image 사용
  const [mypetItems, setPetItems] = useState([]); // 초기값 빈 배열 설정(반려동물 조회)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCat, setIsCat] = useState(false);

  console.log(mypetItems);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPet>({ mode: 'onChange' });

  const handleBackClick = () => {
    navigate('/reservation');
  };

  const handleClickNext = () => {
    console.log(petId);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleImageFileChange = (file: File) => {
    setImageFile(file);
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPetAdd action을 dispatch하는 함수
    const { name, checked } = e.target;
    const petId = name.replace('myCheckbox', ''); // name에서 'myCheckbox'를 제거하고 petId만 추출
  };

  const { petId } = useSelector((state: RootState) => state.petadd); // 다음단계 넘어갈 시 현재 선택된 petId 가져오기

  const handleFormSubmit = handleSubmit(async (data: IRegisterPet) => {
    try {
      //FormData 객체 생성
      const formData = new FormData();
      // Form Field의 데이터를 formData 객체에 삽입
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof IRegisterPet];
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      // 파일 데이터가 존재하는 경우, formData 객체에 삽입
      if (imageFile) {
        formData.append('photo', imageFile);
      }
      console.log(formData);
      // 토큰 설정 별도의 인증 로직 구현 필요
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      // axios를 이용하여, 백엔드로 데이터 전송
      await axios.post('http://localhost:8080/pets/', formData);
      alert('반려동물 등록이 완료되었습니다.');
      // 데이터 전송 후, 페이지 이동
      navigate('/reservation/step2');
    } catch (error) {
      alert('반려동물 등록에 실패하였습니다.');
      console.log(error);
    }
  });

  useEffect(() => {
    try {
      axios
        .get(`${apiUrl}/pets`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => setPetItems(res.data));
    } catch (error) {
      console.error('펫정보를 가져오지 못했습니다', error);
    }
  }, [accessToken]);

  return (
    <MainContainer>
      <StatusHeader>
        <BackImg src="/imgs/BackArrow.svg" onClick={handleBackClick} />
        <StatusTitleText>예약</StatusTitleText>
        <PageNumberText>2/3</PageNumberText>
      </StatusHeader>

      <ReservationContainer>
        {/* {mypetItems.map((item) => (
          <SelectPetContainer key={item.petId}>
            <SelectPetText>맡기시는 반려동물</SelectPetText>

            <SelectPetImgContainer>
              <ImgWrap>
                <ImgCheckboxInput
                  type="checkbox"
                  id={`myCheckbox${item.petId}`}
                  name={`myCheckbox${item.petId}`}
                  checked={!!checkedItems[`myCheckbox${item.petId}`]}
                  onChange={handleCheckChange}
                />
                <Label htmlFor={`myCheckbox${item.petId}`}>
                  <SelectPetImg src={item.photo} alt="PetImg" />
                </Label>
                <SelectPetName>{item.name}</SelectPetName>
              </ImgWrap>
              <ButtonContainer>
                <Button color="primary" onClick={handleAddClick}>
                  <img src="/imgs/PetAdd.svg" alt="Add Pet" />
                </Button>
                <Dialog open={isModalOpen} onClose={handleModalClose}>
                  <DialogTitle>반려동물 등록</DialogTitle>
                  <DialogContent>
                    <DialogContentText>반려동물 소개는 마이페이지에서 펫 수정을 통해 등록해주세요!</DialogContentText>
                    <UploadPetImgbox>
                      <UploadPetImg currentImageUrl={defaultProfileImg} setImageFile={handleImageFileChange} />
                    </UploadPetImgbox>
                    <PetButtonContainer>
                      <PetButton onClick={() => setIsCat(false)} iscat={isCat ? 'true' : 'false'}>
                        <img src="/icons/DogIcon.svg" alt="dogIcon" />
                      </PetButton>
                      <PetButton onClick={() => setIsCat(true)} iscat={isCat ? 'false' : 'true'}>
                        <img src="/icons/CatIcon.svg" alt="catIcon" />
                      </PetButton>
                    </PetButtonContainer>
                    <TextField
                      margin="dense"
                      id="name"
                      label="반려동물 이름"
                      type="text"
                      fullWidth
                      {...register('name', { required: '이름을 작성해야 합니다.' })}
                    />
                    {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</p>}
                    <TextField
                      margin="dense"
                      id="species"
                      label="품종"
                      type="text"
                      fullWidth
                      {...register('species', { required: '품종을 작성해야 합니다.' })}
                    />
                    {errors.species && <p style={{ color: 'red', fontSize: '12px' }}>{errors.species.message}</p>}
                    <TextField
                      margin="dense"
                      id="weight"
                      label="몸무게"
                      type="text"
                      fullWidth
                      {...register('weight', { required: '몸무게를 작성해야 합니다.' })}
                    />
                    {errors.weight && <p style={{ color: 'red', fontSize: '12px' }}>{errors.weight.message}</p>}
                    <TextField
                      margin="dense"
                      id="age"
                      label="나이"
                      type="text"
                      fullWidth
                      {...register('age', { required: '나이를 작성해야 합니다.' })}
                    />
                    {errors.age && <p style={{ color: 'red', fontSize: '12px' }}>{errors.age.message}</p>}
                    <RegisterInputWrapper>
                      <InputLabelStyle htmlFor="neutering">중성화</InputLabelStyle>
                      <RadioWrapper>
                        <input
                          type="radio"
                          value="true"
                          {...register('neutering', { required: '중성화 여부를 선택해야 합니다.' })}
                        />
                        <RadioLabel htmlFor="male">했음</RadioLabel>
                        <input
                          type="radio"
                          value="false"
                          {...register('neutering', { required: '중성화 여부를 선택해야 합니다.' })}
                        />
                        <RadioLabel htmlFor="female">안했음</RadioLabel>
                      </RadioWrapper>
                    </RegisterInputWrapper>
                    {errors.neutering && <p style={{ color: 'red', fontSize: '12px' }}>{errors.neutering.message}</p>}
                    <RegisterInputWrapper>
                      <InputLabelStyle htmlFor="male">성별</InputLabelStyle>
                      <RadioWrapper>
                        <input
                          type="radio"
                          value="true"
                          {...register('male', { required: '성별을 선택해야 합니다.' })}
                        />
                        <RadioLabel htmlFor="male">남자아이</RadioLabel>
                        <input
                          type="radio"
                          value="false"
                          {...register('male', { required: '성별을 선택해야 합니다.' })}
                        />
                        <RadioLabel htmlFor="female">여자아이</RadioLabel>
                      </RadioWrapper>
                    </RegisterInputWrapper>
                    {errors.male && <p style={{ color: 'red', fontSize: '12px' }}>{errors.male.message}</p>}
                    <form onSubmit={handleFormSubmit}>
                      <Button variant="contained" color="primary" type="submit" fullWidth>
                        등록하기
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </ButtonContainer>
            </SelectPetImgContainer>
          </SelectPetContainer>
        ))} */}

        {/* <button onClick={() => setPetItems([...petItems, MyPetItem])}>Add Pet</button> */}

        <NoticeContainer>
          <NoticeTitleText>펫시터님께 미리 알려주세요!</NoticeTitleText>
          <NoticeText>{noticeText()}</NoticeText>
          <VerificationTitleText>필수 확인 사항</VerificationTitleText>
          <VerificationText>{verificationText}</VerificationText>
          <ImpossibleCaseTitleText>돌봄이 불가한 경우</ImpossibleCaseTitleText>
          <ImpossibleCaseText>{impossibleCaseText}</ImpossibleCaseText>
          <ImpossibleCaseTitleText>산책이 불가한 경우</ImpossibleCaseTitleText>
          <ImpossibleCaseText>{impossibleCaseWalkText()}</ImpossibleCaseText>
        </NoticeContainer>
      </ReservationContainer>

      <LinkButtonContainer>
        <StyledLinkButton
          text="다음단계"
          link="/reservation/step3"
          onClick={handleClickNext}
          width="100%"
          height="48px"
          fontSize="16"
        />
      </LinkButtonContainer>
    </MainContainer>
  );
};
const noticeText = () => (
  <>
    · 급식할 사료의 양
    <br />· 식수 제공방법 &nbsp;&nbsp;&nbsp;&nbsp;<span>예) 정수기, 자동 급수 등</span>
    <br />· 배변 처리 방법 &nbsp;&nbsp;&nbsp;&nbsp;<span>예) 변기, 일반 쓰레기 등</span>
    <br />
    · 강아지의 경우, 산책시 발 세척 방법
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;(30분 산책 시, 시간 관계상 물티슈 닦기만 가능)
    <br />
    · 고양이의 경우, 주로 숨어 있는 장소
    <br />· 돌봄 시간에 고객님이 집에 계신 경우
  </>
);

const verificationText = `돌봄 외 특수 서비스는 요청 불가\n 1. 목욕/미용 및 주사를 맞히는 의료 행위\n 2. 애견호텔, 동물병원 등의 픽업/드랍 서비스\n 3. 세탁/ 청소 및 쓰레기 배출 등 청소 유사 서비스\n 고객 본인 소유의 용품(장난감, 산책줄 등)의 파손 및 파손으로 인한 삼킴,\n 상처 등의 사고에 대해서는 펫시터 또는 당사에 책임을 물을 수 없음\n 위급 상황 발생시 보호자와 연락이 불가능한 경우, 반려 견의 건강/안전을\n 위해 담당 펫시터님의 인도로 동물병원으로 우선 이송될 수 있음\n 펫시터 부주의가 아닌, 반려동물의 돌발적 공격으로\n 인한 상해 발생시, 치료비가 보호자께 부과될 수 있음`;

const impossibleCaseText = `· 펫시터님을 무는 등의 심한 공격성을 보이는 경우\n · 링웜, 허피스 등 전염성이 강한 질병이 있는 반려동물\n · 등록하신 반려동물 프로필이 실제와 다른 경우\n · 소유자가 분명하지 않은 경우`;

const impossibleCaseWalkText = () => (
  <>
    · 인식표 미지참 / 산책 줄 길이 2M 초과시,
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;실내 산책, 실내 놀이로 대체될 수 있음
    <br />
    <span>
      · 동물보호법 제 12조/ 동물보호법 시행규칙
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;제 11조 [시행 2020. 3. 21]
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;동물 보호 제 12조(안전조치) [시행 2022.2. 11]
    </span>
  </>
);

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.white};
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.textColors.secondary};
  min-height: 48px;
  gap: 120px;
  position: relative;

  /* &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; //컨테이너 하단에 위치하도록 설정
    width: 240px; // 밑줄의 길이 설정
    height: 2px; // 밑줄의 두께 설정
    background-color: ${(props) => props.theme.colors.mainBlue}; 
  }*/
`;

const BackImg = styled.img``;

const StatusTitleText = styled.div`
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const PageNumberText = styled.div`
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

const ReservationContainer = styled.div``;

const SelectPetContainer = styled.div`
  margin: 36px 0 0 36px;
`;

const SelectPetText = styled.div`
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const ImgCheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  margin-left: 20px;
`;

const PetButtonContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  margin: 16px 0 4px 0;
`;

export const RegisterInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
`;

export const InputLabelStyle = styled.label`
  ${(props) => props.theme.fontSize.s16h24};
`;

export const RadioLabel = styled.label`
  ${(props) => props.theme.fontSize.s14h21};
  margin-left: -3px;
  margin-right: 8px;
  color: ${({ theme }) => theme.textColors.gray60};
  input:checked + & {
    color: #279eff;
  }
`;

const UploadPetImgbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 68%;
`;

const PetButton = styled.button<{ iscat: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  border: none;
  background-color: ${(props) =>
    props.iscat === 'true' ? props.theme.textColors.gray50 : props.theme.colors.mainBlue};
`;

const SelectPetImgContainer = styled.div`
  padding: 0;
  display: flex;
`;

const ImgWrap = styled.div`
  display: inline-block;
  position: relative;
  text-align: center;
  margin-top: 20px;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  /* width: 120px;
height: 120px; */

  &:before {
    background-color: white;
    color: white;
    content: ' ';
    display: block;
    border-radius: 50%;
    border: 1px solid grey;
    position: absolute;
    top: 4px;
    right: 4px;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 24px;
    transition-duration: 0.4s;
    transform: scale(0);
    z-index: 1; //이미지 위에 위치하도록 설정
  }

  img {
    height: 80px;
    width: 80px;
    transition-duration: 0.2s;
    transform-origin: 50%50%;
  }

  ${ImgCheckboxInput}:checked + & {
    border-color: #ddd;
  }

  ${ImgCheckboxInput}:checked + &:before {
    content: '✓';
    background-color: ${(props) => props.theme.colors.mainBlue};
    border: none;
    transform: scale(1);
  }

  ${ImgCheckboxInput}:checked + & img {
    transform: scale(0.9);
  }
`;

const SelectPetImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const SelectPetName = styled.div`
  margin-top: 8px;
  ${(props) => props.theme.fontSize.s14h21};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const NoticeContainer = styled.div`
  margin: 56px 0 0 36px;
`;

const NoticeTitleText = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const NoticeText = styled.div`
  margin-top: 20px;
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 28px;
  white-space: pre-line;

  span {
    color: ${(props) => props.theme.textColors.primary};
  }
`;

const VerificationTitleText = styled.div`
  margin-top: 24px;
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  color: ${(props) => props.theme.colors.red};
`;

const VerificationText = styled.div`
  margin-top: 16px;
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 28px;
  white-space: pre-line;
`;

const ImpossibleCaseTitleText = styled.div`
  margin-top: 24px;
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  color: ${(props) => props.theme.colors.red};
`;

const ImpossibleCaseText = styled.div`
  margin-top: 16px;
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 28px;
  white-space: pre-line;

  span {
    color: ${(props) => props.theme.textColors.primary};
  }
`;

const LinkButtonContainer = styled.div`
  margin: 32px 24px 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLinkButton = styled(LinkButton)`
  border-radius: 12px;
  height: 36px;
`;

export default ReservationStepTwo;
