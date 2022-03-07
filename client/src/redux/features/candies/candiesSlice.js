import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { readAllCandies } from "./candiesActionCreators";

const initialState = {
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  candies: [],
  error: "",
};

const candiesSlice = createSlice({
  name: 'candies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(readAllCandies.fulfilled, (state, action) => {
      state.candies = action.payload.candies
      state.totalPages = action.payload.totalPages
    })
    .addMatcher(
      isAnyOf(
        readAllCandies.pending,

      ),
      (state) => {
        state.error = "";
        state.isLoading = true;
      }
    )
    .addMatcher(
      isAnyOf(
        readAllCandies.fulfilled,
        
      ),
      (state) => {
        state.error = "";
        state.isLoading = false;
      }
    )
    .addMatcher(
      isAnyOf(
        readAllCandies.rejected,
        
      ),
      (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    )
  }
})

export default candiesSlice.reducer