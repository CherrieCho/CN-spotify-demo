import React, { useState } from 'react'
import { Box, Button, IconButton, Snackbar, SnackbarCloseReason, styled, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import CloseIcon from '@mui/icons-material/Close';

//styled component
const PlaylistHeader = styled("div")(() => ({
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const LibraryHead = () => {
  //스낵바 팝업관련
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const {data: userProfileData} = useGetCurrentUserProfile();
  const {mutate: createPlaylist} = useCreatePlaylist();
  const handleCreatePlaylist = () => {
    if(!userProfileData){
      setOpen(true);  //로그인 안했으면 로그인해주세요 스낵바 열기
    }else{
    //CreatePlaylistRequest 타입에 있는 파라미터를 보내줌
    createPlaylist({name: "My Playlist"});
    }
  }

  return (
    <PlaylistHeader>
      <Box sx={{display: "flex", alignItems: "center", gap: "20px"}}>
        <BookmarkIcon />
        <Typography noWrap variant='h2' fontWeight={700}>Your Library</Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon sx={{ color: "#1ed760" }} />
      </Button>
      <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message="로그인을 해주세요"
      action={action}
      />
    </PlaylistHeader>
  )
}

export default LibraryHead