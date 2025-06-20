import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { Episode, Track } from '../../../models/track';
import { TableCell, TableRow } from '@mui/material';

interface MobilePlaylistItemProps {
  item: PlaylistTrack;
  index: number;
}

const MobilePlaylistItem = ({item, index}: MobilePlaylistItemProps) => {
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
      }}>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "No Name"}</TableCell>
      <TableCell>
        {item.track.duration_ms !== undefined
      ? changeIntoMinuteSeconds(item.track.duration_ms)
      : "Unknown"}
      </TableCell>
    </TableRow>
  )
}

export default MobilePlaylistItem