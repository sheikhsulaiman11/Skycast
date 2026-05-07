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