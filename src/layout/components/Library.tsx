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
  padding: "1.5em"
});

const Library = () => {
  //userProfile 불러오기
  const {data: userProfile} = useGetCurrentUserProfile();
  //플레이리스트 데이터
  const {data, isLoading, error} = useGetCurrentUserPlaylist({limit: 10, offset: 0});
  console.log("플레이리스트", data);
  return (
    <LibraryContainer>
      <LibraryHead />
      {userProfile ? <UserPlaylist /> : <EmptyPlaylist />}
    </LibraryContainer>
  )
}

export default Library