import React from 'react'
import useSingleSearch from '../../../hooks/useSingleSearch';
import { SEARCH_TYPE } from '../../../models/search';
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Grid, Skeleton, Typography } from '@mui/material';
import Card from '../../../common/components/Card';
import theme from '../../../theme';

const Rock = () => {
  const {data, isLoading, error } = useSingleSearch({
  q: "genre:rock",
  type: [SEARCH_TYPE.Track],
  limit: 18,
  });

  const skeletonArray = Array.from({ length: 18 }) // 로딩 시 보여줄 스켈레톤 개수

  if(isLoading){
    return (
      <div>
        <Skeleton variant="text" animation="wave"
        sx={{
          fontSize: '24px',
          width: "20%",
          [theme.breakpoints.down("xl")]: { 
            width: "30%",
          },
          [theme.breakpoints.down("lg")]: { 
            width: "40%",
          },
          [theme.breakpoints.down("md")]: { 
            width: "50%",
          },
          [theme.breakpoints.down("sm")]: { 
            width: "70%",
          }
          }} />
        <Grid container spacing={2}>
          {skeletonArray.map((item, index) => (
            <Grid
            size={{xs: 6, sm:4, md:3, lg: 2}}
            key={index}
            sx={{
              paddingTop: "16px",
              paddingLeft: "16px",
              [theme.breakpoints.down("lg")]: { 
                padding: 0,
              }
              }}>
              <Skeleton variant="rounded" width="100%" animation="wave"
              sx={{
                paddingTop: '90%', 
                height: '0',
                }} />
              <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} />
              <Skeleton width="70%" animation="wave" />
            </Grid>
          ))}
        </Grid>
      </div>
    )
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
        Rock
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

export default Rock