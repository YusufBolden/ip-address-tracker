export interface IPData {
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

export interface IPContextType {
  ipData: IPData | null
  setIPData: (data: IPData | null) => void
}

export interface IPProviderProps {
  children: React.ReactNode
}

export interface IPFormProps {
  onSearch: (query: string) => void
}
