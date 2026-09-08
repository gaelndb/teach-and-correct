import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { CopiesScreen } from '@/components/dashboard/copies/copies-screen'
import { ImportCopiesScreen } from '@/components/dashboard/import/import-copies-screen'
import { StudentScreen } from '@/components/dashboard/students/student-screen'
import { ContactPage } from '@/pages/contact-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { LandingPage } from '@/pages/landing-page'
import { LoginPage } from '@/pages/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { SignupPage } from '@/pages/signup-page'
import type { AuthResponse, LoginFormValues, SignupFormValues } from '@/types/auth'

type RegisteredTeacher = Pick<AuthResponse, 'firstName' | 'lastName'>

type AppRoutesProps = {
  authError: string | null
  isAuthLoading: boolean
  teacher: RegisteredTeacher | null
  onClearAuthError: () => void
  onLogin: (values: LoginFormValues) => Promise<boolean>
  onLogout: () => void
  onSignup: (values: SignupFormValues) => Promise<boolean>
  onOpenDemo: () => void
}

export function AppRoutes({
  authError,
  isAuthLoading,
  teacher,
  onClearAuthError,
  onLogin,
  onLogout,
  onSignup,
  onOpenDemo,
}: AppRoutesProps) {
  const navigate = useNavigate()

  function openLanding() {
    onClearAuthError()
    navigate('/')
  }

  function openLogin() {
    onClearAuthError()
    navigate('/login')
  }

  function openSignup() {
    onClearAuthError()
    navigate('/signup')
  }

  function openContact() {
    onClearAuthError()
    navigate('/contact')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <LandingPage
            onClearAuthError={onClearAuthError}
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
          <LoginPage
            authError={authError}
            isAuthLoading={isAuthLoading}
            onBackToLanding={openLanding}
            onOpenSignup={openSignup}
            onLogin={onLogin}
          />
        )}
      />
      <Route
        path="/signup"
        element={(
          <SignupPage
            authError={authError}
            isAuthLoading={isAuthLoading}
            onBackToLanding={openLanding}
            onOpenLogin={openLogin}
            onSignup={onSignup}
          />
        )}
      />
      <Route path="/dashboard" element={<DashboardPage teacher={teacher} onLogout={onLogout} />}>
        <Route index element={<Navigate to="students" replace />} />
        <Route path="students" element={<StudentScreen />} />
        <Route path="copies" element={<CopiesScreen onOpenImport={() => navigate('/dashboard/import')} />} />
        <Route path="import" element={<ImportCopiesScreen />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

