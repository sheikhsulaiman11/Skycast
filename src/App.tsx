import type { WeatherData } from './types/weather'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-zinc-100 flex flex-col gap-1">
      <span className="text-xs text-zinc-400 uppercase tracking-widest">{label}</span>
      <span className="text-lg font-semibold text-zinc-800">{value}</span>
    </div>
  )
}

function WeatherDisplay({ weather }: { weather: WeatherData }) {
  return (
    <>
      {/* Hero — current weather */}
      <section className="bg-white rounded-3xl border border-zinc-100 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-sm text-zinc-400 mb-1">{weather.city}</p>
          <div className="flex items-end gap-3">
            <span className="text-7xl font-light text-zinc-900 leading-none">{weather.temp}°</span>
            <img src={weather.icon} alt={weather.condition} className="w-16 h-16 mb-1" />
          </div>
          <p className="text-zinc-500 mt-2 text-sm">{weather.condition}</p>
          <p className="text-zinc-400 text-xs mt-1">Feels like {weather.feels_like}°</p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:min-w-[260px]">
          <StatCard label="Humidity" value={`${weather.humidity}%`} />
          <StatCard label="Wind" value={`${weather.wind_speed} km/h ${weather.wind_dir}`} />
          <StatCard label="Pressure" value={`${weather.pressure} hPa`} />
          <StatCard label="Visibility" value={`${weather.visibility} km`} />
        </div>
      </section>

      {/* Sun times */}
      <section className="bg-white rounded-2xl border border-zinc-100 p-5 grid grid-cols-3 divide-x divide-zinc-100 text-center">
        {[
          { label: 'Sunrise', value: weather.sunrise },
          { label: 'Sunset', value: weather.sunset },
          { label: 'Daylight', value: weather.daylight },
        ].map(item => (
          <div key={item.label} className="px-4">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-sm font-medium text-zinc-800">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Hourly forecast */}
      {weather.hourly.length > 0 && (
        <section className="bg-white rounded-2xl border border-zinc-100 p-5">
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-4">Hourly</p>
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-1">
              {weather.hourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 w-14">
                  <span className="text-xs text-zinc-400">{h.time}</span>
                  <img src={h.icon} alt="" className="w-8 h-8" />
                  <span className="text-sm font-medium text-zinc-800">{h.temp}°</span>
                  {h.rain > 0 && (
                    <span className="text-xs text-blue-400">{h.rain}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Weekly forecast */}
      {weather.weekly.length > 0 && (
        <section className="bg-white rounded-2xl border border-zinc-100 p-5">
          <p className="text-xs text-zinc-400 uppercase tracking-widest mb-4">7-Day Forecast</p>
          <div className="space-y-1">
            {weather.weekly.map((day, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
              >
                <span className="text-sm text-zinc-500 w-10">{day.day}</span>
                <img src={day.icon} alt="" className="w-7 h-7" />
                {day.rain > 0
                  ? <span className="text-xs text-blue-400 w-10 text-right">{day.rain}%</span>
                  : <span className="w-10" />
                }
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-400">{day.lo}°</span>
                  <div className="w-20 h-1 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-400"
                      style={{
                        marginLeft: `${((day.lo + 10) / 50) * 100}%`,
                        width: `${((day.hi - day.lo) / 50) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-zinc-700 font-medium">{day.hi}°</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default function App() {
  const { weather, loading, error, search } = useWeather()

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">Skycast</h1>
          <SearchBar onSearch={search} loading={loading} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!weather && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-32 text-zinc-400 space-y-2">
            <span className="text-5xl">🌤</span>
            <p className="text-sm">Search for a city to get started</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-32">
            <div className="w-6 h-6 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" />
          </div>
        )}

        {weather && <WeatherDisplay weather={weather} />}
      </main>
    </div>
  )
}