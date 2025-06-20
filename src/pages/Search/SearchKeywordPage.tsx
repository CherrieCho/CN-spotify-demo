import React, { useEffect, useRef, useState } from 'react'
import useSingleSearch from '../../hooks/useSingleSearch';
import { useParams } from 'react-router';
import { SEARCH_TYPE } from '../../models/search';
import Loading from '../../common/components/Loading';
import { SearchPageContainer } from './SearchPage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Grid, IconButton, List, ListItem, Menu, MenuItem, Snackbar, SnackbarCloseReason, styled, Typography } from '@mui/material';
import Card from '../../common/components/Card';
import PlayButton from '../../common/components/PlayButton';
import ErrorMessage from '../../common/components/ErrorMessage';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import useGetCurrentUserPlaylist from '../../hooks/useGetCurrentUserPlaylist';
import { PAGE_LIMIT } from '../../config/commonConfig';
import useAddTrack from '../../hooks/useAddTrack';
import { useInView } from 'react-intersection-observer';

const SearchResultTop = styled(Grid)(({theme}) => ({
  paddingLeft: "16px",
  paddingTop: "16px",
  [theme.breakpoints.down("md")]: { 
    paddingLeft: 0,
  }
}));

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
  minWidth: "130px",
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
  const [selectedTrackUri, setSelectedTrackUri] = useState<string | undefined>(undefined);
  const {mutate: addTrack} = useAddTrack();
  const {data: userProfile} = useGetCurrentUserProfile();
  const {data: userPlaylistData, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetCurrentUserPlaylist({
    limit: PAGE_LIMIT,
    offset: 0,
  });
  // 모든 페이지의 플리를 가져오기
  const allPlaylists = userPlaylistData?.pages.flatMap((page) => page?.items || []) || [];
  console.log("내 플리", allPlaylists)
  
  //플레이리스트 무한스크롤
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView({
  root: containerRef.current,
});

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  //플레이리스트 목록메뉴
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //스낵바 팝업관련
  const [open, setOpen] = useState<boolean>(false);
  const handleClickAddIcon = (event: React.MouseEvent<HTMLElement>, trackUri: string | undefined) => {
    if(!userProfile){
      setOpen(true);  //로그인 안했으면 로그인해주세요 스낵바 열기
    }else{
      setSelectedTrackUri(trackUri); // 선택된 트랙 저장
      handleOpenMenu(event);  //로그인 했으면 내 플리 목록 메뉴 팝업 오픈하기
    }
  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const isLoggedIn = () => {
    if(!userProfile){
      return "로그인을 해주세요";
    }else{
      return "플레이리스트에 추가되었습니다";
    }
  }

  //노래 플리에 추가
  const addMusicToPlaylist = (playlistId: string | undefined, trackUri: string |undefined) => {
    if(!playlistId || !trackUri) return;
    addTrack({
      playlist_id: playlistId,
      uris: [trackUri],
      position: 0,
    });
    setOpen(true); //플리에 추가되었습니다 스낵바 열기
    setAnchorEl(null); //메뉴 닫기
  }

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
            {slicedTrackData && slicedTrackData?.map((item, index) => (
              <SongListItem key={index}>
                <Box sx={{display: "flex", width: "60%"}}>
                  <Avatar variant="circular" sx={{borderRadius: "8px", marginRight: "12px"}} src={item.album?.images?.[0]?.url}/>
                  <Box sx={{display: "flex", flexDirection: "column", minWidth: 0}}>
                    <Typography noWrap variant='body1' sx={{fontSize: '1rem', fontWeight: "700"}}>{item.name}</Typography>
                    <Typography noWrap variant='body1' sx={{fontSize: '0.875rem', color: "gray"}}>{item.artists?.[0].name}</Typography>
                  </Box>
                </Box>
                <IconButton
                id="add-button"
                className="icon-button"
                aria-controls={openMenu ? 'long-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={(event) => handleClickAddIcon(event, item.uri)}
                sx={{
                  color: "rgb(179, 179, 179)",
                  opacity: 0,
                  transform: "translate(0%, 0%)",
                  transition: "opacity 0.3s ease-in-out",
                  }}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Menu
                ref={containerRef}
                id="long-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  },
                  list: {
                    'aria-labelledby': 'add-button',
                  },
                }}
                >
                  {allPlaylists.map((playlist, index) => (
                      <MenuItem key={index} onClick={() => addMusicToPlaylist(playlist.id, selectedTrackUri)}>
                        <Typography noWrap>{playlist.name}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem sx={{height: 0, minHeight: 0, overflow: "hidden", padding: 0}}>
                      <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
                    </MenuItem>
                </Menu>
                <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={isLoggedIn()}
                action={action}
                />
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
          {slicedArtistData && slicedArtistData?.map((item, index) => (
            <ArtistCard size={{xs: 6, sm: 4, md: 2}} className='artist-card' key={index}>
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
          {slicedAlbumData?.map((item, index) => (
            <Grid size={{xs: 6, sm:4, md:3, lg: 2}} key={index}>
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