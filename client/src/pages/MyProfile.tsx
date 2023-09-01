import { styled } from 'styled-components';
import { UserPhoto, Username, UserContacts as UserInfo } from '../components/UserProfile';
import { IconButton, Icon } from '../components/IconButton';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.spacing[16]};
  background-color: ${(props) => props.theme.colors.mainBlue};

  div {
    display: flex;
  }
`;

const Text = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.xLarge};
`;

const MyProfile = () => {
  return (
    <ProfileContainer>
      <UserPhoto />
      <Username>김코딩</Username>
      <UserInfo>제주 서귀포시, 대한민국</UserInfo>
      <div>
        <Text>About</Text>
        <IconButton /*onClick={handleEdit}*/>
          <Icon src="../imgs/EditIcon.svg" alt="Icon" />
        </IconButton>
      </div>
      <UserInfo>제주 서귀포시, 대한민국</UserInfo>
      <UserInfo>제주 서귀포시, 대한민국</UserInfo>
      <UserInfo>제주 서귀포시, 대한민국</UserInfo>
      <UserInfo>제주 서귀포시, 대한민국</UserInfo>
    </ProfileContainer>
  );
};

export default MyProfile;
