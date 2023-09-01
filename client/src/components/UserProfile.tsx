import { styled } from 'styled-components';
import { useState } from 'react';
import { IconButton, Icon } from './IconButton';

// !! 유저 이름 옆 버튼 수정하기!!
// 버튼 누리면 위의 데이터 위치 그대로?
//@ ..?

// 유저의 간단한 프로필 (파란 배경 부분)
const AboutUser = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.mainBlue};
  transition: height 0.3s;
  // 유저이름 & 상세보기 버튼(이미지) 높이 조절
  div {
    display: flex;
  }
`;

// 공통 컴포넌트 (유저 사진)
export const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  margin: 16px;
  border-radius: 50%;
`;

// 유저 이름 & 전화번호 컨테이너
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.span`
  margin-right: 4px;
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSize.s16h24};
`;

export const UserContacts = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.light};
  font-size: ${(props) => props.theme.fontSize.s14h21};
`;

const Button = styled.button`
  border: none;
  background: none;
`;

const RotatedImage = styled.img`
  width: 14px;
  height: 14px;
  transition: transform 0.3s;
  &.rotate {
    transform: rotate(180deg);
  }
`;

const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  //  유저 정보수정 함수 작성
  // const handleEdit=()=>{
  // }

  // const handleSubmit = (event) => {
  //   setIsEditMode(false);
  // };

  return (
    <>
      <AboutUser>
        <UserPhoto />
        <UserInfo>
          <div>
            <Username>김코딩</Username>
            <Button onClick={handleClick}>
              <RotatedImage className={isExpanded ? 'rotate' : ''} src="imgs/UserDetails.svg" alt="Icon" />
            </Button>
          </div>
          <div>
            <InfoIcon src="imgs/mail.svg" alt="Img" />
            <UserContacts>test.gmail.com</UserContacts>
          </div>
          {isExpanded && (
            // 유저 상세정보
            <UserDetails>
              <div>
                <InfoIcon width="10px" height="12px" src="imgs/User.svg" alt="Icon" />
                <UserContacts>코딩맨</UserContacts>
              </div>
              <div>
                <InfoIcon width="10px" height="12px" src="imgs/Location.svg" alt="Icon" />
                <UserContacts>서울 강남구 테헤란로 415 8층</UserContacts>
              </div>
              <div>
                <InfoIcon width="10px" height="12px" src="imgs/Call.svg" alt="Icon" />
                <UserContacts>010-0000-0000</UserContacts>
              </div>
              {/* 수정 버튼 */}
              <IconButton /*onClick={handleEdit}*/>
                <Icon src="imgs/EditIcon.svg" alt="Icon" />
              </IconButton>
            </UserDetails>
          )}
        </UserInfo>
      </AboutUser>
    </>
  );
};

export default UserProfile;
