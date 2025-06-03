import React from 'react'
import LibraryHead from './LibraryHead'
import EmptyPlaylist from './EmptyPlaylist'
import { styled } from '@mui/material';

const LibraryContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  width: "100%",
  height: "100%",
  padding: "1.5em"
});

const Library = () => {
  return (
    <LibraryContainer>
      <LibraryHead />
      <EmptyPlaylist />
    </LibraryContainer>
  )
}

export default Library