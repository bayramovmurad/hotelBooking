import { configureStore } from '@reduxjs/toolkit'
import configReducer from './configSlice'
import bookingReducer from './bookingSlice'

export const store = configureStore({
  reducer: {
    config: configReducer,
    booking: bookingReducer,
  },
})
