import React, {useCallback, useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import BasketOrderModal from "./BasketOrderModal";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const BasketOrder = (props) => {
  const {totalPrice, isLoading} = props
  
  const {userData} = useSelector((state) => state.user)
  const [orderModalState, setOrderModalState] = useState(false);
  const handleOrderModalOpened = useCallback(() => setOrderModalState(true), [])
  const handleOrderModalClosed = useCallback(() => setOrderModalState(false), [])
  
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{fontWeight: "bold"}}
            variant="h5"
          >
            Total price: {totalPrice} RUB
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} alignSelf="flex-end">
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Button
              variant="contained"
              color="success"
              onClick={handleOrderModalOpened}
              disabled={isLoading || totalPrice <= 0.01}
            >
              Order
            </Button>
          </div>
        </Grid>
      </Grid>
      {orderModalState &&
        <BasketOrderModal
          user={userData}
          modalState={orderModalState}
          handleModalClosed={handleOrderModalClosed}
          totalPrice={totalPrice}
        />}
    </Container>
  );
}

export default BasketOrder;

BasketOrder.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
}