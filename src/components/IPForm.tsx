import { useState, type FormEvent } from 'react'
import type { IPFormProps } from '../types'

const IPForm = ({ onSearch }: IPFormProps) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    onSearch(input.trim())
    setInput('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex gap-2 mt-6"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search IP or domain"
        className="flex-1 px-4 py-2 border rounded shadow"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  )
}

export default IPForm
