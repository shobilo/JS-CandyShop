import {Container, Grid, Paper, Typography} from "@mui/material";
import React, {useEffect, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import debounce from 'lodash.debounce'
import {readAllCandies} from "../../../redux/features/candies/candiesActionCreators";
import {resetCandies} from "../../../redux/features/candies/candiesSlice";
import ShopListItem from "./ShopListItem";

const ShopListItems = () => {
  const dispatch = useDispatch();
  
  const {candies, currentPage} = useSelector(
    (state) => state.candies
  );
  const {searchQuery, typeFilter, brandFilter, orderFilter} = useSelector(
    (state) => state.candies.filters
  );
  
  const areCandiesNotEmpty = candies?.length > 0;
  
  const debouncedRead = useMemo(() => debounce((currentPage, searchQuery) => {
    dispatch(
      readAllCandies({
        currentPage,
        searchQuery,
        typeFilter,
        brandFilter,
        orderFilter
      })
    )
      .unwrap()
      .catch((error) => {
        console.error(error);
      });
  }, 500), [dispatch, typeFilter, brandFilter, orderFilter]);
  
  useEffect(() => {
    debouncedRead(currentPage, searchQuery, typeFilter, brandFilter, orderFilter)
  }, [currentPage, searchQuery, typeFilter, brandFilter, orderFilter, dispatch, debouncedRead]);
  
  useEffect(() => {
    return () => {
      dispatch(resetCandies())
    }
  }, [dispatch])
  
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} justifyContent="flex-start">
        {areCandiesNotEmpty ? (
          candies.map((candy) => (
            <Grid key={candy.id} item xs={12} sm={6} md={4} sx={{justifyContent: "flex-start"}}>
              <ShopListItem candy={candy}/>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{borderRadius: "1rem", padding: "1rem"}}>
              <Typography variant="h4">No candies to show</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ShopListItems;
