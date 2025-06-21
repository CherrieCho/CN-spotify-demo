import { Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'
import useGetNewRelease from '../../../hooks/useGetNewRelease'
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';
import theme from '../../../theme';

const NewReleased = () => {
  const {data, isLoading, error} = useGetNewRelease();
  const skeletonArray = Array.from({ length: 6 }) // 로딩 시 보여줄 스켈레톤 개수

  if(error){
    return <ErrorMessage errorMessage = {error.message} />
  }

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
        New Released Albums
      </Typography>

      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.slice(0, 6).map((album) => (
          <Grid
          size={{xs: 6, sm:4, md:3, lg: 2}}
          key={album.id}
          sx={{
            paddingTop: "16px",
            paddingLeft: "16px",
            [theme.breakpoints.down("lg")]: { 
              padding: 0,
            }
            }}>
            <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
          </Grid>
          ))}
        </Grid>
        ) : (
        <Typography variant='h2'>No Data</Typography>
        )}
    </div>
  )
}

export default NewReleased