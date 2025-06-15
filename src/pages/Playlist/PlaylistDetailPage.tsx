import React from 'react'
import { Navigate, useParams } from 'react-router'
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PlaylistDetailHeader from './components/PlaylistDetailHeader';
import PlaylistDetailTracks from './components/PlaylistDetailTracks';
import NoPlaylistData from '../../common/components/NoPlaylistData';
import SearchMusic from './components/SearchMusic';

const PlaylistDetailContainer = styled(Box)({
  height: "calc(100% - 64px)",
  padding: "16px",
  paddingTop: "2em",
  minWidth: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column"
});

const PlaylistDetailPage = () => {
  const {id} = useParams<{id: string}>();

  const {data: playlistData} = useGetPlaylist({playlist_id: id ?? ""});

  console.log("플레", playlistData);

  //playlist id가 undefined일 경우?
  if(id === undefined || !playlistData) return <NoPlaylistData />;
  return (
    <PlaylistDetailContainer>
      <PlaylistDetailHeader data={playlistData} />
      {playlistData?.tracks?.total === 0 ?
      (
      <Box sx={{ flex: 1, minHeight: 0, }}>
        <SearchMusic />
      </Box>
      )
    : (
      <Box sx={{ flex: 1, minHeight: 0, }}>
        <PlaylistDetailTracks />
      </Box>
    )
    }
    </PlaylistDetailContainer >
  )
}

export default PlaylistDetailPage