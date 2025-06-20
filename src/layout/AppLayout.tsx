import React from 'react'
import { NavLink, Outlet } from 'react-router'
import { Box, styled, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Library from './components/Libraries/Library';
import Navbar from './components/Navbar';
import theme from '../theme';
import MobileMenu from './components/MobileMenu';


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
    [theme.breakpoints.down("md")]: { 
    width: "220px"
  },
  [theme.breakpoints.down("sm")]: {   //화면이 sm사이즈 이하일 시 적용(미디어쿼리)
    display: "none"
  }
}));

const BottomBar = styled("div")(({theme}) => ({
  [theme.breakpoints.up("sm")]: { 
    display: "none"
  },
  [theme.breakpoints.down("sm")]: { 
    display: "block",
    flexShrink: 0
  }
}));

const ContentBox = styled(Box)(({theme}) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  height: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px"
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: "1em",
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
  "&.active": {
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
        <ContentBox sx={{height: "6.5rem", display: "flex", alignItems: "center"}}>
          <NavList>
            <StyledNavLink to="/" end>
              <HomeIcon />
              <Typography variant='h2' fontWeight={700}>Home</Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant='h2' fontWeight={700}>Search</Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>

        <ContentBox sx={{flex: 1, marginBottom: 0, overflow: "hidden"}}>
          <Library />
        </ContentBox>
      </Sidebar>

      <ContentBox
      sx={{
        padding: "20px",
        margin: "0px 8px",
        minWidth: 0,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down("sm")]: { 
          padding: "8px",
          margin: 0
        }
        }}>
        <Box sx={{flexShrink: 0}}>
          <Navbar />
        </Box>
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: "hidden",
          minHeight: 0,
          '&::-webkit-scrollbar': {
            scrollbarWidth: "none"
            },
          }}>
          <Outlet />
        </Box>
        <BottomBar>
          <MobileMenu />
        </BottomBar>
      </ContentBox>
    </Layout>
  )
}

export default AppLayout