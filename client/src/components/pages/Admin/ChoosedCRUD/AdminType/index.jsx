import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readAllTypes } from '../../../../../redux/features/filtersData/filtersDataActionCreators'
import { resetFiltersData } from '../../../../../redux/features/filtersData/filtersDataSlice'
import TypeTtem from './TypeItem'
import AddTypeModal from './CreateTypeModal'

const AdminType = () => {
  const dispatch = useDispatch()

  const { types } = useSelector((state) => state.filtersData) 

  const [createModalState, setCreateModalState] = useState(false);
  const handleCreateModalOpened = useCallback(() => setCreateModalState(true), [])
  const handleCreateModalClosed = useCallback(() => setCreateModalState(false), [])

  const areTypesNotEmpty = types.length > 0;

  useEffect(() => {
    dispatch(readAllTypes())
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
            Types Changing
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
            Add Type
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} >
            {areTypesNotEmpty ? (
              types.map((type) => (
                <Grid key={type.id} item xs={12}>
                  <TypeTtem type={type}/>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{justifyContent: "center"}}>
                <Typography variant="h4">No types to show</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {createModalState && <AddTypeModal modalState={createModalState} handleModalClosed={handleCreateModalClosed}/>}
    </Container>
  )
}

export default AdminType