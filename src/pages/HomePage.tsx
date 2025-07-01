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
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IPIFY_API_KEY}&ipAddress=${query}`
      )
      const data = await response.json()
      setIPData({
        ip: data.ip,
        location: {
          city: data.location.city,
          region: data.location.region,
          country: data.location.country,
          timezone: data.location.timezone,
          lat: data.location.lat,
          lng: data.location.lng,
        },
        isp: data.isp,
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
