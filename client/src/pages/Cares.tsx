import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CareCard from '@components/Carecard';
import { getCookieValue } from 'hooks/getCookie';
import { useInView } from 'react-intersection-observer';
import jwt_decode from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_URL;

const filters = [
  { text: '최신순', value: '' },
  { text: '예정', value: `&condition=expected` },
  { text: '완료', value: `&condition=finish` },
];

const Cares = () => {
  const accessToken = getCookieValue('access_token');

  const [filter, setFilter] = useState('최신순');
  const [page, setPage] = useState(1);
  const [isEnd, setEnd] = useState(false);

  const navigate = useNavigate();

  const { ref, inView } = useInView();

  const { isLogin, memberId, email, petsitterBoolean } = useSelector((state: IUser) => state.user);
  const [reservations, setReservations] = useState<any[]>([]);

  const handleFilter = (e: any) => {
    setFilter(e);
    setReservations([]);
    setEnd(false);
    setPage(1);
  };
  useEffect(() => {
    if (!isLogin || !accessToken) {
      alert('권한이 없습니다.');
      navigate('/');
    }
    if (accessToken) {
      const decoded: any = jwt_decode(accessToken);
      if (decoded && decoded.id && memberId !== decoded.id && email !== decoded.email) {
        alert('권한이 없습니다.');
        navigate('/');
      }
    }
  }, []);

  // console.log('isEnd:', isEnd);
  // console.log('Loading... 이 보이나요?: ', inView);
  // console.log(reservations);

  useEffect(() => {
    if (isLogin && inView) {
      axios
        .get(
          `${apiUrl}/reservations/${petsitterBoolean ? 'petsitter' : 'member'}?page=${page}&size=10${filters
            .map((filterItem) => {
              if (filter === filterItem.text) {
                return filterItem.value;
              }
              return '';
            })
            .join('')}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          console.log(res);

          setReservations((prev) => [...prev, ...res.data.reservations]);
          setPage((page) => page + 1);
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            setEnd(true);
          }
          if (error.response.data.status === 401) {
          }
        });
    }
  }, [accessToken, filter, inView]);

  return (
    <MainContainer>
      <CareContainer>
        <FilterContainer>
          {filters.map((el, index) => (
            <FilterButtonStyle key={index} onClick={() => handleFilter(el.text)} $filter={filter === el.text}>
              {el.text}
            </FilterButtonStyle>
          ))}
        </FilterContainer>
        <CareCardContainer>
          {Array.isArray(reservations) && reservations.length > 0 ? (
            reservations.map((reservation) => <CareCard key={reservation.reservationId} reservation={reservation} />)
          ) : (
            <div>등록된 예약이 없습니다.</div>
          )}
          {!isEnd && <div ref={ref}>Loading...</div>}
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
