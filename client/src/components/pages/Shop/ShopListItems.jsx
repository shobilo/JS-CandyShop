import { Container, Grid } from '@mui/material'
import React from 'react'
import ShopListItem from './ShopListItem'

const ShopListItems = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShopListItem />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ShopListItems