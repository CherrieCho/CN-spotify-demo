import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
      <Box sx={{height: "100vh", maxWidth: "100%", overflowX: "hidden", display: "flex", justifyContent: "center", alignItems: 'center'}}>
        <CircularProgress sx={{color: "#1ed760"}} />
      </Box>
  );
};

export default Loading;
