import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IUser } from 'store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CareCard from '@components/Carecard';
import { getCookieValue } from 'hooks/getCookie';
import { useInView } from 'react-intersection-observer';
import jwt_decode from 'jwt-decode';
import { refreshAccessToken } from 'hooks/refreshAcessToken';

import { CircularProgress } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_URL;

const filters = [
  { text: '최신순', value: '' },
  { text: '예정', value: `&condition=expected` },
  { text: '완료', value: `&condition=finish` },
];

const Cares = () => {
  const navigate = useNavigate();
  const accessToken = getCookieValue('access_token');

  const { ref, inView } = useInView();

  const [filter, setFilter] = useState('최신순');
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const { isLogin, memberId, email, petsitterBoolean } = useSelector((state: IUser) => state.user);
  const [reservations, setReservations] = useState<any[]>([]);

  const handleFilter = (e: any) => {
    setFilter(e);
    setReservations([]);
    setIsEnd(false);
    setPage(1);
  };
  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요.');
      navigate('/');
    } else if (!accessToken) {
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

  // 예약 불러오기 (access token 재발급 완료)
  useEffect(() => {
    if (isLogin && inView) {
      const getCares = async () => {
        try {
          const response = await axios.get(
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
          );
          setReservations((prev) => [...prev, ...response.data.reservations]);
          setPage((page) => page + 1);
          if (response.data.pageInfo.totalPages === page || response.data.pageInfo.totalPages === 0) {
            setIsEnd(true);
          }
        } catch (error: any) {
          if (error) {
            setIsEnd(true);
          }
          if (error.response.status === 401) {
            try {
              const newAccessToken = await refreshAccessToken();
              const response = await axios.get(
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
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                },
              );
              setReservations((prev) => [...prev, ...response.data.reservations]);
              setPage((page) => page + 1);
            } catch (error) {
              // 에러 설정 해야함 (access token이 재발급 되지 않는 상황)
              console.log(error);
            }
          }
        }
      };
      getCares();
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
          ) : !isEnd ? null : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div>등록된 예약이 없습니다.</div>
            </div>
          )}
          {!isEnd ? (
            <LoadingContainer ref={ref}>
              <CircularProgress />
            </LoadingContainer>
          ) : null}
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;
