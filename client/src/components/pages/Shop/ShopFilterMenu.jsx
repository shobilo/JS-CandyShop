import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setBrandFilter,
  setOrderFilter,
  setSearchQueryFilter,
  setTypeFilter,
} from "../../../redux/features/candies/candiesSlice";
import { readAllFiltersData } from "../../../redux/features/filtersData/filtersDataActionCreators";
import { resetFiltersData } from "../../../redux/features/filtersData/filtersDataSlice";
import { getTitleCase } from "../../../utils/getTitleCase";
import MUISelect from "../../UI/MUISelect";

const ShopFilterMenu = () => {
  const dispatch = useDispatch();

  const { searchQuery, typeFilter, brandFilter, orderFilter } = useSelector(
    (state) => state.candies.filters
  );
  const { types, brands, isLoading } = useSelector(
    (state) => state.filtersData
  );

  const memoBrands = useMemo(() => {
    return brands?.map((brand) => ({
      value: `${brand.id}`,
      label: getTitleCase(brand.name),
    }));
  }, [brands]);

  const memoTypes = useMemo(() => {
    return types?.map((type) => ({
      value: `${type.id}`,
      label: getTitleCase(type.name),
    }))
  }, [types])

  useEffect(() => {
    dispatch(readAllFiltersData())
      .unwrap()
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetFiltersData())
    }
  }, [dispatch])

  const handleSearchFieldChanged = useCallback(
    (event) => {
      dispatch(setSearchQueryFilter(event.target.value));
    },
    [dispatch]
  );

  const handleTypeSelected = useCallback(
    (event) => {
      dispatch(setTypeFilter(event.target.value));
    },
    [dispatch]
  );

  const handleBrandSelected = useCallback(
    (event) => {
      dispatch(setBrandFilter(event.target.value));
    },
    [dispatch]
  );

  const handleOrderSelected = useCallback(
    (event) => {
      dispatch(setOrderFilter(event.target.value));
    },
    [dispatch]
  );

  const handleResetClicked = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container maxWidth="xl">
        <Paper>
          <Grid container direction="column" alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{padding: "1em", borderRadius: "1rem"}}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={12} md={2} alignSelf="flex-start">
            <TextField
              sx={{ minWidth: 150 }}
              id="searchField"
              label="Search candy by name"
              value={searchQuery}
              onChange={handleSearchFieldChanged}
              inputProps={{ maxLength: 20 }}
              InputProps={{
                startAdornment: (<SearchIcon />)
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <MUISelect
              value={typeFilter}
              onChange={handleTypeSelected}
              label="Type"
              options={memoTypes}
              isNone={true}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <MUISelect
              value={brandFilter}
              onChange={handleBrandSelected}
              label="Brand"
              options={memoBrands}
              isNone={true}
            />
          </Grid>

          <Grid item xs={12} md={2}>
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

          <Grid item xs={12} md={2} sx={{display: "flex", justifyContent: "flex-start"}}>
            <Button color="error" variant="outlined" onClick={handleResetClicked}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShopFilterMenu;
