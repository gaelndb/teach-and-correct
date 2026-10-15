import { Navigate } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthContext'

type ProtectedRouteProps = {
  children: JSX.Element
  type: 'private' | 'public'
}

export function ProtectedRoute({ children, type }: ProtectedRouteProps) {
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaf6]" role="status" aria-label="Chargement de l'authentification">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dfe7df] border-t-[#5f9674]" />
      </div>
    )
  }

  if (type === 'private' && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (type === 'public' && isAuthenticated) {
    return <Navigate to="/dashboard/students" replace />
  }

  return children
}
