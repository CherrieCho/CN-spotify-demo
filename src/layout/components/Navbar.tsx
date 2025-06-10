import { Box } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import UserProfileImage from '../../common/components/UserProfileImage'
import { styled } from '@mui/system'

export const NavbarBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "64px",
  padding: "0 16px"
});

const Navbar = () => {
  //userProfile 불러오기
  const {data: userProfile} = useGetCurrentUserProfile();
  return (
    <NavbarBox>
      {userProfile && userProfile?.images ? <UserProfileImage userProfile={userProfile} /> : <LoginButton />}
    </NavbarBox>
  )
}

export default Navbar