import React, { useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  styled,
  tableCellClasses,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Track } from '../../../models/track';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import { PlaylistImgBox } from '../../../common/components/PlaylistItem';

import { useParams } from 'react-router';
import useAddTrack from '../../../hooks/useAddTrack';
import { Box, useMediaQuery } from '@mui/system';

interface SearchResultTrackListProps {
  list: Track[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const StyledTableContainer = styled(TableContainer)({
  minHeight: 0,
  maxHeight: "100%",
  overflow: 'auto',
  overflowX: "hidden",
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const StyledImg = styled('img')({
  width: '40px',
  aspectRatio: '1 / 1',
  borderRadius: '8px',
});

const SearchResultTrackList = ({
  list,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: SearchResultTrackListProps) => {
  //화면 breakpoint
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  //무한스크롤
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { ref: endRef, inView } = useInView({
    root: containerRef.current,
    rootMargin: '200px 0px',
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const {mutate: addTrack} = useAddTrack();
  const {id} = useParams<{id: string}>();

  //노래 플리에 추가하는 함수
  const addMusicToPlaylist = (uri: string | undefined) =>{
    //리퀘스트 타입에 있는 파라미터를 보내줌(uri는 track || episode uri)
    if(!uri || !id) return;
    addTrack({
      playlist_id: id || "",
      uris: [uri],
      position: 0,
    });
  }

  return (
    <StyledTableContainer ref={containerRef}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <Table
        stickyHeader
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            padding: "10px",
          }
        }}
        >
          <TableBody>
            {list.map((track, index) => (
              <TableRow key={index} hover sx={{cursor: "pointer"}}>
                <TableCell>
                  <PlaylistImgBox>
                    <StyledImg
                      src={track.album?.images[track.album.images.length - 1]?.url || ''}
                      alt="album-cover"
                    />
                  </PlaylistImgBox>
                </TableCell>
                <TableCell sx={{
                  [theme.breakpoints.down("sm")]: { 
                    maxWidth: "187px"
                  },
                  [theme.breakpoints.up("sm")]: { 
                    maxWidth: "200px"
                  }
                  }}>
                  <Typography
                  noWrap
                  variant="h2"
                  sx={{
                    maxWidth: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    }}>{track.name}</Typography>
                  <Typography
                  noWrap
                  variant="body2"
                  sx={{
                    color: '#b3b3b3',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    }}>
                    {track.artists?.[0]?.name || 'Unknown Artist'}
                  </Typography>
                </TableCell>
                {!isMobile && (
                  <TableCell sx={{maxWidth: "200px"}}>
                  <Typography noWrap variant="body2">{track.album?.name || 'Unknown Album'}</Typography>
                </TableCell>
                )}
                <TableCell>
                  <Button variant="outlined" onClick={() => addMusicToPlaylist(track.uri)}>Add</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
              colSpan={4}
              ref={endRef}
              sx={{
                textAlign: 'center',
                width: "100%",
                overflowX: 'hidden',
              }}
                >
                {isFetchingNextPage && <CircularProgress size="30px" />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </StyledTableContainer>
  );
};

export default SearchResultTrackList;
