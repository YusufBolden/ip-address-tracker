import { useIP } from '../context/useIP'

const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180
  const R = 6371 // Earth radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const IPDetails = ({ initialCoords }: { initialCoords: [number, number] | null }) => {
  const { ipData } = useIP()

  if (!ipData) {
    return <p className="mt-4 text-[#E7D3AD]/80">No data loaded.</p>
  }

  let distanceKm = null
  let distanceMiles = null
  if (initialCoords) {
    distanceKm = haversine(initialCoords[0], initialCoords[1], ipData.location.lat, ipData.location.lng)
    distanceMiles = distanceKm * 0.621371
  }

  return (
    <div className="bg-[#0B132B]/70 backdrop-blur-md shadow-xl rounded-lg p-6 mt-6 w-full max-w-2xl border border-[#9BC53D]/40 transition-shadow duration-300 hover:shadow-3xl">
      <p><span className="font-semibold text-[#5BC0EB]">IP:</span> {ipData.ip}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Location:</span> {ipData.location.city}, {ipData.location.region}, {ipData.location.country} {ipData.location.postal}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Continent:</span> {ipData.location.continent}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Timezone:</span> UTC {ipData.location.timezone}</p>
      <p><span className="font-semibold text-[#5BC0EB]">ISP:</span> {ipData.isp}</p>
      <p><span className="font-semibold text-[#5BC0EB]">ASN:</span> {ipData.location.asn}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Domain:</span> {ipData.location.domain}</p>
      {distanceKm !== null && distanceMiles !== null && (
        <p>
          <span className="font-semibold text-[#5BC0EB]">Distance from initial location:</span>
          {' '}
          {distanceMiles.toFixed(2)} mi ({distanceKm.toFixed(2)} km)
        </p>
      )}
    </div>
  )
}

export default IPDetails
