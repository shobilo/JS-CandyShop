import { Container, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChoosedCRUD from './ChoosedCRUD'
import CRUDChoice from './CRUDChoice'

const Admin = () => {
  const [currentCRUD, setCurrentCRUD] = useState('')

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{justifyContent: "center", display: "flex"}}>
            <Typography
              variant='h3'
            >
              Admin panel
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <CRUDChoice setCurrentCRUD={setCurrentCRUD}/>
        </Grid>
        <Grid item xs={12} md={9}>
          <ChoosedCRUD currentCRUD={currentCRUD}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Admin