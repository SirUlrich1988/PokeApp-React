import { createSlice } from '@reduxjs/toolkit'

const setNameSlice = createSlice({
  name: 'userName',
  initialState: '',
  reducers: {
    setName (state, { payload }) {
      state = payload
      return state
    }
  }
})

export const { setName } = setNameSlice.actions
export default setNameSlice.reducer
