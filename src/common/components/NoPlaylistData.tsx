import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import LoginButton from './LoginButton'
import { useNavigate } from 'react-router'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import theme from '../../theme'

const NoPlaylistData = () => {
  const navigate = useNavigate();
  const {data: userProfileData} = useGetCurrentUserProfile();

  const goHome = () => {
    navigate('/');
  }
  return (
    <Box sx={{width: "100%", height: "80%", display: "flex", flexDirection: "column", gap: "2em", justifyContent: "center", alignItems: "center"}}>
      <Typography
      variant='h1'
      sx={{
        [theme.breakpoints.down("sm")]: { 
          fontSize: "20px"
        }
      }}
      >
        플레이리스트를 찾을 수 없습니다.
      </Typography>
      <Box sx={{display: "flex", gap: "3rem"}}>
        {!userProfileData && <LoginButton />}
        <Button variant='contained' color='secondary' size='large' onClick={goHome}>Home</Button>
      </Box>
    </Box>
  )
}

export default NoPlaylistData