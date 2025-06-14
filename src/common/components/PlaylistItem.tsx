import { styled, Typography } from '@mui/material';
import React from 'react'
import "../../styles/PlaylistItem.style.css";

//타입 정의
interface PlaylistItemProps {
  image: string;
  name: string;
  ownerName?: string | null;
  id: string;
  handleClick: (id: string) => void;
  isActive?: boolean;
}
interface StyledProps {
  isActive?: boolean;
}

const PlaylistItemContainer = styled("div")<StyledProps>(({theme, isActive}) => ({
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  display: "flex",
  gap: "12px",
  cursor: "pointer",
  backgroundColor: isActive ? "#1E1E1E" : "transparent",
  color: isActive ? theme.palette.primary.main : "inherit",
  "&:hover": {
    backgroundColor: "#1E1E1E",
    color: theme.palette.primary.main,
  },
}));

export const PlaylistImgBox = styled("div")({
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

const PlaylistItem = ({name, image, id, ownerName, handleClick, isActive}: PlaylistItemProps) => {
  return (
    <PlaylistItemContainer isActive={isActive} onClick={() => handleClick(id)}>
        <PlaylistImgBox>
          <img src={image} alt='playlist-img' className='playlist-img'/>
        </PlaylistImgBox>
        <PlaylistInfo>
          <Typography color='inherit' noWrap variant='h2' fontWeight="300" sx={{width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{name}</Typography>
          <Typography noWrap color='#b3b3b3' sx={{width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{`playlist · ${ownerName}`}</Typography>
        </PlaylistInfo>
    </PlaylistItemContainer>
  )
}

export default PlaylistItem