import { CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readAllCandies } from "../../../redux/features/candies/candiesActionCreators";
import { resetCandies } from "../../../redux/features/candies/candiesSlice";
import ShopListItem from "./ShopListItem";

const ShopListItems = () => {
  const dispatch = useDispatch();

  const { candies, currentPage, isLoading } = useSelector(
    (state) => state.candies
  );
  const { searchQuery, typeFilter, brandFilter, orderFilter } = useSelector(
    (state) => state.candies.filters
  );

  const areCandiesNotEmpty = candies.length > 0;

  useEffect(() => {
    dispatch(
      readAllCandies({
        currentPage,
        searchQuery,
        typeFilter,
        brandFilter,
        orderFilter,
      })
    )
    .unwrap()
    .catch((error) => {
      alert(error);
    });
  }, [currentPage, searchQuery, typeFilter, brandFilter, orderFilter, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetCandies())
    }
  }, [dispatch])

  if (isLoading) {
    return (
      <Paper sx={{justifyContent: "center", display: "flex"}}>
        <CircularProgress />
      </Paper>
    )
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {areCandiesNotEmpty ? (
          candies.map((candy) => (
            <Grid key={candy.id} item xs={12} sm={6} md={4}>
              <ShopListItem candy={candy} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={6} md={4} sx={{justifyContent: "center"}}>
            <Paper>
              <Typography variant="h4">No candies to show</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ShopListItems;
