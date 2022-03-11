import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setBrandFilter,
  setOrderFilter,
  setSearchQueryFilter,
  setTypeFilter,
} from "../../../redux/features/candies/candiesSlice";
import { readAllFiltersData } from "../../../redux/features/filtersData/filtersDataActionCreators";
import MUISelect from "../../UI/MUISelect";

const ShopFilterMenu = () => {
  const dispatch = useDispatch();

  const { searchQuery, typeFilter, brandFilter, orderFilter } = useSelector(
    (state) => state.candies.filters
  );
  const { types, brands, isLoading } = useSelector(
    (state) => state.filtersData
  );

  useEffect(() => {
    dispatch(readAllFiltersData())
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [dispatch]);

  const handleSearchFieldChanged = useCallback((event) => {
    dispatch(setSearchQueryFilter(event.target.value));
  }, [dispatch]);

  const handleTypeSelected = useCallback((event) => {
    dispatch(setTypeFilter(event.target.value));
  }, [dispatch]);

  const handleBrandSelected = useCallback((event) => {
    dispatch(setBrandFilter(event.target.value));
  }, [dispatch]);

  const handleOrderSelected = useCallback((event) => {
    dispatch(setOrderFilter(event.target.value));
  }, [dispatch]);

  const handleResetClicked = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container>
        <Grid container direction="column" alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container direction="column" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Search candy</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={{ minWidth: 150 }}
            id="searchField"
            label="Search..."
            value={searchQuery}
            onChange={handleSearchFieldChanged}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Filters</Typography>
        </Grid>

        <Grid item xs={12}>
          <MUISelect
            value={typeFilter}
            onChange={handleTypeSelected}
            label="Type"
            options={types.map((type) => ({
              value: `${type.id}`,
              label: type.name,
            }))}
            isNone={true}
          />
        </Grid>

        <Grid item xs={12}>
          <MUISelect
            value={brandFilter}
            onChange={handleBrandSelected}
            label="Brand"
            options={brands.map((brand) => ({
              value: `${brand.id}`,
              label: brand.name,
            }))}
            isNone={true}
          />
        </Grid>

        <Grid item xs={12}>
          <MUISelect
            value={orderFilter}
            onChange={handleOrderSelected}
            label="Order"
            options={[
              { value: "ASC", label: "Ascending" },
              { value: "DESC", label: "Descending" },
            ]}
            isNone={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Button color="error" variant="outlined" onClick={handleResetClicked}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopFilterMenu;
