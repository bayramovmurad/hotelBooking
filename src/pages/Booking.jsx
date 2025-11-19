import StepOneConfig from '../components/StepOneConfig'
import DailyTable from '../components/DailyTable'
import Summary from '../components/Summary'

const Booking = () => {
  return (
    <div className="space-y-6">
      <StepOneConfig />
      <DailyTable />
      <Summary />
    </div>
  )
}

export default Booking
