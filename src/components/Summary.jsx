import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { hotelsByCountry } from '../data/hotels'
import { mealsByCountry } from '../data/meals'

const Summary = () => {
  const config = useSelector((state) => state.config)
  const days = useSelector((state) => state.booking.days)

  const { destination, startDate, days: dayCount, citizenship, boardType } = config

  const { detailedDays, total } = useMemo(() => {
    if (!destination) return { detailedDays: [], total: 0 }

    const hotels = hotelsByCountry[destination] || []
    const mealConfig = mealsByCountry[destination] || {}
    const lunchOptions = mealConfig.lunch || []
    const dinnerOptions = mealConfig.dinner || []

    const findHotel = (id) => hotels.find((h) => h.id === id)
    const findLunch = (id) => lunchOptions.find((m) => m.id === id)
    const findDinner = (id) => dinnerOptions.find((m) => m.id === id)

    let totalAcc = 0

    const detailed = days.map((d) => {
      const hotel = d.hotelId ? findHotel(d.hotelId) : null
      const lunch = d.lunchId ? findLunch(d.lunchId) : null
      const dinner = d.dinnerId ? findDinner(d.dinnerId) : null
      const dailyTotal =
        (hotel?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0)
      totalAcc += dailyTotal
      return { ...d, hotel, lunch, dinner, dailyTotal }
    })

    return { detailedDays: detailed, total: totalAcc }
  }, [destination, days])

  return (
    <section className="bg-white rounded-xl shadow p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-semibold">3. Summary & Price</h2>

      {/* Config summary */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-slate-700">
          Configuration Summary
        </h3>
        <div className="grid md:grid-cols-2 gap-y-1 text-sm">
          <div>
            <span className="font-medium">Citizenship:</span>{' '}
            {citizenship || '—'}
          </div>
          <div>
            <span className="font-medium">Destination:</span>{' '}
            {destination || '—'}
          </div>
          <div>
            <span className="font-medium">Start Date:</span>{' '}
            {startDate || '—'}
          </div>
          <div>
            <span className="font-medium">Number of Days:</span>{' '}
            {dayCount || '—'}
          </div>
          <div>
            <span className="font-medium">Board Type:</span>{' '}
            {boardType || '—'}
          </div>
        </div>
      </div>

      {/* Daily selections */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-slate-700">
          Daily Selections
        </h3>
        {detailedDays.length === 0 ? (
          <p className="text-sm text-slate-500">No daily selections yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left py-2 px-2">Day</th>
                  <th className="text-left py-2 px-2">Date</th>
                  <th className="text-left py-2 px-2">Hotel</th>
                  <th className="text-left py-2 px-2">Meals</th>
                  <th className="text-right py-2 px-2">Daily Total</th>
                </tr>
              </thead>
              <tbody>
                {detailedDays.map((d, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-2">{i + 1}</td>
                    <td className="py-2 px-2">{d.date}</td>
                    <td className="py-2 px-2">
                      {d.hotel ? (
                        <>
                          <div>{d.hotel.name}</div>
                          <div className="text-[11px] text-slate-500">
                            ${d.hotel.price}
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400">
                          No hotel selected
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2">
                      {d.lunch ? (
                        <div>
                          <span>Lunch: {d.lunch.name}</span>
                          <span className="block text-[11px] text-slate-500">
                            ${d.lunch.price}
                          </span>
                        </div>
                      ) : (
                        <div className="text-slate-400 text-[11px]">
                          No lunch
                        </div>
                      )}
                      {d.dinner ? (
                        <div className="mt-1">
                          <span>Dinner: {d.dinner.name}</span>
                          <span className="block text-[11px] text-slate-500">
                            ${d.dinner.price}
                          </span>
                        </div>
                      ) : (
                        <div className="text-slate-400 text-[11px]">
                          No dinner
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-2 text-right">
                      ${d.dailyTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t pt-3 flex justify-between items-baseline">
        <span className="text-sm font-semibold text-slate-700">
          Grand Total
        </span>
        <span className="text-lg md:text-2xl font-bold text-blue-700">
          ${total.toFixed(2)}
        </span>
      </div>
    </section>
  )
}

export default Summary
