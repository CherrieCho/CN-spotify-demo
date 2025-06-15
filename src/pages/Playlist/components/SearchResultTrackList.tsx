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
} from '@mui/material';
import { Track } from '../../../models/track';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import { PlaylistImgBox } from '../../../common/components/PlaylistItem';

interface SearchResultTrackListProps {
  list: Track[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const StyledTableContainer = styled(TableContainer)({
  minHeight: 0,
  maxHeight: "100%"
  // scrollbarWidth: 'none',
  // '&::-webkit-scrollbar': {
  //   display: 'none',
  // },
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

  return (
    <StyledTableContainer ref={containerRef} sx={{ maxHeight: "100%", overflow: 'auto' }}>
      <Table
      stickyHeader
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none"
        }
      }}
      >
        <TableBody>
          {list.map((track, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <PlaylistImgBox>
                  <StyledImg
                    src={track.album?.images[track.album.images.length - 1]?.url || ''}
                    alt="album-cover"
                  />
                </PlaylistImgBox>
              </TableCell>
              <TableCell>
                <Typography variant="h2">{track.name}</Typography>
                <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                  {track.artists?.[0]?.name || 'Unknown Artist'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{track.album?.name || 'Unknown Album'}</Typography>
              </TableCell>
              <TableCell>
                <Button variant="outlined">Add</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} ref={endRef} sx={{ textAlign: 'center' }}>
              {isFetchingNextPage && <Loading />}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SearchResultTrackList;
