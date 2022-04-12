import React, {useEffect} from "react"
import {CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import BackButton from "../../UI/BackButton";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {readOrderById} from "../../../redux/features/user/userActionCreators";
import {resetCurrentOrder} from "../../../redux/features/user/userSlice";
import OrderDetails from "./OrderDetails";
import OrderCandies from "./OrderCandies";
import OrderDeliveryState from "./OrderDeliveryState";

const OrderPage = () => {
  const {orderId} = useParams()
  const dispatch = useDispatch()
  const {isLoading} = useSelector((state) => state.user)
  const {details, candies, totalPrice} = useSelector((state) => state.user.currentOrder)
  
  useEffect(() => {
    dispatch(readOrderById({orderId}))
      .unwrap()
      .then()
      .catch(() => {})
    return () => {
      dispatch(resetCurrentOrder())
    }
  }, [dispatch, orderId])
  
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
                    Current order
                  </Typography>
                </div>
              </div>
            </Grid>
            {isLoading ? (
              <CircularProgress/>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <OrderDetails details={details} />
                </Grid>
                
                <Grid item xs={12} sm={6} >
                  <OrderDeliveryState details={details}/>
                </Grid>
  
                <Grid item xs={12} sx={{height: "50vh", overflow: "auto"}}>
                  <OrderCandies candies={candies} totalPrice={totalPrice}/>
                </Grid>
              </>
            )}
            
          </Grid>
        </Paper>
      </Container>
    </main>
  )
}

export default OrderPage