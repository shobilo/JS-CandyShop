import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ShopPagination from '../../../Shop/ShopPagination'
import { readAllCandies } from '../../../../../redux/features/candies/candiesActionCreators'
import { resetCandies, setSearchQueryFilter } from '../../../../../redux/features/candies/candiesSlice'
import CandyItem from './CandyItem'
import AddCandyModal from './AddCandyModal'


const AdminCandy = () => {
  const dispatch = useDispatch()

  const { candies } = useSelector((state) => state.candies) 
  const { searchQuery, currentPage } = useSelector((state) => state.candies.filters)

  const [modalState, setModalState] = useState(false);
  const handleModalOpened = useCallback(() => setModalState(true), [])
  const handleModalClosed = useCallback(() => setModalState(false), [])

  const areCandiesNotEmpty = candies.length > 0;

  useEffect(() => {
    dispatch(
      readAllCandies({
        currentPage,
        searchQuery,
      })
    )
    .unwrap()
    .catch((error) => {
      alert(error);
    });
  }, [currentPage, searchQuery, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetCandies())
    }
  }, [dispatch])



  const handleSearchFieldChanged = useCallback(
    (event) => {
      dispatch(setSearchQueryFilter(event.target.value));
    },
    [dispatch]
  );

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h5'
          >
            Candy Changing
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ minWidth: 150 }}
            id="searchField"
            label="Search..."
            value={searchQuery}
            onChange={handleSearchFieldChanged}
          />
          <Button
            variant="contained"
            size="large"
            color="success"
            sx={{height: "100%"}}
            onClick={handleModalOpened}
          >
            Add Candy
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} >
            {areCandiesNotEmpty ? (
              candies.map((candy) => (
                <Grid key={candy.id} item xs={12}>
                  <CandyItem candy={candy} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{justifyContent: "center"}}>
                <Typography variant="h4">No candies to show</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ShopPagination />
        </Grid>
      </Grid>
      {modalState && <AddCandyModal modalState={modalState} handleModalClosed={handleModalClosed}/>}
    </Container>
  )
}

export default AdminCandy