import { useIP } from '../context/useIP'

const IPDetails = () => {
  const { ipData } = useIP()

  if (!ipData) {
    return <p className="mt-4 text-[#E7D3AD]/80">No data loaded.</p>
  }

  return (
    <div className="bg-[#0B132B]/70 backdrop-blur-md shadow-xl rounded-lg p-6 mt-6 w-full max-w-2xl border border-[#9BC53D]/40 hover:scale-105 transition">
      <p><span className="font-semibold text-[#5BC0EB]">IP:</span> {ipData.ip}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Location:</span> {ipData.location.city}, {ipData.location.region}, {ipData.location.country}</p>
      <p><span className="font-semibold text-[#5BC0EB]">Timezone:</span> UTC {ipData.location.timezone}</p>
      <p><span className="font-semibold text-[#5BC0EB]">ISP:</span> {ipData.isp || 'N/A'}</p>
    </div>
  )
}

export default IPDetails
