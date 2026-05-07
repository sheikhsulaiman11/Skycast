import { useState } from 'react'

interface Props {
  onSearch: (city: string) => void
  loading: boolean
}

function SearchBar({ onSearch, loading }: Props) {
  const [input, setInput] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !input.trim()}>
        {loading ? 'Loading...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar