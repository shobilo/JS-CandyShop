import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { checkAuth, login, logout, registration } from "./userActionCreators";

const initialState = {
  isAdmin: false,
  isAuth: false,
  isLoading: false,
  userData: {},
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
      .addMatcher(
        isAnyOf(
          registration.pending,
          login.pending,
          logout.pending,
          checkAuth.pending
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
          checkAuth.fulfilled
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
          checkAuth.rejected
        ),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export default userSlice.reducer;
