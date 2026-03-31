import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { X, Check } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})
L.Marker.prototype.options.icon = DefaultIcon

function MapEventsHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  })
  return null
}

const MapPickerModal = ({ onClose, onConfirm }) => {
  const [position, setPosition] = useState(null)

  // Default to a central location (e.g., India) if geolocation isn't ready
  const defaultCenter = [20.5937, 78.9629]

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.warn('Geolocation blocked or unavailable')
      )
    }
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%', maxWidth: '800px', height: '80vh', position: 'relative',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Select Emergency Location</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
        </div>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-8px' }}>
          Tap or click on the map to drop a pin.
        </p>

        <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
          <MapContainer 
            center={position || defaultCenter} 
            zoom={position ? 12 : 5} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventsHandler setPosition={setPosition} />
            {position && <Marker position={position} />}
          </MapContainer>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            style={{ flex: 2, justifyContent: 'center' }} 
            disabled={!position}
            onClick={() => onConfirm(`${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`)}
          >
            <Check size={18} /> Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}

export default MapPickerModal
