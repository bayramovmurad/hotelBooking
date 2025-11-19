import Booking from './pages/Booking'

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-blue-700 text-white py-6 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl text-center font-semibold">Hotel Booking System</h1>
          
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Booking />
      </main>
    </div>
  )
}

export default App
