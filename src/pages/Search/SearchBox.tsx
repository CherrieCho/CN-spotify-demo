import { Box, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const SearchBox = () => {
  //검색
  const [keyword, setKeyword] = useState<string>("");
  const { keyword: keywordFromUrl } = useParams<{ keyword: string }>(); //url에서 키워드 읽어오기
  const navigate = useNavigate();

  //새고(리렌더)해도 검색창에 입력한 키워드 안날라가게 url에서 읽어와 value로 지정해주기
  useEffect(() => {
    if (keywordFromUrl) {
      setKeyword(keywordFromUrl);
    }
  }, [keywordFromUrl]);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    navigate(`/search/${event.target.value}`);
  }

  return (
    <Box sx={{width: "100%"}}>
      <TextField 
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder='What do you want to play?'
        sx={{
          "& fieldset": {border: "none"},
          backgroundColor: "#282828",
          borderRadius: "50px",
          width: "100%",
          maxWidth: "365px",
          minWidth: 0
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: "#C0C0C0"}} />
              </InputAdornment>
            ),
          },
        }}
        />
    </Box>
  )
}

export default SearchBox