import { PhoneOff, Mic, Volume2, User } from 'lucide-react'
import { useState, useEffect } from 'react'

const VoIPModal = ({ personName, onClose }) => {
  const [timer, setTimer] = useState(0)
  const [status, setStatus] = useState('Connecting...')

  useEffect(() => {
    const connTimeout = setTimeout(() => {
      setStatus('Connected')
    }, 2000)

    let interval;
    if (status === 'Connected') {
      interval = setInterval(() => setTimer(t => t + 1), 1000)
    }
    
    return () => {
      clearTimeout(connTimeout)
      clearInterval(interval)
    }
  }, [status])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="animate-fade-in" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px'
      }}>
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', border: '2px solid var(--accent-cyan)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: status === 'Connected' ? '0 0 40px rgba(0, 240, 255, 0.2)' : 'none',
          transition: 'all 0.3s'
        }}>
          <User size={60} color="#fff" />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{personName || 'Requester'}</h2>
          <p style={{ color: status === 'Connected' ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '1.2rem' }}>
            {status === 'Connected' ? formatTime(timer) : status}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
          <button style={{ 
            width: '64px', height: '64px', borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Mic size={28} />
          </button>
          
          <button onClick={onClose} style={{ 
            width: '64px', height: '64px', borderRadius: '50%', border: 'none',
            background: 'var(--accent-red)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(255, 59, 48, 0.4)'
          }}>
            <PhoneOff size={28} />
          </button>
          
          <button style={{ 
            width: '64px', height: '64px', borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Volume2 size={28} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoIPModal
