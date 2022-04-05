import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { changeCandyRating, createCandy, deleteCandy, readAllCandies, readCandyById, updateCandy } from "./candiesActionCreators";

const initialState = {
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  candies: [],
  candy: {},
  error: "",
  filters: {
    searchQuery: '',
    typeFilter: '',
    brandFilter: '',
    orderFilter: ''
  }
};

const candiesSlice = createSlice({
  name: 'candies',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setOrderFilter: (state, action) => {
      state.filters.orderFilter = action.payload
    },
    setBrandFilter: (state, action) => {
      state.filters.brandFilter = action.payload
    },
    setTypeFilter: (state, action) => {
      state.filters.typeFilter = action.payload
    },
    setSearchQueryFilter: (state, action) => {
      state.filters.searchQuery = action.payload
    },
    resetFilters: (state) => {
      state.filters.searchQuery = ''
      state.filters.typeFilter = ''
      state.filters.brandFilter = ''
      state.filters.orderFilter = ''
    },
    resetCandy: (state) => {
      state.candy = {}
    },
    resetCandies: (state) => {
      state.candies = []
      state.currentPage = 1
      state.totalPages = 0
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createCandy.fulfilled, (state, action) => {
      state.candies.push(action.payload)
    })
    .addCase(readAllCandies.fulfilled, (state, action) => {
      state.candies = action.payload.candies
      state.totalPages = action.payload.totalPages
    })
    .addCase(readCandyById.fulfilled, (state, action) => {
      state.candy = action.payload
    })
    .addCase(updateCandy.fulfilled, (state, action) => {
      const changedCandy = state.candies?.find((candy) => candy.id === action.payload.id)
      for (const item in changedCandy) {
        changedCandy[item] = action.payload[item]
      }
    })
    .addCase(changeCandyRating.fulfilled, (state, action) => {
      const changedCandy = state.candies?.find((candy) => candy.id === action.payload.id) || state.candy
      changedCandy.averageRating = action.payload.averageRating
    })
    .addCase(deleteCandy.fulfilled, (state, action) => {
      state.candies = state.candies.filter((candy) => candy.id !== action.payload)
    })
    .addMatcher(
      isAnyOf(
        createCandy.pending,
        readAllCandies.pending,
        readCandyById.pending,
        changeCandyRating.pending,
        updateCandy.pending,
        deleteCandy.pending,
      ),
      (state) => {
        state.error = "";
        state.isLoading = true;
      }
    )
    .addMatcher(
      isAnyOf(
        createCandy.fulfilled,
        readAllCandies.fulfilled,
        readCandyById.fulfilled,
        changeCandyRating.fulfilled,
        updateCandy.fulfilled,
        deleteCandy.fulfilled,
      ),
      (state) => {
        state.error = "";
        state.isLoading = false;
      }
    )
    .addMatcher(
      isAnyOf(
        createCandy.rejected,
        readAllCandies.rejected,
        readCandyById.rejected,
        changeCandyRating.rejected,
        updateCandy.rejected,
        deleteCandy.rejected,
      ),
      (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    )
  }
})

export const { setCurrentPage, setBrandFilter, setOrderFilter, setSearchQueryFilter, setTypeFilter, resetFilters, resetCandy, resetCandies } = candiesSlice.actions
export default candiesSlice.reducer