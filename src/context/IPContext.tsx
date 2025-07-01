import { createContext, useState } from 'react'
import type { IPData, IPProviderProps, IPContextType } from '../types'

const IPContext = createContext<IPContextType | undefined>(undefined)

const IPProvider = ({ children }: IPProviderProps) => {
  const [ipData, setIPData] = useState<IPData | null>(null)

  return (
    <IPContext.Provider value={{ ipData, setIPData }}>
      {children}
    </IPContext.Provider>
  )
}

export { IPContext, IPProvider }
