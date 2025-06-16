import { Box, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

const SearchBox = () => {
  return (
    <Box sx={{width: "100%"}}>
      <TextField 
        // value={}
        // onChange={}
        placeholder='What do you want to play?'
        sx={{
          "& fieldset": {border: "none"},
          backgroundColor: "#282828",
          borderRadius: "50px",
          width: "100%",
          maxWidth: "365px",
          minWidth: 0
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: "#C0C0C0"}} />
              </InputAdornment>
            ),
          },
        }}
        />
    </Box>
  )
}

export default SearchBox