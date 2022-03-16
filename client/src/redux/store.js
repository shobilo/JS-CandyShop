import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import candiesReducer from './features/candies/candiesSlice'
import filtersDataReducer from './features/filtersData/filtersDataSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    candies: candiesReducer,
    filtersData: filtersDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
})

export default store