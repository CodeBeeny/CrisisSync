import { Activity, ShieldPlus, Home, LayoutDashboard } from 'lucide-react'

const Navbar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="glass-nav" style={{
      position: 'fixed', width: '100%', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 24px'
    }}>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        onClick={() => setCurrentView('landing')}
      >
        <Activity color="var(--accent-red)" size={28} />
        <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em' }}>
          Crisis<span className="text-red">Sync</span>
        </span>
      </div>

      <div className="nav-buttons" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <button 
          style={{ 
            background: 'transparent', color: 'var(--text-muted)', 
            border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600,
            textDecoration: currentView === 'landing' ? 'underline' : 'none',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
          onClick={() => setCurrentView('landing')}
        >
          <Home size={18} />
          <span>Home</span>
        </button>
        <button 
          style={{ 
            background: 'transparent', color: 'var(--text-muted)', 
            border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600,
            textDecoration: currentView === 'dashboard' ? 'underline' : 'none',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
          onClick={() => setCurrentView('dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>
        <button className="btn btn-primary" onClick={() => setCurrentView('dashboard')}>
          <ShieldPlus size={18} />
          <span>Volunteer Now</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
