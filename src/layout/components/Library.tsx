import React, { useEffect } from 'react'
import LibraryHead from './LibraryHead'
import EmptyPlaylist from './EmptyPlaylist'
import { Box, styled } from '@mui/material';
import useGetCurrentUserPlaylist from '../../hooks/useGetCurrentUserPlaylist';
import UserPlaylist from './UserPlaylist';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';

const LibraryContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  width: "100%",
  height: "100%",
  padding: "1em",
});

const Library = () => {
  //무한스크롤 라이브러리
  const { ref, inView } = useInView();
  const {data: userProfileData} = useGetCurrentUserProfile();
  const {data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetCurrentUserPlaylist({
    limit: 10,
    offset: 0,
  });
  console.log("플레이리스트", data);

  //무한스크롤
  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();  //offset을 다음페이지 분량에 맞춰서 호출하는 함수
    }
  }, [inView]);

  if(!userProfileData){
    return <EmptyPlaylist />
  }

  if(isLoading){
    return <Loading />
  }
  if(error){
    return <ErrorMessage errorMessage={error.message} />
  }

  return (
    <LibraryContainer>
      <LibraryHead />
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ):(
      <Box sx={{overflow: "scroll", overflowX: "hidden"}}>
        {data?.pages.map((page, index) => (
          <UserPlaylist playlists={page.items} key={index} />
        ))}
        <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
      </Box>
      )}
    </LibraryContainer>
  )
}

export default Library