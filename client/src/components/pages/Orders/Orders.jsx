import React from "react"
import {Container, Grid, Paper, Typography} from "@mui/material";
import BackButton from "../../UI/BackButton";
import OrdersList from "./OrdersList";

const Orders = () => {
  return (
    <main style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
      <Container maxWidth="xl">
        <Paper sx={{height: "auto", padding: "1rem", borderRadius: "1rem"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{display: "flex"}}>
                <BackButton/>
                <div style={{display: "flex", justifyContent: "center", width: "90%"}}>
                  <Typography
                    variant='h4'
                  >
                    My orders
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sx={{height: "75vh", overflow: "auto"}}>
              <OrdersList />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </main>
  )
}

export default Orders
