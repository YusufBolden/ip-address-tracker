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
  const [initialCoords, setInitialCoords] = useState<[number, number] | null>(null)

  const fetchIPData = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError('')
      let ipToLookup = ''

      if (query.trim() === '') {
        ipToLookup = ''
      } else if (/^\d{1,3}(\.\d{1,3}){3}$/.test(query)) {
        ipToLookup = query.trim()
      } else {
        // Treat as domain, resolve to IP
        const dnsRes = await fetch(`https://dns.google/resolve?name=${query.trim()}&type=A`)
        const dnsData = await dnsRes.json()
        if (!dnsData.Answer || !dnsData.Answer.length) {
          setError('Could not resolve domain to IP. Please check the domain and try again.')
          return
        }
        ipToLookup = dnsData.Answer[0].data
      }
      // Now fetches IP data from ipwho.is
      const url = ipToLookup ? `https://ipwho.is/${ipToLookup}` : `https://ipwho.is/`
      const response = await fetch(url)
      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Unable to locate this IP or domain. Please try again.')
        return
      }

      if (!initialCoords) {
        setInitialCoords([data.latitude, data.longitude])
      }

      setIPData({
        ip: data.ip,
        location: {
          continent: data.continent,
          city: data.city,
          region: data.region,
          country: data.country,
          postal: data.postal || '',
          timezone: data.timezone_gmt,
          lat: data.latitude,
          lng: data.longitude,
          asn: data.connection?.asn?.toString() || '',
          domain: data.connection?.domain || ''
        },
        isp: data.connection?.org || data.connection?.isp || 'N/A'
      })
    } catch (err) {
      console.error('Fetch failed:', err)
      setError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [setIPData, initialCoords])

  useEffect(() => {
    fetchIPData('')
  }, [fetchIPData])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-[#0B132B] text-[#E7D3AD]">
      <h1 className="text-3xl font-extrabold text-[#5BC0EB] my-6 tracking-wide flex items-center gap-2">
        <img src="/ip-address-tracker/favicon.png" alt="App logo" className="w-10 h-10" />
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
        {!loading && !error && ipData && (
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <IPDetails initialCoords={initialCoords} />
            <IPMap />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage
