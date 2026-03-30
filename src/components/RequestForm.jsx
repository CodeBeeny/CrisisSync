import { useState } from 'react'
import { AlertCircle, User, MapPin, Clock, Package } from 'lucide-react'

const RequestForm = ({ onCancel, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit()
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
            <select required style={inputStyle} defaultValue="">
              <option value="" disabled>Select emergency type...</option>
              <option value="medical">Medical Assistance</option>
              <option value="food">Food & Water</option>
              <option value="rescue">Evacuation / Rescue</option>
              <option value="shelter">Shelter Needed</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Urgency / Time */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><Clock size={16} /> How soon?</label>
              <select required style={inputStyle}>
                <option value="immediate">Immediate (Critical)</option>
                <option value="1hr">Within 1 Hour</option>
                <option value="12hr">Within 12 Hours</option>
                <option value="24hr">Within 24 Hours</option>
              </select>
            </div>

            {/* Units/Quantity */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><Package size={16} /> Units Needed</label>
              <input type="number" min="1" placeholder="E.g., 2 boxes of meals..." required style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Location */}
            <div style={{ flex: 2 }}>
              <label style={labelStyle}><MapPin size={16} /> Location</label>
              <input type="text" placeholder="Enter your current address or coordinates..." required style={inputStyle} />
            </div>

            {/* People Count */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><User size={16} /> People Status</label>
              <select required style={inputStyle}>
                <option value="alone">I am alone</option>
                <option value="family">Family (2-4)</option>
                <option value="group">Large Group (5+)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Additional Details (Optional)</label>
            <textarea rows="3" placeholder="Any specific instructions for volunteers..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} disabled={isSubmitting}>
              {isSubmitting ? 'Broadcasting Request...' : 'Broadcast Emergency Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RequestForm
