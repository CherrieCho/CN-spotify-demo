import React from 'react'
import { Box, styled, Typography } from '@mui/material';
import "../../styles/UserPlaylist.style.css";
import { SimplifiedPlaylist } from '../../models/playlist';

const PlaylistItem = styled("div")({
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "8px",
  display: "flex",
  gap: "12px",
  "&:hover": {
    backgroundColor: "#1E1E1E",
  },
  "&.active": {
    backgroundColor: "#1E1E1E",
  },
  "&:focus": {
    backgroundColor: "#1E1E1E",
  },
});

const PlaylistImgBox = styled("div")({
  width: "48px",
  height: "48px",
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
});

const PlaylistInfo = styled("div")({
  width: "240px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden"
});

//타입 정의
interface UserPlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const UserPlaylist = ({playlists}: UserPlaylistProps) => {
  //images가 없는경우 디폴트이미지
  const defaultImg = "https://file.notion.so/f/f/fbfa6b68-f1b9-4afa-a4ee-35fea2deb86e/e863a0d7-a2af-4e01-ac7b-fd25baaa1372/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(745).png?table=block&id=20e01cb4-e9c4-8038-9440-f7ebf619950b&spaceId=fbfa6b68-f1b9-4afa-a4ee-35fea2deb86e&expirationTimestamp=1749578400000&signature=7GOuRxLLdKMwzzV51odWqviz3ye9DbcSy2oyYWgVN6E&downloadName=%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%28745%29.png";

  return (
    <Box sx={{width:"100%"}}>
      {playlists.map((playList) => (
      <PlaylistItem>
        <PlaylistImgBox>
          <img src={playList.images && playList.images.length > 0 ? playList.images[0].url : defaultImg} alt='playlist-img' className='playlist-img'/>
        </PlaylistImgBox>
        <PlaylistInfo>
          <Typography noWrap variant='h2' fontWeight="700" sx={{width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{playList.name}</Typography>
          <Typography noWrap color='#b3b3b3' sx={{width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{`${playList.type} · ${playList.owner?.display_name}`}</Typography>
        </PlaylistInfo>
      </PlaylistItem>
      ))}
    </Box>
  )
}

export default UserPlaylist