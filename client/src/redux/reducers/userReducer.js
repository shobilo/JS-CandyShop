import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAdmin: false,
  isAuth: false,
  isUserLoading: false,
  userData: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setIsUserLoading: (state, action) => {
      state.isUserLoading = action.payload
    },
    setUser: (state, action) => {
      state.userData = action.payload
    }
  }
})

export const { setIsAdmin, setIsAuth, setIsUserLoading, setUser } = userSlice.actions
export default userSlice.reducer