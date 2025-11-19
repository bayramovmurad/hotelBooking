import { useDispatch, useSelector } from 'react-redux'
import { countries } from '../data/countries'
import { boardTypes } from '../data/boardTypes'
import {
  setCitizenship,
  setStartDate,
  setDays,
  setDestination,
  setBoardType,
} from '../redux/configSlice'

const StepOneConfig = () => {
  const dispatch = useDispatch()
  const config = useSelector((state) => state.config)

  return (
    <section className="bg-white rounded-xl shadow p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">1. Trip Configuration</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Citizenship */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Citizenship</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={config.citizenship}
            onChange={(e) => dispatch(setCitizenship(e.target.value))}
          >
            <option value="">Select citizenship...</option>
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Country */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Destination Country</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={config.destination}
            onChange={(e) => dispatch(setDestination(e.target.value))}
          >
            <option value="">Select destination...</option>
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 text-sm"
            value={config.startDate}
            onChange={(e) => dispatch(setStartDate(e.target.value))}
          />
        </div>

        {/* Number of days */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Number of Days</label>
          <input
            type="number"
            min={1}
            className="border rounded-lg px-3 py-2 text-sm"
            value={config.days}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10)
              const safe = Number.isNaN(val) ? 1 : Math.max(1, val)
              dispatch(setDays(safe))
            }}
          />
        </div>
      </div>

      {/* Board Type */}
      <div className="mt-2">
        <p className="text-sm font-medium mb-1">Board Type</p>
        <div className="flex flex-wrap gap-4">
          {boardTypes.map((b) => (
            <label
              key={b.code}
              className="inline-flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="boardType"
                value={b.code}
                checked={config.boardType === b.code}
                onChange={(e) => dispatch(setBoardType(e.target.value))}
              />
              <span className="font-medium">{b.code}</span>
              <span className="text-slate-500">{b.name}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepOneConfig
