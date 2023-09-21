import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import AvatarGroup from '@mui/joy/AvatarGroup';
import { Avatar } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookieValue } from 'hooks/getCookie';
import AddIcon from '@mui/icons-material/Add';

const BucketUrl = process.env.REACT_APP_BUCKET_URL || '';
const apiUrl = process.env.REACT_APP_API_URL;

// 강아지, 펫시터, 저널 디폴트 사진

const userDefaultImage = '/imgs/DefaultUser.svg';
const journalDefaultImage = '/imgs/Petmily.png';

type JournalType = {
  journalId: number;
  petNames: string[];
  petPhotos: string[];
  body: string;
  photos: string[];
  petsitterName: string;
  petsitterPhoto: string;
  createdAt: string;
  lastModifiedAt: string;
};

interface JournalImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isDefault?: boolean;
}

const ViewJournal = () => {
  const [journal, setJournal] = useState<JournalType | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleAvatar = () => {
    setShowAll(!showAll);
  };

  // journalId 수정
  //  멤버아이디 :1, 저널아이디: 14로 확인가능

  // 펫 이름 연결
  const AndNames = (names: string[]) => {
    if (names.length <= 1) return names[0];
    if (names.length === 2) return names.join('와 ');

    const lastWord = names.pop();
    const secondLastWord = names[names.length - 1];
    const lastCharOfSecondLastWord = secondLastWord[secondLastWord.length - 1];
    const baseUnicode = 0xac00;

    const hasFinalConsonant = (lastCharOfSecondLastWord.charCodeAt(0) - baseUnicode) % 28 !== 0;

    const connector = hasFinalConsonant ? '과 ' : '와 ';

    return `${names.join(', ')} ${connector} ${lastWord}`;
  };

  function formatDate(dateString: any) {
    const parts = dateString.split('T')[0].split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${year}-${month}-${day}`;
    }
    return 'Invalid Date';
  }

  useEffect(() => {
    const token = getCookieValue('access_token');

    const fetchJournal = async () => {
      try {
        const response = await axios.get(`${apiUrl}/journals/14`, {
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
        console.error(error);
      }
    };
    fetchJournal();
  }, []);

  // 이름 지우기
  return (
    <>
      {journal && (
        <Journal>
          <Head>
            {journal.petPhotos && journal.petPhotos.length > 0 ? (
              <Profile>
                {journal.petPhotos.map((photo, index) => (
                  <PetImage
                    key={index}
                    src={photo ? photo.replace(/https:\/\/bucketUrl/g, BucketUrl) : '/imgs/PetProfile.png'}
                    alt={`Pet ${index + 1}`}
                  />
                ))}
                <Name>{AndNames(journal.petNames)}</Name>
              </Profile>
            ) : (
              <Profile>
                <PetImage
                  src={
                    journal.petPhotos[0]
                      ? journal.petPhotos[0].replace(/https:\/\/bucketUrl/g, BucketUrl)
                      : '/imgs/PetProfile.png'
                  }
                  alt="pet profile"
                />
                <Name>이름 {AndNames(journal.petNames)}</Name>
              </Profile>
            )}
            <DateWrapper>
              <Date>{formatDate(journal.createdAt)} 작성</Date>
              <Date>{formatDate(journal.lastModifiedAt)} 수정</Date>
            </DateWrapper>
          </Head>
          <StyledCarousel>
            {journal.photos && journal.photos.length > 0
              ? journal.photos.map((photo, index) => (
                  <ImgWrapper key={index}>
                    <JournalImg
                      src={photo ? photo.replace(/https:\/\/bucketUrl/g, BucketUrl) : journalDefaultImage}
                      alt="journal photo"
                    />
                  </ImgWrapper>
                ))
              : [
                  <ImgWrapper key="default">
                    <JournalImg src="{journalDefaultImage}" alt="default journal" isDefault={true} />
                  </ImgWrapper>,
                ]}
          </StyledCarousel>
          <JournalContent>
            <SitterContainer>
              <Profile>
                <SitterImage
                  // src={journal.petsitterPhoto.replace(/https:\/\/bucketUrl/g, BucketUrl)}
                  src="/imgs/Talk.svg"
                  alt="petsitter image"
                />
                <Name>{journal.petsitterName} 펫시터님</Name>
              </Profile>
            </SitterContainer>
            <Content>{journal.body}</Content>
          </JournalContent>
        </Journal>
      )}
    </>
  );
};

const Journal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const PetImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 8px;
  border-radius: 50%;
`;

const Name = styled.div`
  font-weight: bolder;
  font-size: 18px;
  color: #279eff;
`;

const DateWrapper = styled.div`
  padding-top: 8px;
  display: flex;
  flex-direction: column;
`;

const Date = styled.div`
  color: #959595;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 4px;
`;

const StyledCarousel = styled(Carousel)`
  height: 400px;

  .carousel .slider-wrapper.axis-horizontal .slider .slide {
    overflow: visible !important;
    height: 400px;
  }

  margin-bottom: 8px;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin: 0;
`;

const JournalImg = styled.img<JournalImgProps>`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const JournalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SitterContainer = styled.div`
  background-color: white;
  padding: 4px 8px;
  border: 2px solid ${(props) => props.theme.colors.mainBlue};
  border-radius: 4px;
  font-family: inherit;
  ${(props) => props.theme.fontSize.s14h21}
`;
const SitterImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  /* border-radius: 50%; */
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
  line-height: 1.5;
  word-spacing: 0.2px;
  /* letter-spacing: 0.2px; */
`;
export default ViewJournal;