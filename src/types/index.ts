import type { ReactNode } from 'react'

export type IPData = {
  ip: string
  location: {
    continent: string
    city: string
    region: string
    country: string
    postal: string
    timezone: string
    lat: number
    lng: number
    asn: string
    domain: string
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

export type IPFormProps = {
  onSearch: (query: string) => void
}
export interface RecentSearchesProps {
  recent: string[]
  onSearch: (query: string) => void
}
