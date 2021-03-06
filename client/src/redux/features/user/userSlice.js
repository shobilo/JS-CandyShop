import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {checkAuth, login, logout, readOrderById, readUserOrders, registration} from "./userActionCreators";

const initialState = {
  isAdmin: false,
  isAuth: false,
  isLoading: false,
  userData: {},
  orders: [],
  currentOrder: {},
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = []
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.isAuth = true
        state.userData = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true
        state.userData = action.payload.userData
        state.isAdmin = action.payload.isAdmin
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false
        state.isAdmin = false
        state.userData = {}
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true
        state.userData = action.payload.userData
        state.isAdmin = action.payload.isAdmin
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false
        state.isAdmin = false
        state.userData = {}
      })
      .addCase(readUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      .addCase(readOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload
      })
      .addMatcher(
        isAnyOf(
          registration.pending,
          login.pending,
          logout.pending,
          checkAuth.pending,
          readUserOrders.pending,
          readOrderById.pending,
        ),
        (state) => {
          state.error = "";
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          registration.fulfilled,
          login.fulfilled,
          logout.fulfilled,
          checkAuth.fulfilled,
          readUserOrders.fulfilled,
          readOrderById.fulfilled,
        ),
        (state) => {
          state.error = "";
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          registration.rejected,
          login.rejected,
          logout.rejected,
          checkAuth.rejected,
          readUserOrders.rejected,
          readOrderById.rejected,
        ),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const {resetOrders, resetCurrentOrder} = userSlice.actions
export default userSlice.reducer;
