import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import RequestForm from './components/RequestForm'

const INITIAL_REQUESTS = [
  { id: 1, type: 'Medical', title: 'Need Insulin Supply', location: 'Mumbai CST Station', time: '10 mins ago', urgency: 'High', status: 'Pending', requester: 'Amit P.' },
  { id: 2, type: 'Supplies', title: 'Bottled Water & Blankets', location: 'Chennai Floods Relief Camp', time: '25 mins ago', urgency: 'Medium', status: 'Pending', requester: 'Sunita R.' },
  { id: 3, type: 'Rescue', title: 'Trapped on 2nd Floor', location: 'Assam Kaziranga Village', time: '2 mins ago', urgency: 'Critical', status: 'Pending', requester: 'Rahul D.' },
  { id: 4, type: 'Shelter', title: 'Family of 4 Needs Housing', location: 'Delhi Safdarjung Enclave', time: '1 hour ago', urgency: 'Medium', status: 'Resolved', requester: 'Priya S.' },
]

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return ['landing', 'dashboard', 'request'].includes(hash) ? hash : 'landing'
  })
  
  const navigate = useCallback((view) => {
    window.location.hash = view
    setCurrentView(view)
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      setCurrentView(['landing', 'dashboard', 'request'].includes(hash) ? hash : 'landing')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const [requests, setRequests] = useState(INITIAL_REQUESTS)

  return (
    <div className="app-container">
      <Navbar currentView={currentView} setCurrentView={navigate} />
      <main className="main-content">
        {currentView === 'landing' ? (
          <LandingPage 
            onGetStarted={() => navigate('dashboard')} 
            onNeedHelp={() => navigate('request')}
          />
        ) : currentView === 'request' ? (
          <RequestForm 
            onCancel={() => navigate('landing')} 
            onSubmit={(newReq) => {
              setRequests(prev => [newReq, ...prev])
              navigate('dashboard')
            }} 
          />
        ) : (
          <Dashboard requests={requests} setRequests={setRequests} />
        )}
      </main>
    </div>
  )
}

export default App
