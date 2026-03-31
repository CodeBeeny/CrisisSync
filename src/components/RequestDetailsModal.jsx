import { X, MapPin, Clock, AlertTriangle, User, Activity, FileText } from 'lucide-react'

const getUrgencyColor = (urgency) => {
  if (urgency === 'Critical') return 'var(--accent-red)'
  if (urgency === 'High') return '#ff9800'
  return 'var(--accent-cyan)'
}

const RequestDetailsModal = ({ req, onClose }) => {
  if (!req) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%', maxWidth: '600px', position: 'relative',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'transparent', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ 
            background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-cyan)', 
            padding: '12px', borderRadius: '12px' 
          }}>
            <Activity size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{req.title}</h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ 
                background: 'rgba(255,255,255,0.05)', padding: '4px 12px', 
                borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' 
              }}>
                {req.type}
              </span>
              <span style={{ 
                color: getUrgencyColor(req.urgency), fontSize: '0.85rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                <AlertTriangle size={14} /> {req.urgency} Urgency
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> Requester
            </div>
            <div style={{ fontWeight: 500 }}>{req.requester}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} /> Time Posted
            </div>
            <div style={{ fontWeight: 500 }}>{req.time}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', gridColumn: '1 / -1' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} /> Precise Location
            </div>
            <div style={{ fontWeight: 500 }}>{req.location}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', gridColumn: '1 / -1' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} /> Description
            </div>
            <div style={{ fontWeight: 400, lineHeight: '1.6', color: 'var(--text-main)' }}>
              This is a standard emergency broadcast requesting immediate assistance for "{req.title}". Please approach the location with caution. Verify identity upon arriving. 
              Status currently marked as <strong style={{color: req.status === 'Resolved' ? 'var(--accent-green)' : 'currentColor'}}>{req.status}</strong>.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button className="btn btn-secondary" style={{ flex: 1, padding: '14px', justifyContent: 'center' }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default RequestDetailsModal
