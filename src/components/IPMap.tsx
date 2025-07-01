import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useIP } from '../context/useIP'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { LatLngExpression } from 'leaflet'
import { useEffect } from 'react'

const FlyToMarker = ({ position }: { position: LatLngExpression }) => {
  const map = useMap()

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    map.flyTo(position, 13, {
      duration: 3,
      easeLinearity: 0.1
    })
  }, [map, position])

  return null
}

const IPMap = () => {
  const { ipData } = useIP()

  if (
    !ipData ||
    ipData.location.lat === undefined ||
    ipData.location.lng === undefined
  ) {
    return null
  }

  const position: LatLngExpression = [
    ipData.location.lat,
    ipData.location.lng
  ]

  const icon = L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#FF4136" stroke="white" stroke-width="1.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `,
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48]
  })

  return (
    <div className="w-full h-96 mt-6 rounded overflow-hidden max-w-4xl">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            {ipData.location.city}, {ipData.location.country}
          </Popup>
        </Marker>
        <FlyToMarker position={position} />
      </MapContainer>
    </div>
  )
}

export default IPMap
