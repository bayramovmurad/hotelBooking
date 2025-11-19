import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  days: [],
}

const addDaysToDate = (startDateStr, days) => {
  const start = new Date(startDateStr)
  const result = []
  if (!startDateStr) return result
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    result.push({
      index: i,
      date: `${yyyy}-${mm}-${dd}`,
      hotelId: null,
      lunchId: null,
      dinnerId: null,
    })
  }
  return result
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    generateDays: (state, action) => {
      const { startDate, days } = action.payload
      if (!startDate || !days || days <= 0) {
        state.days = []
        return
      }
      state.days = addDaysToDate(startDate, days)
    },
    setDayHotel: (state, action) => {
      const { index, hotelId } = action.payload
      const day = state.days[index]
      if (day) {
        day.hotelId = hotelId
      }
    },
    setDayLunch: (state, action) => {
      const { index, lunchId, boardType } = action.payload
      const day = state.days[index]
      if (!day) return
      if (boardType === 'NB') return
      day.lunchId = lunchId || null
      if (boardType === 'HB' && lunchId) {
        day.dinnerId = null
      }
    },
    setDayDinner: (state, action) => {
      const { index, dinnerId, boardType } = action.payload
      const day = state.days[index]
      if (!day) return
      if (boardType === 'NB') return
      day.dinnerId = dinnerId || null
      if (boardType === 'HB' && dinnerId) {
        day.lunchId = null
      }
    },
  },
})

export const { generateDays, setDayHotel, setDayLunch, setDayDinner } = bookingSlice.actions
export default bookingSlice.reducer
