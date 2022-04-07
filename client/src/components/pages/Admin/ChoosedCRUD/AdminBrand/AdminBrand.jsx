import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readAllBrands} from '../../../../../redux/features/filtersData/filtersDataActionCreators'
import { resetFiltersData } from '../../../../../redux/features/filtersData/filtersDataSlice'
import BrandItem from './BrandItem'
import CreateBrandModal from './CreateBrandModal'

const AdminBrand = () => {
  const dispatch = useDispatch()
  
  const { brands } = useSelector((state) => state.filtersData)
  
  const [createModalState, setCreateModalState] = useState(false);
  const handleCreateModalOpened = useCallback(() => setCreateModalState(true), [])
  const handleCreateModalClosed = useCallback(() => setCreateModalState(false), [])
  
  const areBrandsNotEmpty = brands.length > 0;
  
  useEffect(() => {
    dispatch(readAllBrands())
      .unwrap()
      .catch(() => {});
  }, [dispatch]);
  
  useEffect(() => {
    return () => {
      dispatch(resetFiltersData())
    }
  }, [dispatch])
  
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h5'
          >
            Brands Changing
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            color="success"
            sx={{height: "100%"}}
            onClick={handleCreateModalOpened}
          >
            Add Brand
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} >
            {areBrandsNotEmpty ? (
              brands.map((brand) => (
                <Grid key={brand.id} item xs={12}>
                  <BrandItem brand={brand}/>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{justifyContent: "center"}}>
                <Typography variant="h4">No brands to show</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {createModalState && <CreateBrandModal modalState={createModalState} handleModalClosed={handleCreateModalClosed}/>}
    </Container>
  )
}

export default AdminBrand