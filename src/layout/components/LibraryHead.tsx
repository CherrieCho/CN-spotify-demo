import React from 'react'
import { Box, Button, styled, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';

//styled component
const PlaylistHeader = styled("div")(() => ({
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const LibraryHead = () => {
  const {mutate: createPlaylist} = useCreatePlaylist();
  const handleCreatePlaylist = () => {
    //CreatePlaylistRequest 타입에 있는 파라미터를 보내줌
    createPlaylist({name: "케이팝 좋아"});
  }

  return (
    <PlaylistHeader>
      <Box sx={{display: "flex", alignItems: "center", gap: "20px"}}>
        <BookmarkIcon />
        <Typography noWrap variant='h2' fontWeight={700}>Your Library</Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon sx={{ color: "#1ed760" }} />
      </Button>
    </PlaylistHeader>
  )
}

export default LibraryHead