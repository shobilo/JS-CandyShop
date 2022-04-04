import React from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";

const BasketOrder = (props) => {
  const {totalPrice, isLoading} = props
  
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{fontWeight: "bold"}}
            variant="h5"
          >
            Total count: {totalPrice} RUB
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} alignSelf="flex-end">
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              Order
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BasketOrder;