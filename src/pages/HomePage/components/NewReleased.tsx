import { Grid, Typography } from '@mui/material'
import React from 'react'
import useGetNewRelease from '../../../hooks/useGetNewRelease'
import Loading from '../../../common/components/Loading';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleased = () => {
  const {data, isLoading, error} = useGetNewRelease();
  console.log("데이터", data?.albums.items);

  if(isLoading){
    return <Loading />
  }

  if(error){
    return <ErrorMessage errorMessage = {error.message} />
  }

  return (
    <div>
      <Typography variant='h1' paddingTop='8px'>
        New Released Albums
      </Typography>

      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>{data.albums.items.map((album) => (
          <Grid size={{xs: 6, sm:4, md:3, lg: 2}} key={album.id}>
            <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
          </Grid>
        ))}</Grid>
        ) : (
        <Typography variant='h2'>No Data</Typography>
        )}
    </div>
  )
}

export default NewReleased