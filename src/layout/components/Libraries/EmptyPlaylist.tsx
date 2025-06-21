import { Box, styled, Typography, Button } from '@mui/material';
import React from 'react'
import { getSpotifyAuthUrl } from '../../../utils/auth';


const CreatePlaylistBox = styled(Box)(({theme}) => ({
  borderRadius: "8px",
  backgroundColor: "#1E1E1E",
  color: theme.palette.text.primary,
  padding: "20px"
}));


const EmptyPlaylist = () => {
  const login = () => {
    getSpotifyAuthUrl();
  }
  
  return (
    <CreatePlaylistBox>
      <Typography variant='h2' fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography noWrap variant='body1'>
        it's easy, we'll help you
      </Typography>
      <Button variant='contained' color='secondary' size='medium' onClick={login} sx={{marginTop: "20px", fontWeight: "700"}}>
        Sign in to Spotify
      </Button>
    </CreatePlaylistBox>
  )
}

export default EmptyPlaylist