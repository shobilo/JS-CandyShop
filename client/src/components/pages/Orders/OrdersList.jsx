import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import OrdersListItem from "./OrdersListItem";
import {readUserOrders} from "../../../redux/features/user/userActionCreators";
import {resetOrders} from "../../../redux/features/user/userSlice";

const OrdersList = () => {
  const dispatch = useDispatch()
  const {orders} = useSelector((state) => state.user)
  
  useEffect(() => {
    dispatch(readUserOrders())
      .unwrap()
      .catch(() => {})
  }, [dispatch])
  
  useEffect(() => {
    return () => {
      dispatch(resetOrders())
    }
  }, [dispatch])
  
  const areOrdersNotEmpty = orders?.length > 0;
  
  return (
    <Grid container spacing={2} padding="1rem">
      {areOrdersNotEmpty ? (
        orders.map((order) => (
          <Grid key={order.id} item xs={12}>
            <OrdersListItem order={order} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sx={{justifyContent: "center"}}>
          <Typography variant="h4">No orders yet... Fix it</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default OrdersList