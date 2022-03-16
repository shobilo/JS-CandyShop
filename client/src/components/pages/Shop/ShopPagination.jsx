import { Container, Grid, Pagination, Paper } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentPage } from "../../../redux/features/candies/candiesSlice";

const ShopPagination = ({ paper }) => {
  const dispatch = useDispatch();

  const { currentPage, totalPages } = useSelector((state) => state.candies);

  const handleCurrentPageChanged = useCallback(
    (event, value) => {
      dispatch(setCurrentPage(value));
    },
    [dispatch]
  );

  return (
    <Container>
      <Grid container justifyContent="center">
        {paper ? (
          <Paper>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleCurrentPageChanged}
              color="secondary"
              showFirstButton
              showLastButton
            />
          </Paper>
        ) : (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleCurrentPageChanged}
            color="secondary"
            showFirstButton
            showLastButton
          />
        )}
      </Grid>
    </Container>
  );
};

export default ShopPagination;

ShopPagination.propTypes = {
  paper: PropTypes.bool
}

ShopPagination.defaultProps = {
  paper: false
}
