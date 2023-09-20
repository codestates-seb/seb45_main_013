import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IReservation } from 'store/reservationSlice';
import styled from 'styled-components';

interface PetsitterProps {
  petsitter: {
    memberId: number;
    petsitterId: number;
    name: string;
    nickName: string;
    photo: string | null;
    star: number;
    reviewCount: number;
    possibleDay: string;
    possibleTimeStart: string;
    possibleTimeEnd: string;
  };
}
const bucketUrl = process.env.REACT_APP_BUCKET_URL;

const PetsitterCard = ({ petsitter }: PetsitterProps) => {
  const { reservationDay, reservationTimeStart, reservationTimeEnd } = useSelector(
    (state: IReservation) => state.reservation,
  );

  const startTime = petsitter?.possibleTimeStart?.split(':')[0] + ':' + petsitter?.possibleTimeStart?.split(':')[1];
  const endTime = petsitter?.possibleTimeEnd?.split(':')[0] + ':' + petsitter?.possibleTimeStart?.split(':')[1];

  return (
    <StyledLink to={`/petsitters/${petsitter.petsitterId}`} key={petsitter.petsitterId}>
      <FilterBodyBox>
        <PetsitterContainer>
          <ImageContainer>
            {petsitter.photo ? (
              <PetsitterImg src={petsitter.photo.replace('https://bucketUrl', bucketUrl || '')} alt="petsitter photo" />
            ) : (
              <DefaultImg src="/imgs/PetsitterPhoto.svg" alt="default petsitter"></DefaultImg>
            )}
          </ImageContainer>
          <PetsitterBody>
            <PetsitterWrap>
              <NameText>{petsitter.name}</NameText>
              <Possiblebox>예약가능</Possiblebox>
            </PetsitterWrap>
            <TimeWrap>
              <TimgImg src="/icons/TimeIcon.svg" alt="TimeIcon" />
              <TimeText>
                {startTime} ~ {endTime}
              </TimeText>
            </TimeWrap>
            <RatingReviewContainer>
              <StarContainer>
                <StarImg src="/imgs/Star.svg" alt="starIcon"></StarImg>
                <div>{petsitter.star}</div>
              </StarContainer>
              <ReviewContainer>
                <ReviewImg src="/imgs/ReviewIcon.svg" alt="reviewIcon"></ReviewImg>
                <div>{petsitter.reviewCount}</div>
              </ReviewContainer>
            </RatingReviewContainer>
          </PetsitterBody>
          <ContainerArrow src="/icons/PetsitterContainerArrow.svg" alt="ArrowIcon" />
        </PetsitterContainer>
      </FilterBodyBox>
    </StyledLink>
  );
};

export default PetsitterCard;

const FilterBodyBox = styled.div``;

const PetsitterContainer = styled.div`
  display: flex;
  position: relative;
  margin: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.dp01};
  cursor: pointer;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const PetsitterImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
`;

const DefaultImg = styled.img``;
const PetsitterBody = styled.div`
  margin-left: 36px;
`;

const PetsitterWrap = styled.div`
  display: flex;
  margin-top: -4px;
`;

const NameText = styled.div`
  margin-right: 12px;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  font-size: ${(props) => props.theme.fontSize.s20h30};
`;

const Possiblebox = styled.div`
  margin: 6px 0;
  padding: 2px 8px;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.light};
  font-size: 12px;
  line-height: 16px;
  background-color: ${(props) => props.theme.colors.mainBlue};
`;

const TimeWrap = styled.div`
  display: flex;
  margin-top: -2px;
  margin-bottom: 8px;
`;

const TimgImg = styled.img`
  width: 12px;
  height: 12px;
  margin-top: 5px;
  margin-right: 16px;
`;

const TimeText = styled.div`
  color: ${(props) => props.theme.textColors.gray50};
  font-weight: ${(props) => props.theme.fontWeights.light};
  font-size: ${(props) => props.theme.fontSize.s14h21};
`;

const ContainerArrow = styled.img`
  position: absolute;
  top: 43%;
  right: 10%;
  width: 6px;
  height: 12px;
`;

const RatingReviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  gap: 16px;
`;
const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const StarImg = styled.img`
  width: 16px;
`;

const ReviewContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const ReviewImg = styled.img`
  width: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
