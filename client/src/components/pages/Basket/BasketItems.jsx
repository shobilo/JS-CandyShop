import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import BasketItem from "./BasketItem";
import {readBasketCandies} from "../../../redux/features/basket/basketActionCreators";

const BasketItems = () => {
  const {candies} = useSelector((state) => state.basket)

  const dispatch = useDispatch()
  
  const areCandiesNotEmpty = candies.length > 0;
  
  useEffect(() => {
    dispatch(readBasketCandies())
      .unwrap()
      .catch((error) => {
        alert(error.message);
      });
  }, [dispatch]);
  
  return (
    <Grid container spacing={2} padding="1rem">
        {areCandiesNotEmpty ? (
          candies.map(({candy, quantity}) => (
            <Grid key={candy.id} item xs={12}>
              <BasketItem candy={candy} quantity={quantity} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{justifyContent: "center"}}>
            <Typography variant="h4">No candies to show</Typography>
          </Grid>
        )}
    </Grid>
  );
}

export default BasketItems;

BasketItems.propTypes = {

};
