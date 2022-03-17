import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { readAllBrands, readAllFiltersData, readAllTypes } from "./filtersDataActionCreators";

const initialState = {
  types: [],
  brands: [],
  isLoading: false,
  error: "",
};

const filtersDataSlice = createSlice({
  name: 'filtersData',
  initialState,
  reducers: {
    resetFiltersData: (state) => {
      state.types = []
      state.brands = []
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(readAllTypes.fulfilled, (state, action) => {
      state.types = action.payload
    })
    .addCase(readAllBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
    .addCase(readAllFiltersData.fulfilled, (state, action) => {
      state.brands = action.payload.brands
      state.types = action.payload.types
    })
    .addMatcher(
      isAnyOf(
        readAllBrands.pending,
        readAllTypes.pending,
      ),
      (state) => {
        state.error = "";
        state.isLoading = true;
      }
    )
    .addMatcher(
      isAnyOf(
        readAllBrands.fulfilled,
        readAllTypes.fulfilled,
      ),
      (state) => {
        state.error = "";
        state.isLoading = false;
      }
    )
    .addMatcher(
      isAnyOf(
        readAllBrands.rejected,
        readAllTypes.rejected,
      ),
      (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    )
  }
})

export const { resetFiltersData } = filtersDataSlice.actions
export default filtersDataSlice.reducer