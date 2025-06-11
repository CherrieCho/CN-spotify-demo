import React from 'react'
import { Box } from '@mui/material';
import { SimplifiedPlaylist } from '../../models/playlist';
import PlaylistItem from '../../common/components/PlaylistItem';
import { useNavigate, useParams } from 'react-router';

//타입 정의
interface UserPlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const UserPlaylist = ({playlists}: UserPlaylistProps) => {
  const navigate = useNavigate();
  const { id: currentId } = useParams<{id: string}>();
  const handleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  }

  //images가 없는경우 디폴트이미지
  const defaultImg = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

  return (
    <Box sx={{width:"100%"}}>
      {playlists.map((playList) => (
      <PlaylistItem
        handleClick={handleClick}
        name={playList.name || ""}
        image={playList.images && playList.images.length > 0 ? playList.images[0].url : defaultImg}
        id={playList.id || ""}
        key={playList.id}
        ownerName={playList.owner?.display_name}
        isActive={currentId === playList.id}
      />
      ))}
    </Box>
  )
}

export default UserPlaylist