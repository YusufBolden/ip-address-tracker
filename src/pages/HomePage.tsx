import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IPForm from '../components/IPForm'
import IPDetails from '../components/IPDetails'
import IPMap from '../components/IPMap'
import { useIP } from '../context/useIP'

const HomePage = () => {
  const { setIPData, ipData } = useIP()
  const [loading, setLoading] = useState(false)

  const fetchIPData = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const url = query.trim()
        ? `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IP_GEO_KEY}&ip=${query}`
        : `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IP_GEO_KEY}`

      const response = await fetch(url)
      const data = await response.json()

      if (!data.city || !data.latitude || !data.longitude) {
        console.error('API returned incomplete data:', data)
        return
      }

      setIPData({
        ip: data.ip,
        location: {
          continent: data.continent_name,
          city: data.city,
          region: data.state_prov,
          country: data.country_name,
          postal: data.zipcode || '',
          timezone: data.time_zone.name,
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
          asn: data.asn || '',
          domain: data.organization || ''
        },
        isp: data.isp || data.organization || 'N/A'
      })
    } catch (err) {
      console.error('Failed to fetch IP data:', err)
    } finally {
      setLoading(false)
    }
  }, [setIPData])

  useEffect(() => {
    fetchIPData('')
  }, [fetchIPData])

  console.log('IP Data:', ipData)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-[#0B132B] text-[#E7D3AD]">
      <h1 className="text-3xl font-extrabold text-[#5BC0EB] my-6 tracking-wide">
        IP Address Tracker
      </h1>
      <IPForm onSearch={fetchIPData} />
      {loading && (
        <p className="mt-6 text-[#5BC0EB] font-medium animate-pulse">Loading...</p>
      )}
      <AnimatePresence>
        {!loading && ipData && (
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <IPDetails />
            <IPMap />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage
