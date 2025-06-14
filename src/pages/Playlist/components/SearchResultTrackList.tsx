import React from 'react'
import { Track } from '../../../models/track'
import { Box, Button, Grid, Typography } from '@mui/material';
import { PlaylistImgBox } from '../../../common/components/PlaylistItem';


interface SearchResultTrackListProps {
  list: Track[];
}


const SearchResultTrackList = ({list}: SearchResultTrackListProps) => {
  return (
    <Box>
      {list.map((track, index) => (
          <Grid container key={index} alignItems="center">
            <Grid size={10}>
              <Grid container alignItems="center" sx={{padding: "1em"}}>
                <Grid size={6} sx={{display: "flex", alignItems: "center", gap: "1em"}}>
                  <PlaylistImgBox>
                    <img src={track.album?.images[track.album.images.length - 1].url} alt='album-cover' className='playlist-img'/>
                  </PlaylistImgBox>
                  <Box sx={{display: "flex", flexDirection: "column", gap: "3px"}}>
                    <Typography variant='h2'>{track.name}</Typography>
                    <Typography variant='h2'>{track.artists?.[0].name}</Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Typography variant='h2'>{track.album?.name}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={2}>
              <Button>Add</Button>
            </Grid>
          </Grid>
        ))}
    </Box>
  )
}

export default SearchResultTrackList