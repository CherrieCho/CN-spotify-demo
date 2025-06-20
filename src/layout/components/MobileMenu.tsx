import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const NavContainer = styled(Box)({
  width: "100%",
  color: "rgb(179, 179, 179)",
  paddingTop: "16px"
});

const NavList = styled("ul")({
  listStyle: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  margin: 0,
  padding: 0
});

const StyledNavLink = styled(NavLink)(({theme}) => ({
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary
  },
  "&.active": {
    color: theme.palette.text.primary
  },
  "&:focus": {
    color: theme.palette.text.primary
  },
}));

const MobileMenu = () => {
  return (
    <NavContainer>
      <NavList>
        <StyledNavLink to="/" end>
          <HomeIcon />
          <Typography variant='body1'>Home</Typography>
        </StyledNavLink>
        <StyledNavLink to="/search">
          <SearchIcon />
          <Typography variant='body1'>Search</Typography>
        </StyledNavLink>
        <StyledNavLink to="/library">
          <BookmarkIcon />
          <Typography variant='body1'>My Library</Typography>
        </StyledNavLink>
      </NavList>
    </NavContainer>
  )
}

export default MobileMenu