import { Container, Grid, Pagination } from '@mui/material'
import React, { useCallback, useState } from 'react'

const ShopPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleCurrentPageChanged = useCallback((event, value) => {
    setCurrentPage(value)
  }, [])

  return (
    <Container>
      <Grid container justifyContent="center">
        <Pagination 
          count={20}
          page={currentPage}
          onChange={handleCurrentPageChanged}
          color="secondary"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Container>
  )
}

export default ShopPagination