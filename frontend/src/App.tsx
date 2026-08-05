import { useState } from 'react'

import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'
import type { SignupFormValues } from '@/types/auth'

type CurrentPage = 'landing' | 'dashboard'

type RegisteredTeacher = {
  firstName: string
  lastName: string
}

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('landing')
  const [registeredTeacher, setRegisteredTeacher] = useState<RegisteredTeacher | null>(null)

  function handleSignup(values: SignupFormValues) {
    setRegisteredTeacher({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
    })
    setCurrentPage('dashboard')
  }

  if (currentPage === 'dashboard') {
    return (
      <DashboardPage
        teacher={registeredTeacher}
        onBackToLanding={() => setCurrentPage('landing')}
      />
    )
  }

  return (
    <LandingPage
      onOpenDashboard={() => setCurrentPage('dashboard')}
      onSignup={handleSignup}
    />
  )
}

export default App
