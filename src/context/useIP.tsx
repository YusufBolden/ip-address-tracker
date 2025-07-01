import { useContext } from 'react'
import { IPContext } from './IPContext'

export const useIP = () => {
  const context = useContext(IPContext)
  if (!context) {
    throw new Error('useIP must be used within an IPProvider')
  }
  return context
}
