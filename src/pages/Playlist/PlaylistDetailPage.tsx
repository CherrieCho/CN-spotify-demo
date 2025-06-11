import React from 'react'
import { Navigate, useParams } from 'react-router'
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import PlaylistDetailHeader from './components/PlaylistDetailHeader';

const PlaylistDetailContainer = styled(Box)({
  padding: "16px",
  marginTop: "2em"
});

const PlaylistDetailPage = () => {
  const {id} = useParams<{id: string}>();

  const {data: playlistData} = useGetPlaylist({playlist_id: id ?? ""});

  console.log("플레", playlistData)

  //playlist id가 undefined일 경우?
  if(id === undefined || !playlistData) return <Navigate to='/' />;
  return (
    <PlaylistDetailContainer>
      <PlaylistDetailHeader data={playlistData} />
    </PlaylistDetailContainer>
  )
}

export default PlaylistDetailPage