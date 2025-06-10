import React from 'react'
import NewReleased from './components/NewReleased'
import { Box, styled } from '@mui/material';

const HomepageContainer = styled(Box)({
  padding: "0 16px",
});

const HomePage = () => {
  return (
    <HomepageContainer>
      <NewReleased />
    </HomepageContainer>
  )
}

export default HomePage