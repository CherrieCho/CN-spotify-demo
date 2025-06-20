import React from 'react'
import { Playlist } from '../../../models/playlist'
import { alignItems, flexDirection, flexWrap, Grid, justifyContent, styled } from '@mui/system';
import { Typography } from '@mui/material';
import theme from '../../../theme';

interface PlaylistDataProps {
  data: Playlist;
}

const PlaylistHeaderBox = styled(Grid)(({theme}) => ({
  padding: "2em",
  backgroundColor: "black",
  borderRadius: "8px 8px 0 0",
  minWidth: 0,
  flexWrap: "nowrap",
  [theme.breakpoints.down("sm")]: { 
    padding: "10px",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const PlaylistImageBox = styled(Grid)(({theme}) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
  aspectRatio: "1 / 1",
  borderRadius: "8px",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    width: "150px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "120px",
  },
}));

const PlaylistDescriptionBox = styled(Grid)(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "1em",
  minWidth: 0,
  [theme.breakpoints.down("sm")]: { 
    alignItems: "flex-start",
    textAlign: "left",
    width: "100%",
    paddingTop: "1em",
  }
}));

const PlaylistDetailHeader = ({data}: PlaylistDataProps) => {
  //images가 없는경우 디폴트이미지
  const defaultImg = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

  return (
    <PlaylistHeaderBox container spacing={{xs: 3, sm: 5, md: 8}}>
      <PlaylistImageBox size={3}>
        <img src={data.images && data.images.length > 0 ? data.images[0].url : defaultImg} className='playlist-img'/>
      </PlaylistImageBox>
      <PlaylistDescriptionBox size={9}>
        <Typography
        noWrap
        variant='h1'
        sx={{
          fontSize: "4rem",
          maxWidth: "100%",
          minWidth: 0,
          overflow:
          "hidden",
          [theme.breakpoints.down("lg")]: {
            fontSize: "2rem",
          },
          }}>
            {data.name || ""}
        </Typography>
        <Typography variant='body1' sx={{fontWeight: "700"}}>
          {`${data.owner?.display_name} · ${data.tracks?.items.length} songs`}
        </Typography>
      </PlaylistDescriptionBox>
    </PlaylistHeaderBox>
  )
}

export default PlaylistDetailHeader