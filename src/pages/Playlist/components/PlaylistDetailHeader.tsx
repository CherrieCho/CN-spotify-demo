import React from 'react'
import { Playlist } from '../../../models/playlist'
import { Grid, styled } from '@mui/system';
import { Typography } from '@mui/material';

interface PlaylistDataProps {
  data: Playlist;
}

const PlaylistHeaderBox = styled(Grid)({
  padding: "2em",
  backgroundColor: "black",
  borderRadius: "8px 8px 0 0"
});

const PlaylistImageBox = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
  height: "200px",
  borderRadius: "8px",
  overflow: "hidden",
});

const PlaylistDescriptionBox = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "1em"
});

const PlaylistDetailHeader = ({data}: PlaylistDataProps) => {
  //images가 없는경우 디폴트이미지
  const defaultImg = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

  return (
    <PlaylistHeaderBox container spacing={8}>
      <PlaylistImageBox size={3}>
        <img src={data.images && data.images.length > 0 ? data.images[0].url : defaultImg} className='playlist-img'/>
      </PlaylistImageBox>
      <PlaylistDescriptionBox size={9}>
        <Typography noWrap variant='h1' sx={{fontSize: "4rem"}}>{data.name || ""}</Typography>
        <Typography variant='body1' sx={{fontWeight: "700"}}>
          {`${data.owner?.display_name} · ${data.tracks?.items.length} songs`}
        </Typography>
      </PlaylistDescriptionBox>
    </PlaylistHeaderBox>
  )
}

export default PlaylistDetailHeader