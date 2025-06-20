import React from 'react'
import useSingleSearch from '../../../hooks/useSingleSearch';
import { SEARCH_TYPE } from '../../../models/search';
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Grid, Typography } from '@mui/material';
import Card from '../../../common/components/Card';
import theme from '../../../theme';

const Kpop = () => {
  const {data, error, isLoading } = useSingleSearch({
    q: "genre:k-pop",
    type: [SEARCH_TYPE.Track],
    limit: 18,
    });

  if(isLoading){
    return <Loading />
  }

  if(error){
    return <ErrorMessage errorMessage = {error.message} />
  }

  return (
    <div>
      <Typography
      variant='h1'
      paddingTop='8px'
      paddingLeft='16px'
      marginBottom='8px'
      sx={{
        [theme.breakpoints.down("lg")]: { 
          paddingLeft: 0,
        }
      }}
      >
        K-Pop
      </Typography>

      {data?.tracks && data.tracks.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.tracks.items.map((track) => (
          <Grid
          size={{xs: 6, sm:4, md:3, lg: 2}}
          key={track.id}
          sx={{
            paddingTop: "16px",
            paddingLeft: "16px",
            [theme.breakpoints.down("lg")]: { 
              padding: 0,
            }
            }}>
            <Card image={track.album?.images[0].url ?? "unknown"} name={track.name ?? "unknown"} artistName={track.artists?.[0].name} />
          </Grid>
          ))}
        </Grid>
        ) : (
        <Typography variant='h2'>No Data</Typography>
        )}
    </div>
  )
}

export default Kpop