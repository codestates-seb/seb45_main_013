import styled from 'styled-components';

const Search = () => {
  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitleText>무엇을 찾으시나요?</SearchTitleText>
        <InputContainer>
          <SearchInput placeholder="검색어를 입력해주세요" />
        </InputContainer>
      </SearchHeader>
      <SearchBody>
        <ResultContainer>
          <ResultText>검색결과</ResultText>
        </ResultContainer>
      </SearchBody>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  height: 100%;
  border: 1px solid black;
  background-color: #fefdff;
`;

const SearchHeader = styled.div`
  margin: 40px 157px 0 40px;
`;

const SearchTitleText = styled.div`
  ${(props) => props.theme.fontSize.s20h30};
  color: #595959;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

const InputContainer = styled.div`
  margin: 44px 40px 0;
`;

const SearchInput = styled.input``;

const SearchBody = styled.div`
  margin: 44px 40px 0;
`;

const ResultContainer = styled.div``;

const ResultText = styled.div`
  ${(props) => props.theme.fontSize.s20h30};
  color: #595959;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
`;

export default Search;
