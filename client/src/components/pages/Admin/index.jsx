import { Container, Grid, Paper, Typography } from '@mui/material'
import React, {useCallback, useState} from 'react'
import ChoosedCRUD from './ChoosedCRUD'
import CRUDChoice from './CRUDChoice'
import BackButton from "../../UI/BackButton";

const Admin = () => {
  const [currentCRUD, setCurrentCRUD] = useState('CANDIES')

  const handleCRUDChanged = useCallback((event) => {
    setCurrentCRUD(event.target.innerText)
  }, [setCurrentCRUD])

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{borderRadius: "2rem", padding: "0.8rem"}}>
            <div style={{display: "flex"}}>
              <BackButton path="/"/>
              <div style={{display: "flex", justifyContent: "center", width: "90%"}}>
                <Typography
                  variant='h4'
                >
                  Admin Panel
                </Typography>
              </div>
            </div>
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