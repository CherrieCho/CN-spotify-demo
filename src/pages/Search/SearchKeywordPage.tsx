import React from 'react'
import useSingleSearch from '../../hooks/useSingleSearch';
import { useParams } from 'react-router';
import { SEARCH_TYPE } from '../../models/search';
import Loading from '../../common/components/Loading';
import { SearchPageContainer } from './SearchPage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Box, Grid, IconButton, List, ListItem, styled, Typography } from '@mui/material';
import Card from '../../common/components/Card';
import PlayButton from '../../common/components/PlayButton';
import ErrorMessage from '../../common/components/ErrorMessage';

const SearchResultTop = styled(Grid)({
  paddingLeft: "16px",
  paddingTop: "16px"
});

const SongListItem = styled(ListItem)({
  width: "100%",
  padding: "8px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#282828",
  },
  "&:hover .icon-button": {
    opacity: 1,
  },
});

const TopResultBox = styled(Box)({
  padding: "20px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#282828",
  },
  position: "relative",
});

const TopResultImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center"
});

const ArtistCard = styled(Grid)({
  width: "100%",
  minWidth: "160px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#282828",
  },
  padding: "12px"
});

const ArtistImage  = styled("img")({
  width: "100%",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: "100%"
});

const SearchKeywordPage = () => {
  //검색데이터
  const { keyword } = useParams<{ keyword: string }>();
  const {data, error, isLoading } = useSingleSearch({
  q: keyword ?? "",
  type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });
  console.log(`${keyword} 에 대한 검색결과`, data)

  //데이터 필터링
  const trackData = data?.tracks?.items;
  const albumData = data?.albums?.items;
  const artistData = data?.artists?.items;
  const slicedTrackData = data?.tracks?.items.slice(0, 4);  //노래 검색결과에서 상위 4개만 노출
  const slicedArtistData = data?.artists?.items.slice(0, 6);
  const slicedAlbumData = data?.albums?.items.slice(0, 6);

  //밀리초 변환
  const changeIntoMinuteSeconds = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000); 
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  //image가 없는경우 디폴트이미지
  const defaultImg = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

  if(isLoading){
    return <Loading />
  }

  if(error){
    return <ErrorMessage errorMessage = {error.message} />
  }

  if(trackData?.length === 0 || albumData?.length === 0 || artistData?.length === 0){
    return (
      <Box sx={{width: "100%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Typography variant='h1'>{`No results found for "${keyword}"`}</Typography>
      </Box>
    )
  }

  return (
    <SearchPageContainer sx={{padding: "0 16px"}}>
      <Grid container sx={{marginTop: "24px", width: "calc(100% + 16px)"}}>
        {trackData?.[0] && (<SearchResultTop size={{xs: 12, md: 6}}>
          <Typography variant='h1' sx={{paddingBottom: "8px"}}>Top Result</Typography>
          <TopResultBox className='top-result-box'>
            <Box sx={{marginBottom: "8px", width: "92px", aspectRatio: "1 /1", overflow: "hidden", borderRadius: "8px"}}>
              <TopResultImage src={trackData?.[0].album?.images?.[0]?.url}/>
              <PlayButton className='top-result-override' />
            </Box>
            <Typography variant='body1' sx={{fontSize: '2rem', fontWeight: "700"}}>{trackData?.[0].name}</Typography>
            <Typography variant='body1' sx={{margin: "0px 0px 20px"}}>{`Song ● ${trackData?.[0].artists?.[0].name}`}</Typography>
          </TopResultBox>
        </SearchResultTop>)}

        <SearchResultTop size={{xs: 12, md: 6}}>
          <Typography variant='h1' sx={{paddingBottom: "8px"}}>Songs</Typography>
          <List>
            {slicedTrackData && slicedTrackData?.map((item) => (
              <SongListItem>
                <Box sx={{display: "flex", width: "60%"}}>
                  <Avatar variant="circular" sx={{borderRadius: "8px", marginRight: "12px"}} src={item.album?.images?.[0]?.url}/>
                  <Box sx={{display: "flex", flexDirection: "column", minWidth: 0}}>
                    <Typography variant='body1' sx={{fontSize: '1rem', fontWeight: "700"}}>{item.name}</Typography>
                    <Typography variant='body1' sx={{fontSize: '0.875rem', color: "gray"}}>{item.artists?.[0].name}</Typography>
                  </Box>
                </Box>
                <IconButton className="icon-button" sx={{
                  color: "rgb(179, 179, 179)",
                  opacity: 0,
                  transform: "translate(0%, 0%)",
                  transition: "opacity 0.3s ease-in-out",
                  }}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Box>
                  <Box>
                    {item.duration_ms !== undefined
                    ? changeIntoMinuteSeconds(item.duration_ms)
                    : "Unknown"}
                  </Box>
                </Box>
              </SongListItem>
              ))
            }
          </List>
        </SearchResultTop>
      </Grid>

      <Box>
        <Typography variant='h1' sx={{margin: "24px 0"}}>Artists</Typography>
        <Grid container sx={{width: "100%"}}>
          {slicedArtistData && slicedArtistData?.map((item) => (
            <ArtistCard size={{xs: 6, sm: 4, md: 2}} className='artist-card'>
              <Box sx={{width: "100%"}}>
                <Box sx={{width: "100%", position: "relative"}}>
                  <ArtistImage src={item.images?.[0]?.url ?? defaultImg} />
                  <PlayButton className='override' />
                </Box>
                <Typography variant='h2' sx={{margin: "16px 0px 0px"}}>{item.name}</Typography>
                <Typography variant='body1' sx={{color: "gray"}}>{item.type}</Typography>
              </Box>
            </ArtistCard>
          ))
            }
        </Grid>
      </Box>

      <Box>
        <Typography variant='h1' sx={{margin: "24px 0"}}>Albums</Typography>
        <Grid container sx={{width: "100%"}}>
          {slicedAlbumData?.map((item) => (
            <Grid size={{xs: 6, sm: 4, md: 2}} >
              <Card image={item.images?.[0]?.url} name={item.name} artistName={item.artists[0].name} />
            </Grid>
          ))
            }
        </Grid>
      </Box>
    </SearchPageContainer>
  )
}

export default SearchKeywordPage