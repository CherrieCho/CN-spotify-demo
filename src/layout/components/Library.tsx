import React from 'react'
import LibraryHead from './LibraryHead'
import EmptyPlaylist from './EmptyPlaylist'
import { styled } from '@mui/material';
import useGetCurrentUserPlaylist from '../../hooks/useGetCurrentUserPlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import UserPlaylist from './UserPlaylist';

const LibraryContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  width: "100%",
  height: "100%",
  padding: "1em"
});

const Library = () => {
  //userProfile 불러오기
  const {data: userProfile} = useGetCurrentUserProfile();
  return (
    <LibraryContainer>
      <LibraryHead />
      {userProfile ? <UserPlaylist /> : <EmptyPlaylist />}
    </LibraryContainer>
  )
}

export default Library