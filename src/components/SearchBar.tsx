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
        className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 transition"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 disabled:opacity-50 transition"
      >
        {loading ? '...' : 'Search'}
      </button>
    </div>
  )
}