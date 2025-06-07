import { Box } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import UserProfileImage from '../../common/components/UserProfileImage'

const Navbar = () => {
  //userProfile 불러오기
  const {data: userProfile} = useGetCurrentUserProfile();

  console.log("프로필", userProfile);
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile && userProfile?.images ? <UserProfileImage userProfile={userProfile} /> : <LoginButton />}
    </Box>
  )
}

export default Navbar