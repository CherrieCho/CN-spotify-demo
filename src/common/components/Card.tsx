import { Typography } from '@mui/material'
import React from 'react'

interface CardProps{
  name: string;
  image: string;
  artistName: string | undefined;
}

//artistName undefined인 경우 처리해주기

const Card = ({image, name, artistName}: CardProps) => {
  return (
    <div>
      <img src={image}/>
      <Typography>{name}</Typography>
      <Typography>{artistName}</Typography>
    </div>
  )
}

export default Card