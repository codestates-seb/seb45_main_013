import { styled } from "styled-components";
import { IconButton, Icon } from './IconButton';
import { useNavigate } from 'react-router-dom';

// 유저의 간단한 프로필 (파란 배경 부분)
const AboutUser=styled.div`
display: flex;
align-items: center;
width:100%;
height:106px;
background-color:  ${(props) => props.theme.colors.mainBlue};
padding:${(props) => props.theme.spacing[16]};
// 유저이름 & 상세보기 버튼(이미지) 높이 조절
div{
  display:flex;
}
`


// 공통 컴포넌트 (유저 사진)
export const UserPhoto=styled.img`
width:60px;
height:60px;
border-radius: 50%;
margin:${(props) => props.theme.spacing[16]};
`

// 유저 이름 & 전화번호 컨테이너
const UserInfo=styled.div`
display :flex;
flex-direction: column;
`

export const Username=styled.span`
color:  ${(props) => props.theme.colors.white};
font-size:  ${(props) => props.theme.fontSizes.large};
font-weight: ${(props) => props.theme.fontWeights.bold};
margin-right: ${(props) => props.theme.spacing[4]};`

export const UserContacts=styled.span`
color:  ${(props) => props.theme.colors.white};
font-size:  ${(props) => props.theme.fontSizes.medium};
font-weight: ${(props) => props.theme.fontWeights.light};`

const Email=styled.img`
width:16px;
height: 16px;
margin-right: ${(props) => props.theme.spacing[8]} ;
`

const UserProfile = () => {
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate('/mypage/profile')
  }
return(
  <>
  <AboutUser>
    <UserPhoto/>
    <UserInfo>
      <div>
      <Username>김코딩</Username>
      <IconButton width="14px" height="14px" onClick={handleClick}>
        <Icon width="10px" height="12px" src="imgs/ArrowIcon.svg" alt="Icon" />
      </IconButton>
      </div>
      <UserContacts>010-2222-3333</UserContacts>
      <div>
      <Email src="imgs/mail.svg" alt="Img"/>
      <UserContacts>test.gmail.com</UserContacts>
      </div>
    </UserInfo>
  </AboutUser>
  </>  
)
};

export default UserProfile;
