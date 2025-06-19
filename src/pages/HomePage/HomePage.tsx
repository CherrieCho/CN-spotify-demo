import React from 'react'
import NewReleased from './components/NewReleased'
import { Box, styled } from '@mui/material';
import Kpop from './components/Kpop';
import Rock from './components/Rock';

const HomepageContainer = styled(Box)({
  padding: "0 16px",
  marginTop: "2em",
});

const HomePage = () => {
  return (
    <HomepageContainer>
      <NewReleased />
      <Kpop />
      <Rock />
    </HomepageContainer>
  )
}

export default HomePage