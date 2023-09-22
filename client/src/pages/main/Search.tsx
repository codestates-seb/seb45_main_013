import { useEffect, useState } from 'react';
import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handlekeyPress = (e: any) => {
    //검색어 입력 후 엔터키 누르면 검색결과 보여주기
    if (e.key === 'Enter') {
      setShowResults(true);
    }
  };

  const handleButtonClick = (e: any) => {
    setSearchTerm(e.currentTarget.textContent);
    setShowResults(true);
  };

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    try {
      const getSearchResults = async () => {
        const response = await axios.post(`${apiUrl}/`);
      };
    } catch (error) {}
  }, []);

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitleText>무엇을 찾으시나요?</SearchTitleText>
        <InputContainer>
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder="검색어를 입력해주세요"
            fullWidth
            onKeyPress={handlekeyPress}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { paddingLeft: '8px' },
            }}
          />
          <RecommendContainer>
            <RecommendText>추천검색어</RecommendText>
          </RecommendContainer>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleButtonClick}
            sx={{ marginRight: '8px', borderRadius: '20px' }}
          >
            펫시터
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleButtonClick}
            sx={{ marginRight: '8px', borderRadius: '20px' }}
          >
            지역
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleButtonClick}
            sx={{ marginRight: '8px', borderRadius: '20px' }}
          >
            후기가 많은 펫시터
          </Button>
        </InputContainer>
      </SearchHeader>

      {showResults && (
        <SearchBody>
          <ResultContainer>
            <ResultText>검색결과</ResultText>
          </ResultContainer>
        </SearchBody>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  height: 100%;
  padding: 12px;
  background-color: #fefdff;
`;

const SearchHeader = styled.div`
  margin: 40px 40px 0;
`;

const SearchTitleText = styled.div`
  ${(props) => props.theme.fontSize.s20h30};
  color: #595959;
  font-weight: ${(props) => props.theme.fontWeights.extrabold};
  margin-bottom: 36px;
`;

const InputContainer = styled.div``;

const RecommendContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 12px;
`;

const RecommendText = styled.div`
  ${(props) => props.theme.fontSize.s14h21};
`;

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
