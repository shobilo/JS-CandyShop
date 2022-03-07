import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readAllCandies } from '../../../redux/features/candies/candiesActionCreators'

import ShopFilterMenu from './ShopFilterMenu'
import ShopListItems from './ShopListItems'
import ShopPagination from './ShopPagination'

const Shop = () => {
  const dispatch = useDispatch()
  // const candies = useSelector((state) => state.candies.candies)

  // console.log(candies)

  useEffect(() => {
    dispatch(readAllCandies({}))
    .unwrap()
    .catch((error) => {
      alert(error.message)
    })
  }, [])

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
              <ShopPagination />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Shop