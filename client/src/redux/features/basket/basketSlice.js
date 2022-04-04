import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {deleteBasketCandies, readBasketCandies, updateBasketCandies} from "./basketActionCreators";

const initialState = {
  totalPrice: 0,
  isLoading: false,
  candies: [],
  error: "",
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    resetBasketCandies: (state) => {
      state.candies = []
    }
  },
  extraReducers: (builder => {
    builder
      .addMatcher(
        isAnyOf(
          readBasketCandies.pending,
          updateBasketCandies.pending,
          deleteBasketCandies.pending,
        ), (state) => {
          state.error = ""
          state.isLoading = true
        }
      )
      .addMatcher(
        isAnyOf(
          readBasketCandies.fulfilled,
          updateBasketCandies.fulfilled,
          deleteBasketCandies.fulfilled,
        ), (state, action) => {
          state.candies = action.payload.candies
          state.totalPrice = action.payload.totalPrice
          state.error = "";
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          readBasketCandies.rejected,
          updateBasketCandies.rejected,
          deleteBasketCandies.rejected,
        ), (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      )
  })
})

export default basketSlice.reducer