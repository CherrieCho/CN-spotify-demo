import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="container loading-container">
        <CircularProgress sx={{color: "#1ed760"}} />
      </div>
    </div>
  );
};

export default Loading;
