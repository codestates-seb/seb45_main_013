import styled from 'styled-components';

const Footer = () => {
  return (
    <MainContainer>
      <ContactUs>Contact Us</ContactUs>
      <MemberContainer>
        <BE>
          BE
          <Link href="https://github.com/cyonits" target="_blank">
            이민기
          </Link>
          <Link href="https://github.com/45hyewon" target="_blank">
            구혜원
          </Link>
          <Link href="https://github.com/k2taee" target="_blank">
            김기태
          </Link>
        </BE>
        <FE>
          FE
          <Link href="https://github.com/tedhun21" target="_blank">
            송지훈
          </Link>
          <Link href="https://github.com/kdhwh" target="_blank">
            김도희
          </Link>
          <Link href="https://github.com/Givehim" target="_blank">
            김두헌
          </Link>
        </FE>
      </MemberContainer>
      <Dividerbox />
      <CopyrightNotice>Copyright @ 2023 Petmily. All rights reserved.</CopyrightNotice>
      <LinkImgContainer>
        <LinkImg href="https://github.com/codestates-seb/seb45_main_013" target="_blank">
          <Img src="/imgs/GithubMarkWhite.svg" alt="GithubIcon" />
        </LinkImg>
        <LinkImg href="https://sideways-marten-d2e.notion.site/3a33fb8b322343958ef24f97ee973787" target="_blank">
          <Img src="/imgs/NotionLogo.png" alt="NotionIcon" />
        </LinkImg>
      </LinkImgContainer>
    </MainContainer>
  );
};

export default Footer;

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  background-color: ${(props) => props.theme.colors.mainBlue};
`;
const ContactUs = styled.div`
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.fontSize.s16h24};
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 12px;
`;

const MemberContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
`;

const Link = styled.a`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.light};
  ${(props) => props.theme.fontSize.s14h21};
  margin-left: 8px;
`;

const BE = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.light};
  ${(props) => props.theme.fontSize.s14h21};
`;

const FE = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.light};
  ${(props) => props.theme.fontSize.s14h21};
`;

const CopyrightNotice = styled.div`
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.fontSize.s12h18};
  font-weight: ${(props) => props.theme.fontWeights.light};
  margin-bottom: 8px;
`;

const LinkImgContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const LinkImg = styled.a``;

const Img = styled.img`
  width: 16px;
  height: 16px;
`;

const Dividerbox = styled.div`
  width: 80%;
  height: 2px;
  border-top: 1px solid #b4b2ff;
  margin-bottom: 8px;
`;
