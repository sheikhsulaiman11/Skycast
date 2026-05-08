export interface WeatherData {
  city: string
  temp: number
  feels_like: number
  condition: string
  icon: string
  humidity: number
  wind_speed: number
  pressure: number
  visibility: number
  wind_dir: string
  sunrise: string
  sunset: string
  daylight: string
  hourly: HourlyData[]
  weekly: WeeklyData[]
}

export interface HourlyData {
  time: string
  icon: string
  temp: number
  rain: number
}

export interface WeeklyData {
  day: string
  icon: string
  lo: number
  hi: number
  rain: number
}


export function mapWeatherApiResponse(data: any): WeatherData {
  const current = data.current
  const location = data.location
  const forecast = data.forecast?.forecastday ?? []

  const astro = forecast[0]?.astro ?? {}

  const toMinutes = (t: string) => {
    const [time, period] = t.split(' ')
    let [h, m] = time.split(':').map(Number)
    if (period === 'PM' && h !== 12) h += 12
    if (period === 'AM' && h === 12) h = 0
    return h * 60 + m
  }

  const daylightMins =
    astro.sunrise && astro.sunset
      ? toMinutes(astro.sunset) - toMinutes(astro.sunrise)
      : 0
  const daylightStr = `${Math.floor(daylightMins / 60)}h ${daylightMins % 60}m`

  const hourly: HourlyData[] = []
  const nowHour = new Date().getHours()

  for (const day of forecast) {
    for (const h of day.hour) {
      const hHour = new Date(h.time).getHours()
      if (day === forecast[0] && hHour < nowHour) continue
      hourly.push({
        time: new Date(h.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        icon: 'https:' + h.condition.icon,
        temp: Math.round(h.temp_c),
        rain: h.chance_of_rain,
      })
      if (hourly.length >= 24) break
    }
    if (hourly.length >= 24) break
  }

  const weekly: WeeklyData[] = forecast.map((day: any) => ({
    day: new Date(day.date).toLocaleDateString([], { weekday: 'short' }),
    icon: 'https:' + day.day.condition.icon,
    lo: Math.round(day.day.mintemp_c),
    hi: Math.round(day.day.maxtemp_c),
    rain: day.day.daily_chance_of_rain,
  }))

  return {
    city: `${location.name}, ${location.country}`,
    temp: Math.round(current.temp_c),
    feels_like: Math.round(current.feelslike_c),
    condition: current.condition.text,
    icon: 'https:' + current.condition.icon,
    humidity: current.humidity,
    wind_speed: current.wind_kph,
    pressure: current.pressure_mb,
    visibility: current.vis_km,
    wind_dir: current.wind_dir,
    sunrise: astro.sunrise ?? '—',
    sunset: astro.sunset ?? '—',
    daylight: daylightStr,
    hourly,
    weekly,
  }
}