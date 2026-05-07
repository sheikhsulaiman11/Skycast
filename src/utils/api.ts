const API_KEY = import.meta.env.VITE_OWM_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function fetchWeatherByCity(city: string) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('City not found')
  }

  const data = await response.json()
  return data
}