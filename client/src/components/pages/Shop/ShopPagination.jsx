import { Container, Grid, Pagination } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../../redux/features/candies/candiesSlice";

const ShopPagination = () => {
  const dispatch = useDispatch();

  const { currentPage, totalPages } = useSelector((state) => state.candies);

  const handleCurrentPageChanged = useCallback((event, value) => {
    dispatch(setCurrentPage(value));
  }, [dispatch]);

  return (
    <Container>
      <Grid container justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleCurrentPageChanged}
          color="secondary"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Container>
  );
};

export default ShopPagination;
