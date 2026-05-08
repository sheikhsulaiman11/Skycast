import { mapWeatherApiResponse, type WeatherData } from '../types/weather'

const API_KEY = import.meta.env.VITE_OWM_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
  )

  if (!response.ok) {
    throw new Error('City not found')
  }

  const data = await response.json()
  return mapWeatherApiResponse(data)
}