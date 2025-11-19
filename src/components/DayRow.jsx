import { useDispatch, useSelector } from 'react-redux'
import { hotelsByCountry } from '../data/hotels'
import { mealsByCountry } from '../data/meals'
import { setDayHotel, setDayLunch, setDayDinner } from '../redux/bookingSlice'

const DayRow = ({ index, day }) => {
  const dispatch = useDispatch()
  const { destination, boardType } = useSelector((state) => state.config)

  const hotels = destination ? hotelsByCountry[destination] || [] : []
  const mealConfig = destination ? mealsByCountry[destination] || {} : {}
  const lunchOptions = mealConfig.lunch || []
  const dinnerOptions = mealConfig.dinner || []

  const isNB = boardType === 'NB'
  const isHB = boardType === 'HB'

  return (
    <tr className="border-b last:border-0">
      <td className="py-2 px-2 align-top">{index + 1}</td>
      <td className="py-2 px-2 align-top">{day.date}</td>
      <td className="py-2 px-2 align-top">
        <select
          className="border rounded-lg px-2 py-1 w-full"
          value={day.hotelId || ''}
          onChange={(e) =>
            dispatch(
              setDayHotel({
                index,
                hotelId: e.target.value ? Number(e.target.value) : null,
              })
            )
          }
        >
          <option value="">Select hotel...</option>
          {hotels.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} (${h.price})
            </option>
          ))}
        </select>
      </td>

      <td className="py-2 px-2 align-top">
        <select
          className="border rounded-lg px-2 py-1 w-full disabled:bg-slate-100"
          disabled={isNB}
          value={day.lunchId || ''}
          onChange={(e) =>
            dispatch(
              setDayLunch({
                index,
                lunchId: e.target.value ? Number(e.target.value) : null,
                boardType,
              })
            )
          }
        >
          <option value="">No lunch</option>
          {lunchOptions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} (${m.price})
            </option>
          ))}
        </select>
        {isHB && (
          <p className="text-[11px] text-slate-500 mt-1">
            Half Board: choose lunch or dinner, not both.
          </p>
        )}
      </td>

      <td className="py-2 px-2 align-top">
        <select
          className="border rounded-lg px-2 py-1 w-full disabled:bg-slate-100"
          disabled={isNB}
          value={day.dinnerId || ''}
          onChange={(e) =>
            dispatch(
              setDayDinner({
                index,
                dinnerId: e.target.value ? Number(e.target.value) : null,
                boardType,
              })
            )
          }
        >
          <option value="">No dinner</option>
          {dinnerOptions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} (${m.price})
            </option>
          ))}
        </select>
      </td>
    </tr>
  )
}

export default DayRow
