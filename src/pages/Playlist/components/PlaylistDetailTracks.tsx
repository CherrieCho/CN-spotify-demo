import React, { useEffect, useRef } from 'react'
import useGetPlaylistItems from '../../../hooks/useGetPlaylistItems'
import { useParams } from 'react-router';
import { Box, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';
import DesktopPlaylistItem from './DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../../config/commonConfig';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import { styled } from '@mui/system';

export const TableBox = styled(Box)({
  overflow: "auto",
  maxHeight: "100%",
  '&::-webkit-scrollbar': {
    display: "none"
  },
})


const PlaylistDetailTracks = () => {
  const {id} = useParams<{id: string}>();
  const {data: playlistItems, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetPlaylistItems({playlist_id: id ?? "", limit: PAGE_LIMIT, offset: 0 });

  console.log("트랙정보", playlistItems);

  //무한스크롤
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView({
    root: containerRef.current,
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();  //offset을 다음페이지 분량에 맞춰서 호출하는 함수
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <TableBox ref={containerRef} sx={{maxHeight: "100%"}}>
      <Table stickyHeader sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none"
        }
      }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => {
            return <DesktopPlaylistItem
            item={item}
            key={pageIndex * PAGE_LIMIT + itemIndex + 1}
            // 노래 넘버링용 인덱스 prop
            index={pageIndex * PAGE_LIMIT + itemIndex + 1}/>
          }))}
          <TableRow ref={ref} sx={{ height: '20px', border: "none" }}>
            <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
              {isFetchingNextPage && <Loading />}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableBox>
  )
}

export default PlaylistDetailTracks