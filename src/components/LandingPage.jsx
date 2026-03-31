import { ArrowRight, Globe, Zap, HeartHandshake } from 'lucide-react'
import Slideshow from './Slideshow'

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div className={`glass-panel animate-fade-in ${delay}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, minWidth: '250px' }}>
    <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '12px', borderRadius: '12px', width: 'max-content' }}>
      <Icon color="var(--accent-cyan)" size={28} />
    </div>
    <h3 style={{ fontSize: '1.25rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{description}</p>
  </div>
)

const LandingPage = ({ onGetStarted, onNeedHelp }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      
      {/* Hero Section */}
      <section className="animate-fade-in" style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        textAlign: 'center', marginTop: '60px', gap: '24px' 
      }}>
        <div style={{ 
          background: 'rgba(255, 59, 48, 0.1)', color: 'var(--accent-red)', 
          padding: '6px 16px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600'
        }}>
          Emergency Relief Network
        </div>
        
        <h1 style={{ fontSize: '4rem', maxWidth: '800px', letterSpacing: '-0.02em' }}>
          Coordinate <span className="text-gradient">Disaster Relief</span> in Real-Time
        </h1>
        
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: '1.6' }}>
          Connect victims with local volunteers instantly. AidBridge decentralizes emergency 
          response to distribute food, medical supplies, and shelter when seconds matter.
        </p>
        
        <div className="hero-buttons">
          <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }} onClick={onNeedHelp}>
            I Need Help
          </button>
          <button className="btn btn-cyan" style={{ padding: '16px 32px', fontSize: '1.125rem' }} onClick={onGetStarted}>
            I Can Help <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '40px' }}>
        <FeatureCard 
          icon={Zap} 
          title="Real-Time Alerts" 
          description="Instant notifications of localized needs based on your geolocation."
          delay="delay-100"
        />
        <FeatureCard 
          icon={Globe} 
          title="Decentralized Network" 
          description="Operates without a central command, connecting peers directly for faster aid."
          delay="delay-200"
        />
        <FeatureCard 
          icon={HeartHandshake} 
          title="Verified Volunteers" 
          description="Trust system ensures that help is delivered safely by verified community members."
          delay="delay-300"
        />
      </section>

      {/* Motivational Section */}
      <section className="animate-fade-in delay-200" style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        textAlign: 'center', marginTop: '80px', padding: '60px 24px',
        background: 'linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.05))',
        borderRadius: '24px', border: '1px solid var(--border-glass)'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Community Strong</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', marginBottom: '40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
          When disaster strikes, we rise together. Join thousands of local heroes already providing aid, shelter, and comfort to those in need. Whether you need help or can offer it, you are not alone.
        </p>
        <Slideshow />
      </section>
      
    </div>
  )
}

export default LandingPage
