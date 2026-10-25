import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { CopiesScreen } from '@/components/dashboard/copies/copies-screen'
import { ImportCopiesScreen } from '@/components/dashboard/import/import-copies-screen'
import { StudentScreen } from '@/components/dashboard/students/student-screen'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { AboutPage } from '@/pages/about-page'
import { ContactPage } from '@/pages/contact-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'
import { LoginPage } from '@/pages/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { SignupPage } from '@/pages/signup-page'

export function AppRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const { clearAuthError } = useAuth()

  function openLanding() {
    clearAuthError()
    navigate('/')
  }

  function openLogin() {
    clearAuthError()
    navigate('/login', { state: { from: `${location.pathname}${location.search}${location.hash}` } })
  }

  function openSignup() {
    clearAuthError()
    navigate('/signup', { state: { from: `${location.pathname}${location.search}${location.hash}` } })
  }

  function returnFromAuth() {
    clearAuthError()

    const navigationState = location.state as { from?: unknown } | null
    const previousPath = typeof navigationState?.from === 'string' ? navigationState.from : '/'
    navigate(previousPath)
  }

  function openContact() {
    clearAuthError()
    navigate('/contact')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    })
  }

  function openLandingSection(sectionId: string) {
    clearAuthError()
    navigate('/')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <LandingPage
            onClearAuthError={clearAuthError}
            onOpenContactPage={openContact}
            onOpenLoginPage={openLogin}
            onOpenSignupPage={openSignup}
            onOpenLandingSection={openLandingSection}
          />
        )}
      />
      <Route
        path="/a-propos"
        element={(
          <AboutPage
            onOpenContact={openContact}
            onOpenLanding={openLanding}
            onOpenLandingSection={openLandingSection}
            onOpenLogin={openLogin}
            onOpenSignup={openSignup}
          />
        )}
      />
      <Route
        path="/contact"
        element={(
          <ContactPage
            onOpenContact={openContact}
            onOpenLanding={openLanding}
            onOpenLandingSection={openLandingSection}
            onOpenLogin={openLogin}
            onOpenSignup={openSignup}
          />
        )}
      />
      <Route
        path="/login"
        element={(
          <ProtectedRoute type="public">
            <LoginPage
              onBackToLanding={returnFromAuth}
              onOpenSignup={openSignup}
            />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/signup"
        element={(
          <ProtectedRoute type="public">
            <SignupPage
              onBackToLanding={returnFromAuth}
              onOpenLogin={openLogin}
            />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/dashboard"
        element={(
          <ProtectedRoute type="private">
            <DashboardPage />
          </ProtectedRoute>
        )}
      >
        <Route index element={<Navigate to="students" replace />} />
        <Route path="students" element={<StudentScreen />} />
        <Route path="copies" element={<CopiesScreen onOpenImport={() => navigate('/dashboard/import')} />} />
        <Route path="import" element={<ImportCopiesScreen />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
