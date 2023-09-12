import styled from 'styled-components';
import { useEffect } from 'react';
import MyPetmily from '@components/MyPetmily';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import MyMenu from '@components/MyMenu';
import MyPetsitterMenu from '@components/MyPetsitterMenu';
import MySchedule from '@components/MySchedule';

// petsitterBoolean -> 펫시터 링크 설정
const BucketUrl = process.env.REACT_APP_BUCKET_URL || '';

const Mypage = () => {
  //  수정
  const { isLogin, name, petsitterBoolean, photo } = useSelector((state: IUser) => state.user);

  console.log(petsitterBoolean);

  let PhotoUrl = 'imgs/DefaultUser.svg';
  if (photo) {
    PhotoUrl = photo.replace(/https:\/\/bucketUrl/g, BucketUrl);
  }
  useEffect(() => {
    console.log(petsitterBoolean);
  }, [photo]);

  useEffect(() => {
    console.log(petsitterBoolean);
  }, [photo]);

  return (
    <MypageContainer>
      <MyProfileContianer>
        <MyProfile>
          {isLogin && photo ? (
            <MyPhoto src={photo} alt="user profile image" />
          ) : (
            <MyPhoto src="imgs/DefaultUser.svg" alt="default profile image" />
          )}
          <TextField>
            <NameText>{`${name} 님`}</NameText>
            <HelloText>안녕하세요!</HelloText>
          </TextField>
        </MyProfile>
      </MyProfileContianer>

      {/* 펫시터 불른 ->메뉴 컴포넌트 */}
      {petsitterBoolean ? <MyPetsitterMenu /> : <MyMenu />}
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

export default Mypage;
