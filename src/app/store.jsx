import { configureStore } from '@reduxjs/toolkit'
import setNameSlice from './modules/setNameSlice'

const store = configureStore({
  reducer: {
    name: setNameSlice
  }
})

export default store
