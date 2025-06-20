import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { TableCell, tableCellClasses, TableRow, Typography } from '@mui/material';
import { Episode, Track } from '../../../models/track';
import theme from '../../../theme';

//타입 정의하기
interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
  index: number;
}

const DesktopPlaylistItem = ({item, index}: DesktopPlaylistItemProps) => {
  //union타입(Track | Episode)좁혀주기
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track //description은 Episode에만 있기 때문에 true를 리턴하면 track은 Episode 타입임(album 정보가 없는쪽)
  }

  //밀리초 변환
  const changeIntoMinuteSeconds = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000); 
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return (
    <TableRow hover sx={{
      cursor: "pointer",
      border: "none",
      width: "100%"
      }}>
      <TableCell>{index}</TableCell>
      <TableCell sx={{
        [theme.breakpoints.down("xl")]: { 
          maxWidth: "210px"
        },
        [theme.breakpoints.down("lg")]: { 
          maxWidth: "180px"
        },
      }}>
        <Typography
        variant='body1'
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        >
          {item.track.name || "No Name"}
        </Typography>
      </TableCell>
      <TableCell sx={{
        [theme.breakpoints.down("xl")]: { 
          maxWidth: "210px"
        },
        [theme.breakpoints.down("lg")]: { 
          maxWidth: "180px"
        },
      }}>
        <Typography
        variant='body1'
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        >
          {isEpisode(item.track) ? "N/A" : item.track.album?.name}
        </Typography>
      </TableCell>
      <TableCell sx={{
        [theme.breakpoints.down("xl")]: { 
          maxWidth: "210px"
        },
        [theme.breakpoints.down("lg")]: { 
          maxWidth: "180px"
        },
      }}>
        <Typography
        variant='body1'
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        >
          {item.added_at?.slice(0, 10) || "Unknown"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
        variant='body1'
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        >
          {item.track.duration_ms !== undefined
        ? changeIntoMinuteSeconds(item.track.duration_ms)
        : "Unknown"}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem 