import { useState } from 'react'
import { AlertCircle, User, MapPin, Clock, Package, Map } from 'lucide-react'
import MapPickerModal from './MapPickerModal'

const RequestForm = ({ onCancel, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const urgencyVal = e.target.urgency.value
    let urgencyDisplay = 'Medium'
    if (urgencyVal === 'immediate') urgencyDisplay = 'Critical'
    if (urgencyVal === '1hr') urgencyDisplay = 'High'
    
    const typeSelect = e.target.type
    const typeText = typeSelect.options[typeSelect.selectedIndex].text
    
    // Ensure we handle multi-word types nicely like "Medical Assistance" -> "Medical"
    let typeIconText = typeText.split(' ')[0]
    if (typeText.includes('Food')) typeIconText = 'Food'
    if (typeText.includes('Evacuation')) typeIconText = 'Rescue'

    const newReq = {
      id: Date.now(),
      type: typeIconText,
      title: typeText,
      location: location || 'Unknown Location',
      time: 'Just now',
      urgency: urgencyDisplay,
      status: 'Pending',
      requester: 'You (Anonymous)'
    }

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit(newReq)
    }, 1500)
  }

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-main)',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
    transition: 'all 0.2s',
  }

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-muted)',
    fontWeight: 600,
    marginBottom: '8px',
    fontSize: '0.9rem'
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '40px auto' }}>
      <div className="glass-panel">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            background: 'rgba(255, 59, 48, 0.1)', color: 'var(--accent-red)', 
            padding: '12px', borderRadius: '50%', display: 'inline-flex', marginBottom: '16px' 
          }}>
            <AlertCircle size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Request Emergency Help</h2>
          <p style={{ color: 'var(--text-muted)' }}>Fill out this form to broadcast your needs to nearby volunteers.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Problem Type */}
          <div>
            <label style={labelStyle}><AlertCircle size={16} /> Problem Type</label>
            <select name="type" required style={inputStyle} defaultValue="">
              <option value="" disabled>Select emergency type...</option>
              <option value="medical">Medical Assistance</option>
              <option value="food">Food & Water</option>
              <option value="rescue">Evacuation / Rescue</option>
              <option value="shelter">Shelter Needed</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-row">
            {/* Urgency / Time */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><Clock size={16} /> How soon?</label>
              <select name="urgency" required style={inputStyle}>
                <option value="immediate">Immediate (Critical)</option>
                <option value="1hr">Within 1 Hour</option>
                <option value="12hr">Within 12 Hours</option>
                <option value="24hr">Within 24 Hours</option>
              </select>
            </div>

            {/* Units/Quantity */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><Package size={16} /> Units Needed</label>
              <input name="units" type="number" min="1" placeholder="E.g., 2 boxes of meals..." required style={inputStyle} />
            </div>
          </div>

          <div className="form-row">
            {/* Location */}
            <div style={{ flex: 2 }}>
              <label style={labelStyle}><MapPin size={16} /> Location</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Address or click map..." 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required 
                  style={{ ...inputStyle, flex: 1 }} 
                />
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ padding: '0 16px' }}
                  onClick={() => setShowMap(true)}
                  title="Choose on map"
                >
                  <Map size={20} />
                </button>
              </div>
            </div>

            {/* People Count */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><User size={16} /> People Status</label>
              <select name="people" required style={inputStyle}>
                <option value="alone">I am alone</option>
                <option value="family">Family (2-4)</option>
                <option value="group">Large Group (5+)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Additional Details (Optional)</label>
            <textarea name="details" rows="3" placeholder="Any specific instructions for volunteers..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} disabled={isSubmitting}>
              {isSubmitting ? 'Broadcasting Request...' : 'Broadcast Emergency Request'}
            </button>
          </div>
        </form>
      </div>

      {showMap && (
        <MapPickerModal 
          onClose={() => setShowMap(false)} 
          onConfirm={(coords) => {
            setLocation(coords)
            setShowMap(false)
          }} 
        />
      )}
    </div>
  )
}

export default RequestForm
