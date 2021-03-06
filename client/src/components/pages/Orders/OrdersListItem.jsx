import React, {useCallback} from "react"
import PropTypes from "prop-types";
import {Button, Grid, Typography} from "@mui/material";
import {getPrettyDate} from "../../../utils/getPrettyDate";
import InventoryIcon from '@mui/icons-material/Inventory';
import {useNavigate} from "react-router-dom";

const OrdersListItem = ({order}) => {
  const {id, state, totalPrice, deliveryStartDate} = order
  
  const navigate = useNavigate()
  
  const handleDetailsClick = useCallback(() => {
    navigate(`/orders/${id}`)
  }, [id, navigate])
  
  return (
    <Grid container border="0.1rem solid lightgrey" padding="1rem" borderRadius="2rem" direction="row" justifyItems="center" alignItems="center">
      <Grid item xs={12} sm={6} md={3}>
        <Typography>
          Current state:
        </Typography>
        <Typography
          fontWeight="bold"
        >
          {state}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>
          Total price:
        </Typography>
        <Typography
          fontWeight="bold"
        >
          {totalPrice}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>
          Order start:
        </Typography>
        <Typography
          fontWeight="bold"
        >
          {getPrettyDate(deliveryStartDate)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          startIcon={<InventoryIcon />}
          color="secondary"
          onClick={handleDetailsClick}
        >
          Details
        </Button>
      </Grid>
    </Grid>
    
  )
}

export default OrdersListItem

OrdersListItem.propTypes = {
  order: PropTypes.object.isRequired
}