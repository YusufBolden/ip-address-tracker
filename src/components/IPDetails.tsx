import { useIP } from '../context/useIP'

const IPDetails = () => {
  const { ipData } = useIP()

  if (!ipData) {
    return <p className="mt-4 text-gray-600">No data loaded.</p>
  }

  return (
    <div className="bg-white shadow rounded p-4 mt-6 w-full max-w-2xl transition hover:shadow-lg">
      <p><strong>IP:</strong> {ipData.ip}</p>
      <p><strong>Location:</strong> {ipData.location.city}, {ipData.location.region}, {ipData.location.country}</p>
      <p><strong>Timezone:</strong> UTC {ipData.location.timezone}</p>
      <p><strong>ISP:</strong> {ipData.isp}</p>
    </div>
  )
}

export default IPDetails
