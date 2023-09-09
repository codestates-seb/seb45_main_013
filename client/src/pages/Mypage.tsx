import styled from 'styled-components';
import { useState } from 'react';
import MyPetmily from '../components/MyPetmily';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUser } from '../modules/userSlice';
import { getCookieValue } from 'hooks/getCookie';

// petsitterBoolean 분기하기
const Mypage = () => {
  //아이콘 메뉴 호버링
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseOver = (itemId: string) => {
    setHoveredItem(itemId);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };

  //  수정
  const isLogin = true;

  const { name, memberId, phone, address, email, nickName, body, petsitterBoolean, photo } = useSelector(
    (state: IUser) => state.login,
  );

  console.log(petsitterBoolean);

  // 호버 시 이미지 변화
  // 아이콘 바꾸기
  //  링크 수정
  const menuItems = [
    {
      id: '/reservation',
      originalImage: 'imgs/Calendar.svg',
      hoveredImage: 'imgs/CalendarBlue.svg',
      title: petsitterBoolean ? '예약 관리' : '나의 예약',
    },
    {
      id: '/cares',
      originalImage: 'imgs/Diary.svg',
      hoveredImage: 'imgs/DiaryBlue.svg',
      title: petsitterBoolean ? '케어 일지 작성' : '케어 일지',
    },
    {
      id: 'mypage/edit',
      originalImage: 'imgs/User.svg',
      hoveredImage: 'imgs/UserBlue.svg',
      title: petsitterBoolean ? '펫시터 정보 수정' : '회원정보 수정',
    },
  ];

  // 지우기
  const token = getCookieValue('access_token');
  console.log(token);

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

      <MenuContainer>
        {menuItems.map((item) => (
          <MenuItem key={item.id} onMouseOver={() => handleMouseOver(item.id)} onMouseOut={handleMouseOut}>
            <StyledLink to={petsitterBoolean ? `/petsitter${item.id}` : item.id}>
              <MenuItemWrapper>
                <MenuImage
                  src={hoveredItem === item.id ? item.hoveredImage : item.originalImage}
                  alt={`Button ${item.id}`}
                />
                <Title>{item.title}</Title>
              </MenuItemWrapper>
            </StyledLink>
          </MenuItem>
        ))}
      </MenuContainer>
      {isLogin && <MyPetmily />}
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

// 메뉴 컨테이너
const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
`;

const MenuItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border: none;
  text-align: center;
  cursor: pointer;
  background-color: white;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.colors.mainBlue};
  }
`;

const MenuImage = styled.img`
  width: auto;
  height: 24px;
`;

const Title = styled.span`
  margin-top: 10px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

export default Mypage;
