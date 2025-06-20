import { Box } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import UserProfileImage from './UserProfileImage'
import { styled } from '@mui/system'
import { useLocation } from 'react-router'
import SearchBox from '../../pages/Search/SearchBox'

interface NavbarBoxProps {
  hasSearchBox?: boolean;
}

//서치박스 유무에 따른 조건부 스타일링
export const NavbarBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hasSearchBox",
})<NavbarBoxProps>(({ hasSearchBox, theme }) => ({
  display: "flex",
  justifyContent: hasSearchBox ? "space-between" : "flex-end",
  alignItems: "center",
  width: "100%",
  height: "64px",
  padding: "0 16px",
  [theme.breakpoints.down("md")]: { 
  padding: 0
  },
  [theme.breakpoints.down("sm")]: { 
  gap: "1.5em"
  },
}));

const Navbar = () => {
  //userProfile 불러오기
  const {data: userProfile} = useGetCurrentUserProfile();
  const location = useLocation();
  //서치박스가 있는가?
  const hasSearchBox = location.pathname === "/search" || location.pathname.startsWith("/search/");


  return (
    <NavbarBox hasSearchBox={hasSearchBox}>
      {hasSearchBox && <SearchBox />}
      {userProfile && userProfile?.images ? (
        <UserProfileImage userProfile={userProfile} />
      ) : (
        <LoginButton />
      )}
    </NavbarBox>
  )
}

export default Navbar