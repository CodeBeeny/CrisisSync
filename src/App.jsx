import { useState } from 'react'
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
  const [currentView, setCurrentView] = useState('landing') // 'landing', 'dashboard', 'request'
  const [requests, setRequests] = useState(INITIAL_REQUESTS)

  return (
    <div className="app-container">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {currentView === 'landing' ? (
          <LandingPage 
            onGetStarted={() => setCurrentView('dashboard')} 
            onNeedHelp={() => setCurrentView('request')}
          />
        ) : currentView === 'request' ? (
          <RequestForm onCancel={() => setCurrentView('landing')} onSubmit={() => setCurrentView('dashboard')} />
        ) : (
          <Dashboard requests={requests} setRequests={setRequests} />
        )}
      </main>
    </div>
  )
}

export default App
