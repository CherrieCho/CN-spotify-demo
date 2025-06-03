import React from 'react'
import { NavLink, Outlet } from 'react-router'
import { Box, styled, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Library from './components/Library';


//styled components
const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px"
});

const Sidebar = styled("div")(({theme}) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {   //화면이 sm사이즈 이하일 시 적용(미디어쿼리)
    display: "none"
  }
}));

const ContentBox = styled(Box)(({theme}) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px"
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: "1.5em",
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({theme}) => ({
  textDecoration: "none",
  margin: "1em 0",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary
  },
  "&:active": {
    color: theme.palette.text.primary
  },
  "&:focus": {
    color: theme.palette.text.primary
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox sx={{flex: 1, display: "flex", alignItems: "center"}}>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant='h2' fontWeight={700}>Home</Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant='h2' fontWeight={700}>Search</Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>

        <ContentBox sx={{flex: 7}}>
          <Library />
        </ContentBox>
      </Sidebar>
      <Outlet/>
    </Layout>
  )
}

export default AppLayout