import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateDays } from '../redux/bookingSlice'
import DayRow from './DayRow'

const DailyTable = () => {
  const dispatch = useDispatch()
  const config = useSelector((state) => state.config)
  const days = useSelector((state) => state.booking.days)

  useEffect(() => {
    if (config.startDate && config.days > 0) {
      dispatch(generateDays({ startDate: config.startDate, days: config.days }))
    }
  }, [config.startDate, config.days, dispatch])

  if (!config.startDate || !config.destination || !config.days) {
    return (
      <section className="bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-2">2. Daily Configuration</h2>
        <p className="text-sm text-slate-500">
          Set start date, number of days, and destination to configure daily hotels and meals.
        </p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">2. Daily Configuration</h2>
      {days.length === 0 ? (
        <p className="text-sm text-slate-500">No days generated.</p>
      ) : (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="text-left py-2 px-2">Day</th>
              <th className="text-left py-2 px-2">Date</th>
              <th className="text-left py-2 px-2">Hotel</th>
              <th className="text-left py-2 px-2">Lunch</th>
              <th className="text-left py-2 px-2">Dinner</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <DayRow key={index} index={index} day={day} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default DailyTable
