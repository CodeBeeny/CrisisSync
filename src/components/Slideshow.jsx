import { useState, useEffect } from 'react'

const images = [
  '/slideshow/slide1.webp',
  '/slideshow/slide2.webp',
  '/slideshow/slide3.webp',
  '/slideshow/slide4.webp',
  '/slideshow/slide5.webp',
  '/slideshow/slide6.webp',
]

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000) // change every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '900px', height: '500px', margin: '0 auto', overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--border-glass)', boxShadow: '0 20px 60px rgba(0, 240, 255, 0.1)' }}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Community relief slide ${index + 1}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
      <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {images.map((_, idx) => (
          <div key={idx} style={{ 
            width: '10px', height: '10px', borderRadius: '50%', 
            background: idx === currentIndex ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.3)',
            transition: 'background 0.3s'
          }} />
        ))}
      </div>
    </div>
  )
}

export default Slideshow
