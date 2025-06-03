import React from 'react'
import { styled, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';

//styled component
const PlaylistHeader = styled("div")(() => ({
  border: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const LibraryHead = () => {
  return (
    <PlaylistHeader>
      <BookmarkIcon />
      <Typography variant='h2' fontWeight={700}>Your Library</Typography>
      <AddIcon sx={{ color: "#1ed760" }} />
    </PlaylistHeader>
  )
}

export default LibraryHead