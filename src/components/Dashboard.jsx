import { useState } from 'react'
import { MapPin, Clock, AlertTriangle, ShieldCheck, Filter, Phone } from 'lucide-react'
import VolunteerChecklistModal from './VolunteerChecklistModal'
import VoIPModal from './VoIPModal'



const getUrgencyColor = (urgency) => {
  if (urgency === 'Critical') return 'var(--accent-red)'
  if (urgency === 'High') return '#ff9800' // orange
  return 'var(--accent-cyan)'
}

const RequestCard = ({ req, onAcceptClick, onContactClick }) => (
  <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ 
            background: 'rgba(255,255,255,0.05)', padding: '4px 12px', 
            borderRadius: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' 
          }}>
            {req.type}
          </span>
          <span style={{ 
            color: getUrgencyColor(req.urgency), fontSize: '0.8rem', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            <AlertTriangle size={14} /> {req.urgency}
          </span>
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{req.title}</h3>
      </div>
      <div style={{ 
        padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
        background: req.status === 'Resolved' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        color: req.status === 'Resolved' ? 'var(--accent-green)' : 'var(--text-main)'
      }}>
        {req.status}
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {req.location}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {req.time}</span>
    </div>

    {req.status === 'Pending' && (
      <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }}>View Details</button>
        <button className="btn btn-cyan" onClick={() => onAcceptClick(req)} style={{ flex: 1, padding: '10px' }}>
          <ShieldCheck size={18} /> Accept Request
        </button>  
      </div>
    )}
    {req.status === 'In Progress' && (
      <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }}>View Details</button>
        <button className="btn btn-primary" onClick={() => onContactClick(req)} style={{ flex: 1, padding: '10px', background: 'var(--accent-green)', borderColor: 'var(--accent-green)', color: '#000' }}>
          <Phone size={18} /> Contact Requester
        </button>  
      </div>
    )}
  </div>
)

const Dashboard = ({ requests, setRequests }) => {
  const [filter, setFilter] = useState('All')
  const [activeChecklistReq, setActiveChecklistReq] = useState(null)
  const [activeVoIPReq, setActiveVoIPReq] = useState(null)

  const handleConfirmAccept = () => {
    setRequests(prev => prev.map(r => 
      r.id === activeChecklistReq.id ? { ...r, status: 'In Progress' } : r
    ))
    setActiveChecklistReq(null)
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px', marginTop: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-glass)', paddingBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Live Requests</h1>
          <p style={{ color: 'var(--text-muted)' }}>Respond to emergencies in your local area.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {['All', 'Critical', 'High', 'Medium'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: '1px solid ' + (filter === f ? 'rgba(255,255,255,0.2)' : 'var(--border-glass)'),
                color: filter === f ? '#fff' : 'var(--text-muted)',
                padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {requests
          .filter(req => filter === 'All' || req.urgency === filter)
          .map((req, idx) => (
            <div key={req.id} style={{ animationDelay: `${idx * 0.1}s` }} className="animate-fade-in">
              <RequestCard req={req} onAcceptClick={setActiveChecklistReq} onContactClick={setActiveVoIPReq} />
            </div>
        ))}
      </div>

      {activeChecklistReq && (
        <VolunteerChecklistModal 
          req={activeChecklistReq} 
          onClose={() => setActiveChecklistReq(null)}
          onConfirm={handleConfirmAccept}
        />
      )}
      
      {activeVoIPReq && (
        <VoIPModal 
          personName={activeVoIPReq.requester}
          onClose={() => setActiveVoIPReq(null)} 
        />
      )}
    </div>
  )
}

export default Dashboard
