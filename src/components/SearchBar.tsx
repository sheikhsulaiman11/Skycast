import { useState, type KeyboardEvent } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
  loading: boolean
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    if (value.trim()) onSearch(value.trim())
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Search city..."
        className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-5 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-50 transition hover:opacity-80"
        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {loading ? '...' : 'Search'}
      </button>
    </div>
  )
}