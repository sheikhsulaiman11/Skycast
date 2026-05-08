import { useState, useCallback } from 'react'
import { fetchWeatherByCity } from '../utils/api'
import { type WeatherData } from '../types/weather'

interface UseWeatherReturn {
  weather: WeatherData | null
  loading: boolean
  error: string | null
  search: (city: string) => Promise<void>
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (city: string) => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherByCity(city.trim())
      setWeather(data)
    } catch {
      setError('City not found. Try again.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { weather, loading, error, search }
}