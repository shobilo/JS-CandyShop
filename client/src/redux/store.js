import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import candiesReducer from './features/candies/candiesSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    candies: candiesReducer,
  }
})

export default store