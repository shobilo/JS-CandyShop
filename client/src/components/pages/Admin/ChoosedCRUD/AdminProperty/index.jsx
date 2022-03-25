import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readAllProperties } from '../../../../../redux/features/filtersData/filtersDataActionCreators'
import { resetFiltersData } from '../../../../../redux/features/filtersData/filtersDataSlice'
import CreatePropertyModal from './CreatePropertyModal'
import PropertyTtem from './PropertyItem'

const AdminProperty = () => {
  const dispatch = useDispatch()

  const { properties } = useSelector((state) => state.filtersData) 

  const [createModalState, setCreateModalState] = useState(false);
  const handleCreateModalOpened = useCallback(() => setCreateModalState(true), [])
  const handleCreateModalClosed = useCallback(() => setCreateModalState(false), [])

  const arePropertiesNotEmpty = properties.length > 0;

  useEffect(() => {
    dispatch(readAllProperties())
    .unwrap()
    .catch((error) => {
      alert(error);
    });
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
            Properties Changing
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
            Add Property
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} >
            {arePropertiesNotEmpty ? (
              properties.map((property) => (
                <Grid key={property.id} item xs={12}>
                  <PropertyTtem property={property}/>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{justifyContent: "center"}}>
                <Typography variant="h4">No properties to show</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {createModalState && <CreatePropertyModal modalState={createModalState} handleModalClosed={handleCreateModalClosed}/>}
    </Container>
  )
}

export default AdminProperty