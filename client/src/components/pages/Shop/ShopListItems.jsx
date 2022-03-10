import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readAllCandies } from "../../../redux/features/candies/candiesActionCreators";
import ShopListItem from "./ShopListItem";

const ShopListItems = () => {
  const dispatch = useDispatch();

  const { candies, isLoading, currentPage } = useSelector(
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
        alert(error.message);
      });
  }, [currentPage, searchQuery, typeFilter, brandFilter, orderFilter, dispatch]);

  return (
    <Container>
      <Grid container spacing={3}>
        {isLoading && (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            maxWidth="lg"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <CircularProgress />
          </Grid>
        )}
        {areCandiesNotEmpty ? (
          candies.map((candy) => (
            <Grid key={candy.id} item xs={12} sm={6} md={4}>
              <ShopListItem candy={candy} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={6} md={4} sx={{justifyContent: "center"}}>
            <Typography variant="h4">No candies to show</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ShopListItems;
