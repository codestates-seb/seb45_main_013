import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IUser } from 'modules/userSlice';
import { useParams } from 'react-router-dom';
import CareCards from '../../components/CareCard/CareCards';
// import { getCookieValue } from 'hooks/getCookie';

const Cares = () => {
  const [filter, setFilter] = useState('전체');

  // const navigate = useNavigate();
  const { isLogin, petsitterBoolean } = useSelector((state: IUser) => state.login);

  const handleFilter = (e: any) => {
    setFilter(e.target.innerText);
  };

  console.log(`cares: ${isLogin}`);
  console.log(petsitterBoolean);

  const { memberId: id } = useParams();

  useEffect(() => {
    // const accessToken = getCookieValue('access_token');
  }, [id]);

  return (
    <MainContainer>
      <CareContainer>
        <FilterContainer>
          <FilterButtonStyle onClick={handleFilter} filter={filter === '전체' ? 'true' : undefined}>
            전체
          </FilterButtonStyle>
          <FilterButtonStyle onClick={handleFilter} filter={filter === '예정' ? 'true' : undefined}>
            예정
          </FilterButtonStyle>
          <FilterButtonStyle onClick={handleFilter} filter={filter === '완료' ? 'true' : undefined}>
            완료
          </FilterButtonStyle>
        </FilterContainer>
        <CareCardContainer>
          <CareCards filter={filter} />
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

const FilterButtonStyle = styled.div<{ filter: string | undefined }>`
  padding: 4px 8px;
  border: ${(props) => (props.filter === 'true' ? 'none' : `1px solid ${props.theme.colors.mainBlue}`)};
  border-radius: 4px;
  color: ${(props) => (props.filter === 'true' ? 'white' : 'black')};
  background-color: ${(props) => (props.filter === 'true' ? props.theme.colors.mainBlue : 'white')};
  cursor: pointer;
`;

const CareCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  gap: 16px;
  overflow-y: auto;
`;
