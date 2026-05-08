import type { WeatherData } from './types/weather'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
      <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
      <span className="text-base font-semibold text-white">{value}</span>
    </div>
  )
}

function WeatherDisplay({ weather }: { weather: WeatherData }) {
  const glass = {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)',
  }

  return (
    <>
      {/* Hero */}
      <section className="rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={glass}>
        <div>
          <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{weather.city}</p>
          <div className="flex items-end gap-3">
            <span className="text-8xl font-thin text-white leading-none">{weather.temp}°</span>
            <img src={weather.icon} alt={weather.condition} className="w-16 h-16 mb-1" />
          </div>
          <p className="mt-2 text-sm text-white/70">{weather.condition}</p>
          <p className="text-xs mt-1 text-white/40">Feels like {weather.feels_like}°</p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:min-w-[260px]">
          <StatCard label="Humidity" value={`${weather.humidity}%`} />
          <StatCard label="Wind" value={`${weather.wind_speed} km/h ${weather.wind_dir}`} />
          <StatCard label="Pressure" value={`${weather.pressure} hPa`} />
          <StatCard label="Visibility" value={`${weather.visibility} km`} />
        </div>
      </section>

      {/* Sun times */}
      <section className="rounded-2xl p-5 grid grid-cols-3 text-center" style={glass}>
        {[
          { label: 'Sunrise', value: weather.sunrise },
          { label: 'Sunset', value: weather.sunset },
          { label: 'Daylight', value: weather.daylight },
        ].map((item, i) => (
          <div key={item.label} className={`px-4 ${i !== 2 ? 'border-r border-white/10' : ''}`}>
            <p className="text-xs uppercase tracking-widest mb-1 text-white/40">{item.label}</p>
            <p className="text-sm font-medium text-white">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Hourly */}
      {weather.hourly.length > 0 && (
        <section className="rounded-2xl p-5" style={glass}>
          <p className="text-xs uppercase tracking-widest mb-4 text-white/40">Hourly</p>
          <div className="overflow-x-auto">
            <div className="flex gap-5 min-w-max pb-1">
              {weather.hourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 w-14">
                  <span className="text-xs text-white/40">{h.time}</span>
                  <img src={h.icon} alt="" className="w-8 h-8" />
                  <span className="text-sm font-medium text-white">{h.temp}°</span>
                  {h.rain > 0 && <span className="text-xs text-blue-300">{h.rain}%</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Weekly */}
      {weather.weekly.length > 0 && (
        <section className="rounded-2xl p-5" style={glass}>
          <p className="text-xs uppercase tracking-widest mb-4 text-white/40">7-Day Forecast</p>
          <div className="space-y-1">
            {weather.weekly.map((day, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0 border-white/5">
                <span className="text-sm text-white/60 w-10">{day.day}</span>
                <img src={day.icon} alt="" className="w-7 h-7" />
                {day.rain > 0
                  ? <span className="text-xs text-blue-300 w-10 text-right">{day.rain}%</span>
                  : <span className="w-10" />}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/40">{day.lo}°</span>
                  <div className="w-20 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        marginLeft: `${((day.lo + 10) / 50) * 100}%`,
                        width: `${((day.hi - day.lo) / 50) * 100}%`,
                        background: 'rgba(255,255,255,0.5)',
                      }}
                    />
                  </div>
                  <span className="text-white font-medium">{day.hi}°</span>
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
    <div className="min-h-screen font-sans" style={{
      background: 'linear-gradient(135deg, #2d3561 0%, #4a3f6b 40%, #3d5a80 100%)',
    }}>
      {/* Header */}
      <header style={{ background: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-xl font-bold tracking-tight text-white">Skycast</h1>
          <SearchBar onSearch={search} loading={loading} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        {error && <p className="text-sm text-red-300">{error}</p>}

        {!weather && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-32 space-y-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span className="text-5xl">🌤</span>
            <p className="text-sm">Search for a city to get started</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-32">
            <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
        )}

        {weather && <WeatherDisplay weather={weather} />}
      </main>
    </div>
  )
}