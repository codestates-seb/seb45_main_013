import styled from 'styled-components';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import MySchedule from '@components/MySchedule';
import MyPetmily from '@components/MyPetmily';

const BucketUrl = process.env.REACT_APP_BUCKET_URL || '';

const Mypage = () => {
  const navigate = useNavigate();
  const { isLogin, name, petsitterBoolean, photo } = useSelector((state: IUser) => state.user);

  let PhotoUrl = 'imgs/DefaultUser.svg';
  if (photo) {
    PhotoUrl = photo.replace(/https:\/\/bucketUrl/g, BucketUrl);
  }

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
      alert('로그인 해주세요.');
    }
  }, [isLogin]);

  return (
    <MypageContainer>
      <MyProfileContianer>
        <MyProfile>
          {isLogin && photo ? (
            <MyPhoto src={PhotoUrl} alt="user profile image" />
          ) : (
            <MyPhoto src="imgs/DefaultUser.svg" alt="default profile image" />
          )}
          <TextField>
            <NameText>{`${name} 님`}</NameText>
            <HelloText>안녕하세요!</HelloText>
          </TextField>
        </MyProfile>
      </MyProfileContianer>

      <LinkContainer>
        <StyledLink to="/mypage/edit">
          <Title>회원정보 수정</Title>
        </StyledLink>
      </LinkContainer>

      {petsitterBoolean ? <MySchedule /> : <MyPetmily />}
    </MypageContainer>
  );
};

// 전체 페이지
const MypageContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 36px;
  background-color: white;
`;

// 유저 컨테이너
const MyProfileContianer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-bottom: 30px;
`;

const MyProfile = styled.div`
  display: flex;
`;

const MyPhoto = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 50%;
`;

const TextField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NameText = styled.div`
  ${(props) => props.theme.fontSize.s18h27};
  font-weight: 600;
`;

const HelloText = styled.div`
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: #000;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const Title = styled.span`
  margin-top: 10px;
  font-size: 14px;
`;
export default Mypage;
