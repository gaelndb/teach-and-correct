import { useState } from 'react'

import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'

type CurrentPage = 'landing' | 'dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('landing')

  if (currentPage === 'dashboard') {
    return <DashboardPage onBackToLanding={() => setCurrentPage('landing')} />
  }

  return <LandingPage onOpenDashboard={() => setCurrentPage('dashboard')} />
}

export default App
