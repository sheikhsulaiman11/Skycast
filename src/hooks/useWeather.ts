import { useState } from 'react'
import type { WeatherData } from '../types/weather'
import { fetchWeatherByCity } from '../utils/api'

function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function searchCity(city: string) {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchWeatherByCity(city)
      console.log('API result:', result)
      setData(result)
    } catch (e) {
      setError('City not found. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, searchCity }
}

export default useWeather