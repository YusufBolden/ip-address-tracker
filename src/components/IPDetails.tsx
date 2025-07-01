import { useIP } from '../context/useIP'
import { useEffect, useState } from 'react'

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const IPDetails = () => {
  const { ipData } = useIP()
  const [distance, setDistance] = useState<{ km: number, mi: number } | null>(null)

  useEffect(() => {
    if (ipData) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude
          const userLon = pos.coords.longitude
          const km = haversineDistance(
            userLat,
            userLon,
            ipData.location.lat,
            ipData.location.lng
          )
          const mi = km * 0.621371
          setDistance({ km, mi })
        },
        (err) => {
          console.error('Geolocation error:', err)
          setDistance(null)
        }
      )
    }
  }, [ipData])

  if (!ipData) {
    return <p className="mt-4 text-[#E7D3AD]/80">No data loaded.</p>
  }

  return (
    <div className="bg-[#0B132B]/70 backdrop-blur-md shadow-xl rounded-lg p-6 mt-6 w-full max-w-2xl border border-[#9BC53D]/40 hover:scale-105 transition">
      <p><span className="font-semibold text-[#5BC0EB]">IP:</span> {ipData.ip}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Continent:</span> {ipData.location.continent}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Company:</span> {ipData.isp || 'N/A'}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Address:</span> {ipData.location.city}, {ipData.location.region} {ipData.location.postal}, {ipData.location.country}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Timezone:</span> UTC {ipData.location.timezone}</p>
      {distance !== null && (
        <p><span className="font-semibold text-[#5BC0EB]">Approx. Distance: </span> 
        {distance.mi.toFixed(1)} mi ({distance.km.toFixed(1)} km) from your location</p>
      )}
      {ipData.location.asn && (
        <p><span className="font-semibold text-[#5BC0EB]">ASN:</span> {ipData.location.asn}</p>
      )}
      {ipData.location.domain && (
        <p><span className="font-semibold text-[#5BC0EB]">Domain:</span> {ipData.location.domain}</p>
      )}
    </div>
  )
}

export default IPDetails
