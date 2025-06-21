import React, { useEffect, useRef } from 'react'
import useGetPlaylistItems from '../../../hooks/useGetPlaylistItems'
import { useParams } from 'react-router';
import { Box, CircularProgress, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';
import DesktopPlaylistItem from './DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../../config/commonConfig';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import { styled, useMediaQuery, useTheme } from '@mui/system';
import MobilePlaylistItem from './MobilePlaylistItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const TableBox = styled(Box)({
  overflowY: "auto",
  overflowX: 'hidden',
  maxHeight: "100%",
  '&::-webkit-scrollbar': {
    display: "none"
  },
})


const PlaylistDetailTracks = () => {
  //화면 breakpoint
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const {id} = useParams<{id: string}>();
  const {data: playlistItems, hasNextPage, isFetchingNextPage, fetchNextPage} = useGetPlaylistItems({playlist_id: id ?? "", limit: PAGE_LIMIT, offset: 0 });

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
    <TableBox ref={containerRef} >
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <Table stickyHeader sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            padding: "10px"
          }
        }}>
          <TableHead>
            {isMobile ? (
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Track</TableCell>
                <TableCell><AccessTimeIcon fontSize='small'/></TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell><AccessTimeIcon fontSize='small'/></TableCell>
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            {playlistItems?.pages.map((page, pageIndex) =>
              page.items.map((item, itemIndex) => {
                const index = pageIndex * PAGE_LIMIT + itemIndex + 1; // 노래 넘버링용 인덱스 prop 
                return isMobile ? (
                  <MobilePlaylistItem item={item} key={index} index={index} />
                ) : (
                  <DesktopPlaylistItem item={item} key={index} index={index} />
                );
              })
            )}
            <TableRow ref={ref} sx={{ height: '20px', border: "none" }}>
              <TableCell colSpan={4} sx={{ textAlign: 'center', width: "100%", overflowX: 'hidden', }}>
                {isFetchingNextPage && <CircularProgress size="30px" />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </TableBox>
  )
}

export default PlaylistDetailTracks