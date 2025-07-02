import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IPForm from '../components/IPForm'
import IPDetails from '../components/IPDetails'
import IPMap from '../components/IPMap'
import { useIP } from '../context/useIP'

const HomePage = () => {
  const { setIPData, ipData } = useIP()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchIPData = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError('')
      const url = query.trim()
        ? `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IP_GEO_KEY}&ip=${query}`
        : `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IP_GEO_KEY}`

      const response = await fetch(url)
      if (!response.ok) {
        console.error('Network response was not ok', response.status, response.statusText)
        setError(`Network error: ${response.status}`)
        return
      }

      const data = await response.json()

      if (!data.city || !data.latitude || !data.longitude) {
        console.error('API returned incomplete data:', data)
        setError('Data incomplete from API. Please try a different query.')
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
          asn: data.asn || 'Not Provided',
          domain: data.organization || ''
        },
        isp: data.isp || data.organization || 'N/A'
      })
    } catch (err) {
      console.error('Failed to fetch IP data:', err)
      setError('Failed to load IP data. Please check your network or try later.')
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
      <h1 className="text-3xl font-extrabold text-[#5BC0EB] my-6 tracking-wide flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-10 h-10 mr-3"
        >
          <circle cx="50" cy="50" r="50" fill="#5BC0EB" />
          <path
            d="M50 20c-10 0-18 8-18 18 0 13 18 35 18 35s18-22 18-35c0-10-8-18-18-18z"
            fill="#FF4136"
          />
          <circle cx="50" cy="38" r="6" fill="#E7D3AD" />
        </svg>
        IP Address Tracker
      </h1>

      {error && (
        <div className="relative bg-[#FF4136]/20 text-[#FF4136] p-4 rounded max-w-md w-full text-center mb-4 border border-[#FF4136]/30">
          ❌ {error}
          <button
            onClick={() => setError('')}
            className="absolute top-1 right-2 text-[#FF4136] hover:text-[#FF4136]/80 text-xl"
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      )}

      <IPForm onSearch={fetchIPData} />

      {loading && (
        <p className="mt-6 text-[#5BC0EB] font-medium animate-pulse">Loading...</p>
      )}

      <AnimatePresence>
        {!loading && ipData && !error && (
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
