import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import "../../styles/Card.style.css";
import PlayButton from './PlayButton';

interface CardProps{
  name: string;
  image: string;
  artistName: string | undefined;
}

//styled components
const AlbumBox = styled(Box)({
  width: "100%",
  minWidth: "160px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#282828",
  },
  padding: "12px"
});

//artistName undefined인 경우 처리해주기

const Card = ({image, name, artistName}: CardProps) => {
  return (
    <AlbumBox className='album-box'>
      <div className='album-contents'>
        <div className="album-image-wrapper">
          <img src={image} className="album-img" alt='album-img'/>
          <PlayButton />
        </div>
        <Typography noWrap className='album-text' variant='h2' fontWeight='300' paddingTop='8px'>{name}</Typography>
        <Typography noWrap className='album-text' color='#b3b3b3' paddingTop='2px'>{artistName}</Typography>
      </div>
    </AlbumBox>
  )
}

export default Card