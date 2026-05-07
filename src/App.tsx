import SearchBar from './components/SearchBar'

function App() {
  function handleSearch(city: string) {
    console.log('Searching for:', city)
  }

  return (
    <div>
      <h1>Skycast</h1>
      <SearchBar onSearch={handleSearch} loading={false} />
    </div>
  )
}

export default App