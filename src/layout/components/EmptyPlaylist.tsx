import { Box, styled, Typography, Button } from '@mui/material';
import React from 'react'

const CreatePlaylistBox = styled(Box)(({theme}) => ({
  borderRadius: "8px",
  backgroundColor: "#1E1E1E",
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: "1.5em",
  padding: "2em"
}));

const CreatePlaylistText = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
});


const EmptyPlaylist = () => {
  return (
    <CreatePlaylistBox>
      <CreatePlaylistText>
        <Typography variant='h2' fontWeight={700}>
          Create your first playlist
        </Typography>
        <div>
          it's easy, we'll help you
        </div>
      </CreatePlaylistText>
      <Button variant='contained' color='secondary' size='large'>
        Create Playlist
      </Button>
    </CreatePlaylistBox>
  )
}

export default EmptyPlaylist