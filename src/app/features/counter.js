import { createSlice } from '@reduxjs/toolkit'



export const counterSlice = createSlice({
  name: 'orders',
  initialState: {
    activeState: false,
    value : 0
  },
  reducers: {
    add: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
     state.activeState = !state.activeState
    },
    decrement: (state) => {
      state.activeState = false
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer