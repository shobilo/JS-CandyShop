import { Container, Grid, Paper, Typography } from '@mui/material'
import React, {useCallback, useState} from 'react'
import ChoosedCRUD from './ChoosedCRUD'
import CRUDChoice from './CRUDChoice'

const Admin = () => {
  const [currentCRUD, setCurrentCRUD] = useState('CANDIES')

  const handleCRUDChanged = useCallback((event) => {
    setCurrentCRUD(event.target.innerText)
  }, [setCurrentCRUD])

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
          <CRUDChoice handleCRUDChanged={handleCRUDChanged} currentCRUD={currentCRUD}/>
        </Grid>
        <Grid item xs={12} md={9}>
          <ChoosedCRUD currentCRUD={currentCRUD}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Admin