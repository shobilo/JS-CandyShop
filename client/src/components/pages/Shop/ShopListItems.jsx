import { CircularProgress, Container, Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ShopListItem from './ShopListItem'

const ShopListItems = () => {
  const { candies, isLoading } = useSelector((state) => state.candies)

  console.log(candies)

  return (
    <Container>
      <Grid container spacing={3}>

        {isLoading 
        ? <Container maxWidth='lg' sx={{justifyContent: "center", alignItems: "center"}}>
            <CircularProgress />
        </Container>
        : candies.map((candy) => (
            <Grid key={candy.id} item xs={12} sm={6} md={4}>
              <ShopListItem candy={candy}/>
            </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ShopListItems