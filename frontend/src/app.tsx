import { BrowserRouter, useNavigate } from 'react-router-dom'

import { AuthProvider } from '@/contexts/AuthContext'
import { AppRoutes } from '@/routes/router'

function AppContent() {
  const navigate = useNavigate()

  function openLandingDemo() {
    navigate('/')

    requestAnimationFrame(() => {
      document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return <AppRoutes onOpenDemo={openLandingDemo} />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
