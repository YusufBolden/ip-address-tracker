import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useIP } from '../context/useIP'
import 'leaflet/dist/leaflet.css'
import type { LatLngExpression } from 'leaflet'

const IPMap = () => {
  const { ipData } = useIP()

  if (!ipData) {
    return null
  }

  const position: LatLngExpression = [
    ipData.location.lat,
    ipData.location.lng
  ]

  return (
    <div className="w-full h-96 mt-6 rounded overflow-hidden max-w-4xl">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {ipData.location.city}, {ipData.location.country}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default IPMap
