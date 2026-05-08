const API_KEY = import.meta.env.VITE_OWM_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

export async function fetchWeatherByCity(city: string) {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
  )

  if (!response.ok) {
    throw new Error('City not found')
  }

  const data = await response.json()
  return data
}