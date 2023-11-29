import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../app/features/counter'

export default configureStore({
  reducer: {
    counter : counterReducer
  },
})