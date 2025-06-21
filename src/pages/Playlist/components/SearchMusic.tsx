import { Box, InputAdornment, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultTrackList from './SearchResultTrackList';
import Loading from '../../../common/components/Loading';
import SearchIcon from '@mui/icons-material/Search';
import { PAGE_LIMIT } from '../../../config/commonConfig';
import { useInView } from 'react-intersection-observer';
import { ScrollBox } from '../../../layout/components/Libraries/Library';
import theme from '../../../theme';

export const ScrollContainer = styled(Box)({
  marginTop: "20px",
  overflow: "hidden",
  flex: 1,
  minHeight: 0,
  '&::-webkit-scrollbar': {
    display: "none"
  },
})

const SearchbarContainer = styled(Box)(({theme}) => ({
  padding: "10px 0",
  marginTop: "20px",
  maxWidth: "450px",
  [theme.breakpoints.down("sm")]: { 
    marginTop: "10px",
  }
}));

const SearchMusic = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage} = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
    limit: PAGE_LIMIT,
    offset: 0
  });

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  } 

  // 모든 페이지를 가져오기
  const allTracks = data?.pages.flatMap((page) => page.tracks?.items || []) || [];

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <SearchbarContainer>
        <Typography
        variant='h1'
        sx={{
          marginBottom: "0.8em",
          [theme.breakpoints.down("sm")]: { 
            display: "none"
          }
          }}>
          Let's find something for your playlist
        </Typography>
        <TextField 
        fullWidth
        size='small'
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder='Search Music'
        sx={{"& fieldset": {border: "none"}, backgroundColor: "#282828"}}
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
      </SearchbarContainer>
      <ScrollContainer>
        {data && data.pages.some((page) => page.tracks) ? (
        <SearchResultTrackList
          list={allTracks}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
          ) : keyword ? (
            isLoading ? <Loading /> : <Typography variant='h2'>{`No Results Found for "${keyword}"`}</Typography>
          ) : null}
      </ScrollContainer>
    </Box>
  )
}

export default SearchMusic