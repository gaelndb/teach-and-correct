import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { CopiesScreen } from '@/components/dashboard/copies/copies-screen'
import { ImportCopiesScreen } from '@/components/dashboard/import/import-copies-screen'
import { StudentScreen } from '@/components/dashboard/students/student-screen'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { ContactPage } from '@/pages/contact-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'
import { LoginPage } from '@/pages/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { SignupPage } from '@/pages/signup-page'

type AppRoutesProps = {
  onOpenDemo: () => void
}

export function AppRoutes({ onOpenDemo }: AppRoutesProps) {
  const navigate = useNavigate()
  const { clearAuthError } = useAuth()

  function openLanding() {
    clearAuthError()
    navigate('/')
  }

  function openLogin() {
    clearAuthError()
    navigate('/login')
  }

  function openSignup() {
    clearAuthError()
    navigate('/signup')
  }

  function openContact() {
    clearAuthError()
    navigate('/contact')
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
          />
        )}
      />
      <Route
        path="/contact"
        element={(
          <ContactPage
            onOpenContact={openContact}
            onOpenDemo={onOpenDemo}
            onOpenLanding={openLanding}
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
              onBackToLanding={openLanding}
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
              onBackToLanding={openLanding}
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
