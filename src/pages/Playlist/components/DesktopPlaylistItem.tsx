import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { TableCell, tableCellClasses, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/track';

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
    <TableRow sx={{
      '&:hover': {
        backgroundColor: '#282828'
      },
      cursor: "pointer",
      border: "none",
      [`& .${tableCellClasses.root}`]: {
        borderBottom: "none"
      }
      }}>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "No Name"}</TableCell>
      <TableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCell>
      <TableCell>{item.added_at?.slice(0, 10) || "Unknown"}</TableCell>
      <TableCell>
        {item.track.duration_ms !== undefined
      ? changeIntoMinuteSeconds(item.track.duration_ms)
      : "Unknown"}
      </TableCell>
    </TableRow>
  )
}

export default DesktopPlaylistItem 