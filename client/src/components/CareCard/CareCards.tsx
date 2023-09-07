import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookieValue } from 'hooks/getCookie';
import { useSelector } from 'react-redux';
import { IUser } from 'modules/userSlice';
import { useParams } from 'react-router-dom';
import CareCard from './Carecard';

const CareCards = ({ filter }: any) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { isLogin, memberId, petsitterBoolean } = useSelector((state: IUser) => state.login);
  const [reservations, setReservations] = useState<any[]>([]);

  const { memberId: id } = useParams();

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
    <>
      {reservations.length === 0 ? (
        <div>등록된 예약이 없습니다.</div>
      ) : (
        reservations.map((reservation) => <CareCard key={reservation.reservationId} reservation={reservation} />)
      )}
      <CareCard />
    </>
  );
};

export default CareCards;
