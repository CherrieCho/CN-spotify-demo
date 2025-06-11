import { styled, Typography } from '@mui/material';
import React from 'react'
import "../../styles/PlaylistItem.style.css";

const PlaylistItemContainer = styled("div")(({theme}) => ({
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "8px",
  display: "flex",
  gap: "12px",
  transition: "backgroundColor 0.3s",
  "&:hover": {
    backgroundColor: "#1E1E1E",
    color: theme.palette.text.primary,
  },
  "&.active": {
    backgroundColor: "#1E1E1E",
    color: theme.palette.text.primary,
  },
  "&:focus": {
    backgroundColor: "#1E1E1E",
    color: theme.palette.text.primary,
  },
}));

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

interface PlaylistItemProps {
  image: string;
  name: string;
  ownerName?: string | null;
  id: string;
  handleClick: (id: string) => void;
}

const PlaylistItem = ({name, image, id, ownerName, handleClick}: PlaylistItemProps) => {
  return (
    <PlaylistItemContainer onClick={() => handleClick(id)}>
        <PlaylistImgBox>
          <img src={image} alt='playlist-img' className='playlist-img'/>
        </PlaylistImgBox>
        <PlaylistInfo>
          <Typography
            noWrap
            variant="h2"
            fontWeight="300"
            sx={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transition: "color 0.3s",
              "&:hover": {
                color: "#1ed760",
              },
              "&.active": {
                color: "#1ed760",
              },
            }}
          >
            {name}
          </Typography>
          <Typography noWrap color='#b3b3b3' sx={{width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{`playlist · ${ownerName}`}</Typography>
        </PlaylistInfo>
    </PlaylistItemContainer>
  )
}

export default PlaylistItem