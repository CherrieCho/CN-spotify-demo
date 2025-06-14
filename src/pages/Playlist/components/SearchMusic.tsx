import { Box, InputAdornment, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultTrackList from './SearchResultTrackList';
import Loading from '../../../common/components/Loading';
import SearchIcon from '@mui/icons-material/Search';
import { PAGE_LIMIT } from '../../../config/commonConfig';
import { useInView } from 'react-intersection-observer';
import { ScrollBox } from '../../../layout/components/Library';

export const ScrollContainer = styled(Box)({
  marginTop: "20px",
  overflowY: "auto",
  overflowX: "hidden",
  height: "600px",
  '&::-webkit-scrollbar': {
    display: "none"
  },
})

const SearchbarContainer = styled(Box)({
  padding: "10px 0",
  marginTop: "20px",
  maxWidth: "450px",
});

const SearchMusic = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage} = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
    limit: PAGE_LIMIT,
    offset: 0
  });
  console.log("검색결과", data);
  console.log("키워드", keyword);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }

  //무한스크롤
  const { ref, inView } = useInView();

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();  //offset을 다음페이지 분량에 맞춰서 호출하는 함수
    }
  }, [inView]);

  return (
    <Box sx={{height: "100%"}}>
      <SearchbarContainer>
        <Typography variant='h1' sx={{marginBottom: "0.8em"}}>Let's find something for your playlist</Typography>
        <TextField 
        fullWidth
        size='small'
        value={keyword}
        onChange={handleSearchKeyword}
        sx={{border: "0", backgroundColor: "#282828"}}
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
      <ScrollContainer sx={{maxHeight: "800px"}}>
      {data && data.pages.some((page) => page.tracks) ?
        data.pages.map((item, index) => {
          if(!item.tracks){
            return null
          }else{
            return (
              <SearchResultTrackList list={item.tracks.items} key={index}/>
          )
          }
        })
        // 데이터는 없고 키워드는 있는 상태. 이때 로딩이냐 아니냐
        : keyword ? isLoading ?
          <Loading /> :
          <Typography variant='h2'>
            {`No Results Found for "${keyword}"`}
          </Typography>
          //데이터도 없고 키워드도 없음(아직 검색안함 상태)
          : ""
      }
      <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
      </ScrollContainer>
    </Box>
  )
}

export default SearchMusic