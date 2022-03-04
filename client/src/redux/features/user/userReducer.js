import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { checkAuth, login, logout, registration } from "./userActionCreators";

const initialState = {
  isAdmin: false,
  isAuth: false,
  isUserLoading: false,
  userData: {},
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
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
        state.userData = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false
        state.isAdmin = false
        state.userData = {}
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true
        state.userData = action.payload
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
          state.isUserLoading = true;
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
          state.isUserLoading = false;
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
          state.isUserLoading = false;
        }
      );
  },
});

export const {setIsAdmin} = userSlice.actions;
export default userSlice.reducer;