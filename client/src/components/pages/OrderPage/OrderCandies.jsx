import React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import OrderCandy from "./OrderCandy";
import PropTypes from "prop-types";

const OrderCandies = ({candies, totalPrice}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Ordered candies
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            {`Total price: ${totalPrice} RUB`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {candies?.map(({candy, quantity}) => (
              <Grid item xs={12} sm={6} md={4} key={candy.id} sx={{overflow: "auto"}}>
                <OrderCandy candy={candy} quantity={quantity} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

OrderCandies.propTypes = {
  candies: PropTypes.array,
  totalPrice: PropTypes.number,
}

OrderCandies.defaultProps = {
  candies: [],
  totalPrice: 0
}


export default OrderCandies;