import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookieValue } from 'hooks/getCookie';

const BucketUrl = process.env.REACT_APP_BUCKET_URL || '';
const apiUrl = process.env.REACT_APP_API_URL;
const token = getCookieValue('access_token');

// 강아지, 펫시터, 저널 디폴트 사진
const petDefaultImage = '/imgs/DefaultPet.png';
const userDefaultImage = '/imgs/DefaultUser.svg';
const journalDefaultImage = '/imgs/Petmily.png';

type JournalType = {
  journalId: number;
  reservationId: number;
  petsitterId: number;
  memberId: number;
  createdAt: string;
  lastModifiedAt: string;
  body: string;
  photos: string[];
};

interface JournalImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isDefault?: boolean;
}

const ViewJournal = () => {
  const [journal, setJournal] = useState<JournalType | null>(null);

  // journalId 수정
  const journalId = 1;

  useEffect(() => {
    const fetchJournal = async () => {
      console.log(token);
      try {
        const response = await axios.get(`${apiUrl}/journals/1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJournal(response.data);

        if (response.data) {
          console.log(response.data);
          setJournal(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch journal:', error);
      }
    };
    fetchJournal();
  }, []);

  return (
    <div>
      {journal && (
        <>
          <StyledCarousel>
            {journal.photos && journal.photos.length > 0
              ? journal.photos.map((photo, index) => (
                  <ImgWrapper key={index}>
                    <JournalImg src={photo.replace(/https:\/\/bucketUrl/g, BucketUrl)} alt="pet profile" />
                    {/* 이미지 없으면 디폴트 */}
                    <PetProfileImg />
                    {/* 서버 수정되면 바꾸기 */}
                    {/* <ProfileLabel>펫이름</ProfileLabel> */}
                    {/* 이미지 없으면 디폴트 */}
                  </ImgWrapper>
                ))
              : [
                  <ImgWrapper key="default">
                    <JournalImg src={journalDefaultImage} alt="journal" isDefault={true} />
                    <PetProfileImg />
                    {/* <ProfileLabel>펫이름</ProfileLabel> */}
                    <SitterProfileImg />
                  </ImgWrapper>,
                ]}
          </StyledCarousel>

          <ContentWrapper>
            <Name>펫시터이름</Name>
            <Content>{journal.body}</Content>
          </ContentWrapper>
        </>
      )}
    </div>
  );
};

const PetProfileImg = styled.img`
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  /* 지우기 */
  background-color: gray;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  margin: 0;
  /* 지우기 */
`;

const JournalImg = styled.img<JournalImgProps>`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SitterProfileImg = styled.img`
  width: 90px !important;
  height: 90px !important;
  border-radius: 50%;
  background-color: gray;
  position: absolute;
  top: 90%;
  bottom: 0;
  left: 10px;
  z-index: 2;
`;

// 펫 이름
const ProfileLabel = styled.span`
  margin-left: 10px;
  background-color: rgba(255, 255, 255, 0.7);
`;

const Name = styled.div`
  ${(props) => props.theme.fontSize.s18h27}
  font-weight:700;
`;

const Content = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
  line-height: 2;
`;

const ContentWrapper = styled.div`
  margin-top: 36px;
  width: 100%;
  padding: 20px;
`;

const StyledCarousel = styled(Carousel)`
  .carousel .slider-wrapper.axis-horizontal .slider .slide {
    height: 70%;
    overflow: visible !important;
  }
`;

export default ViewJournal;
