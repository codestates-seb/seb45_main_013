import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import LinkButton from '../buttons/LinkButton';

const Header = () => {
  return (
    <Container>
      <HeaderContatiner>
        <HeaderWrap>
          <LogoContainer>
            <HomeLink to={'/'}>
              <LogoImg src="/imgs/Logo.svg" alt="logo" />
            </HomeLink>
          </LogoContainer>
          <Nav>
            <LinkButton text="로그인" link="/login" />
            <LinkButton text="회원가입" link="/signup" />
          </Nav>
        </HeaderWrap>
      </HeaderContatiner>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;
const HeaderContatiner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 10px 8px;
  background-color: white;
  max-width: 600px;
  border-bottom: 2px solid ${(props) => props.theme.colors.mainBlue};
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  gap: 32px;
`;

const LogoContainer = styled.div`
  display: flex;
`;

const LogoImg = styled.img``;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
`;
