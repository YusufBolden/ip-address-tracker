import type { ReactNode } from 'react'

export type IPData = {
  ip: string
  location: {
    city: string
    region: string
    country: string
    timezone: string
    lat: number
    lng: number
  }
  isp: string
}

export type IPProviderProps = {
  children: ReactNode
}

export type IPContextType = {
  ipData: IPData | null
  setIPData: (data: IPData) => void
}
