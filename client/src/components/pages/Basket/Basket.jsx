import React from 'react'
import {Container, Grid, Paper, Typography} from "@mui/material";
import BasketItems from "./BasketItems";
import BasketOrder from "./BasketOrder";
import {useSelector} from "react-redux";
import BackButton from "../../UI/BackButton";

const Basket = () => {
  const {totalPrice, isLoading} = useSelector((state) => state.basket )
  
  return (
    <main style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
      
      <Container maxWidth='xl'>
        <Paper sx={{height: "auto", padding: "1rem", borderRadius: "1rem"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{display: "flex"}}>
                <BackButton path="/"/>
                <div style={{display: "flex", justifyContent: "center", width: "90%"}}>
                  <Typography
                    variant='h4'
                    
                  >
                    Shop basket
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sx={{height: "75vh", overflow: "auto"}}>
              <BasketItems/>
            </Grid>
            <Grid item xs={12}>
              <BasketOrder totalPrice={totalPrice} isLoading={isLoading}/>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    
    </main>
  
  
  )
}

export default Basket