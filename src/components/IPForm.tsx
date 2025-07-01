import { useState, type FormEvent } from 'react'
import type { IPFormProps } from '../types'

const IPForm = ({ onSearch }: IPFormProps) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) {
      setError('Please enter an IP address or domain')
      return
    }
    setError('')
    onSearch(input.trim())
    setInput('')
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-2 mt-6">
      <form
        onSubmit={handleSubmit}
        className="w-full flex gap-2"
        aria-label="IP search form"
      >
        <label htmlFor="ip-search" className="sr-only">
          Search IP or domain
        </label>
        <input
          id="ip-search"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search IP or domain"
          className="flex-1 px-4 py-2 border border-[#E7D3AD]/30 bg-[#0B132B] text-[#E7D3AD] rounded shadow focus:outline-none focus:ring-2 focus:ring-[#9BC53D] transition-transform duration-300 hover:scale-[1.04]"
          aria-invalid={!!error}
          aria-describedby="ip-error"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#9BC53D] to-[#5BC0EB] hover:from-[#5BC0EB] hover:to-[#9BC53D] text-[#0B132B] font-bold px-4 py-2 rounded transition-transform duration-300 hover:scale-110"
        >
          Search
        </button>
      </form>
      {error && (
        <p id="ip-error" className="text-[#E7D3AD] text-sm">
          {error}
        </p>
      )}
    </div>
  )
}

export default IPForm
