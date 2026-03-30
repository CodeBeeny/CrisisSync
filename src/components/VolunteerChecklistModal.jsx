import { CheckSquare, Square, ShieldAlert, X } from 'lucide-react'
import { useState } from 'react'

const VolunteerChecklistModal = ({ req, onConfirm, onClose }) => {
  const [checks, setChecks] = useState({
    safety: false,
    transport: false,
    supplies: false
  })

  const allChecked = Object.values(checks).every(Boolean)

  const toggleCheck = (key) => setChecks(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '90%', maxWidth: '450px', padding: '32px', position: 'relative',
        border: '1px solid rgba(0, 240, 255, 0.3)'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={24} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--accent-cyan)' }}>
          <ShieldAlert size={28} />
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Volunteer Safety Check</h2>
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
          Before accepting <strong>{req.title}</strong> in <strong>{req.location}</strong>, please confirm the following:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <div onClick={() => toggleCheck('safety')} style={{ cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {checks.safety ? <CheckSquare color="var(--accent-cyan)" /> : <Square color="var(--text-muted)" />}
            <span style={{ color: checks.safety ? '#fff' : 'var(--text-muted)' }}>I am in a safe location and not actively in danger.</span>
          </div>
          <div onClick={() => toggleCheck('transport')} style={{ cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {checks.transport ? <CheckSquare color="var(--accent-cyan)" /> : <Square color="var(--text-muted)" />}
            <span style={{ color: checks.transport ? '#fff' : 'var(--text-muted)' }}>I have reliable transportation or means to reach the victim.</span>
          </div>
          <div onClick={() => toggleCheck('supplies')} style={{ cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {checks.supplies ? <CheckSquare color="var(--accent-cyan)" /> : <Square color="var(--text-muted)" />}
            <span style={{ color: checks.supplies ? '#fff' : 'var(--text-muted)' }}>I have the required items mentioned in the request.</span>
          </div>
        </div>

        <button 
          className="btn btn-cyan" 
          disabled={!allChecked}
          onClick={onConfirm}
          style={{ width: '100%', padding: '16px', fontSize: '1.1rem', opacity: allChecked ? 1 : 0.5 }}
        >
          Confirm & Accept Request
        </button>
      </div>
    </div>
  )
}

export default VolunteerChecklistModal
