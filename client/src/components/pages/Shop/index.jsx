import { Container, Grid } from '@mui/material'
import React from 'react'

import ShopFilterMenu from './ShopFilterMenu'
import ShopListItems from './ShopListItems'
import ShopPagination from './ShopPagination'

const Shop = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={2}>
          <ShopFilterMenu />
        </Grid>
        <Grid item xs={12} lg={10}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ShopListItems />
            </Grid>
            <Grid item xs={12}>
              <ShopPagination paper/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Shop