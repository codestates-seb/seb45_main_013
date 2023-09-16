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
const petDefaultImage = '/imgs/PetProfile.png';
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

  useEffect(() => {
    const token = getCookieValue('access_token');

    const fetchJournal = async () => {
      console.log(token);
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

  return (
    <JournalContainer>
      {journal && (
        <>
          <StyledCarousel>
            {journal.photos && journal.photos.length > 0
              ? journal.photos.map((photo, index) => (
                  <ImgWrapper key={index}>
                    <JournalImg
                      src={photo ? photo.replace(/https:\/\/bucketUrl/g, BucketUrl) : journalDefaultImage}
                      alt="journal photo"
                    />
                    <PetInfoWrapper>
                      <StyledAvatarGroup sx={{}}>
                        {journal.petPhotos && journal.petPhotos.length > 0 && (
                          <PetAvatar
                            src={
                              journal.petPhotos[0]
                                ? journal.petPhotos[0].replace(/https:\/\/bucketUrl/g, BucketUrl)
                                : petDefaultImage
                            }
                            alt="pet profile"
                          />
                        )}
                        {showAll &&
                          journal.petPhotos
                            .slice(1)
                            .map((photo, index) => (
                              <PetAvatar
                                key={index}
                                src={photo ? photo.replace(/https:\/\/bucketUrl/g, BucketUrl) : petDefaultImage}
                                alt="pet profile"
                              />
                            ))}
                        {!showAll && journal.petPhotos && journal.petPhotos.length >= 2 && (
                          <MoreButton onClick={toggleAvatar}>
                            <PlusIcon />
                          </MoreButton>
                        )}
                      </StyledAvatarGroup>
                      <ProfileLabel>{AndNames(journal.petNames)}</ProfileLabel>
                    </PetInfoWrapper>
                  </ImgWrapper>
                ))
              : [
                  <ImgWrapper key="default">
                    <JournalImg src={journalDefaultImage} alt="default journal" isDefault={true} />
                    <PetAvatar src={petDefaultImage} alt="default pet profile" />
                    <ProfileLabel>{AndNames(journal.petNames)}</ProfileLabel>
                  </ImgWrapper>,
                ]}
          </StyledCarousel>

          <SitterAvatar />
          <Name>{journal.petsitterName}</Name>
          <Contents>{journal.body}</Contents>
        </>
      )}
    </JournalContainer>
  );
};

const JournalContainer = styled.div`
  /* position: relative; */
  width: 100%;
`;

const PetInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
`;

const PetAvatar = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
  z-index: 2;
`;

const ProfileLabel = styled.div`
  color: white;
  font-weight: 700;
  display: inline-block;
  margin-left: 10px;
  white-space: nowrap;
`;

const StyledCarousel = styled(Carousel)`
  height: 500px;
  .carousel .slider-wrapper.axis-horizontal .slider .slide {
    height: 500px;
    overflow: visible !important;
  }
`;

const MoreButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: lightgray;
  margin-left: 5px;
  border: none;
  cursor: pointer;
`;

const PlusIcon = styled(AddIcon)`
  color: white;
`;

const StyledAvatarGroup = styled(AvatarGroup)`
  & .MuiAvatar-root:not(:last-child) {
    margin-right: -20px;
    z-index: 1;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin: 0;
`;

const JournalImg = styled.img<JournalImgProps>`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SitterAvatar = styled(Avatar)`
  width: 90px !important;
  height: 90px !important;
  background-color: gray;
  position: absolute;
  top: -45px;
  left: 20px;
`;

const Name = styled.div`
  ${(props) => props.theme.fontSize.s16h24}
  margin-top: -36px;
  margin-left: 20px;
`;

const Contents = styled.div`
  margin: 20px;
`;

export default ViewJournal;
