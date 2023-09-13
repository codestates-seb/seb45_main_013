import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CareCard from '@components/Carecard';
import { getCookieValue } from 'hooks/getCookie';
import { useInView } from 'react-intersection-observer';

const Cares = () => {
  const [filter, setFilter] = useState('전체');
  const apiUrl = process.env.REACT_APP_API_URL;
  const { memberId: id } = useParams();
  const navigate = useNavigate();

  const { ref, inView } = useInView();

  const filters = ['전체', '예정', '완료'];

  const { isLogin, memberId, petsitterBoolean } = useSelector((state: IUser) => state.user);
  const [reservations, setReservations] = useState<any[]>([]);

  console.log(reservations);

  const handleFilter = (e: any) => {
    setFilter(e.target.innerText);
  };
  useEffect(() => {
    if (!isLogin || (id && memberId !== +id)) {
      alert('권한이 없습니다.');
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const accessToken = getCookieValue('access_token');

    if (isLogin && id && memberId === +id) {
      axios
        .get(
          `${apiUrl}/reservations/${petsitterBoolean ? 'petsitter' : 'member'}?page=1&size=10${
            filter === '예정' ? '&condition=expected' : filter === '완료' ? '&condition=finish' : ''
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => setReservations(res.data.reservations))
        .catch((error) => console.log(error));
    }
  }, [filter]);

  return (
    <MainContainer>
      <CareContainer>
        <FilterContainer>
          {filters.map((el, index) => (
            <FilterButtonStyle key={index} onClick={handleFilter} $filter={filter === el}>
              {el}
            </FilterButtonStyle>
          ))}
        </FilterContainer>
        <CareCardContainer>
          {Array.isArray(reservations) && reservations.length > 0 ? (
            reservations.map((reservation) => <CareCard key={reservation.reservationId} reservation={reservation} />)
          ) : (
            <div>등록된 예약이 없습니다.</div>
          )}
          <div ref={ref}>Loading...</div>
        </CareCardContainer>
      </CareContainer>
    </MainContainer>
  );
};

export default Cares;

const MainContainer = styled.main`
  height: 100%;
  padding: 12px;
  background-color: white;
`;

const CareContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterButtonStyle = styled.div<{ $filter: boolean | undefined }>`
  padding: 4px 8px;
  border: ${({ theme, $filter }) => ($filter ? 'none' : `1px solid ${theme.colors.mainBlue}`)};
  border-radius: 4px;
  color: ${({ $filter }) => ($filter ? 'white' : 'black')};
  background-color: ${({ theme, $filter }) => ($filter ? theme.colors.mainBlue : 'white')};
  cursor: pointer;
`;

const CareCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  gap: 16px;
`;
