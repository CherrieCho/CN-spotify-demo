import { Box } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import UserProfileImage from './UserProfileImage'
import { styled } from '@mui/system'
import { useLocation } from 'react-router'
import SearchBox from '../../pages/Search/SearchBox'

export const NavbarBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "64px",
  padding: "0 16px"
});

const Navbar = () => {
  //userProfile 불러오기
  const {data: userProfile} = useGetCurrentUserProfile();

  const location = useLocation();
  return (
    <NavbarBox>
      {(location.pathname === '/search' || location.pathname.startsWith('/search/')) && <SearchBox />}
      {userProfile && userProfile?.images ? <UserProfileImage userProfile={userProfile} /> : <LoginButton />}
    </NavbarBox>
  )
}

export default Navbar