import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from './Button';
// import { useState } from 'react';

const HeaderContatiner = styled.header`
  display: flex;
  width: 100%;
  height: 52px;
  background-color: ${(props) => props.theme.colors.white};
  padding: 10px ${(props) => props.theme.spacing[8]};
  border-bottom: 2px solid ${(props) => props.theme.colors.mainBlue};
`;

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing[32]};
  background-color: ${(props) => props.theme.colors.white};
`;

const LogoContainer = styled.div`
  display: flex;
`;

const LogoImg = styled.img``;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Header = () => {
  // const [isLogIn, setIsLogin] = useState(false);

  return (
    <HeaderContatiner>
      <HeaderWrap>
        <LogoContainer>
          <HomeLink to={'/'}>
            <LogoImg src="/imgs/Logo.svg" alt="logo" />
          </HomeLink>
        </LogoContainer>
        {/* <Nav>
        {isLogin ? (
          <MypageBtn />
          <CaresBtn />
        ) : (
          <LoginBtn />
          <SignupBtn />
        )}
        </Nav> */}
        <Nav>
          <Button text="로그인" link="/login" />
          <Button text="회원가입" link="/signup" />
        </Nav>
      </HeaderWrap>
    </HeaderContatiner>
  );
};

export default Header;
