import SearchBar from './components/SearchBar'
import useWeather from './hooks/useWeather'

function App() {
  const { data, loading, error, searchCity } = useWeather()

  return (
    <div>
      <h1>Skycast</h1>
      <SearchBar onSearch={searchCity} loading={loading} />
      {error && <p>{error}</p>}
      {data && <p>Got data!</p>}
    </div>
  )
}

export default App