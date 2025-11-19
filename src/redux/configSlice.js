import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  citizenship: '',
  startDate: '',
  days: 1,
  destination: '',
  boardType: 'NB',
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setCitizenship: (state, action) => {
      state.citizenship = action.payload
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload
    },
    setDays: (state, action) => {
      state.days = action.payload
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setBoardType: (state, action) => {
      state.boardType = action.payload
    },
  },
})

export const {
  setCitizenship,
  setStartDate,
  setDays,
  setDestination,
  setBoardType,
} = configSlice.actions

export default configSlice.reducer
