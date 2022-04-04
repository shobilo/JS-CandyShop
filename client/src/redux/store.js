import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import candiesReducer from './features/candies/candiesSlice'
import filtersDataReducer from './features/filtersData/filtersDataSlice'
import basketReducer from './features/basket/basketSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    candies: candiesReducer,
    filtersData: filtersDataReducer,
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 512 },
    serializableCheck: { warnAfter: 512 },
  })
})

export default store