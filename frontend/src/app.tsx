import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@/contexts/AuthContext'
import { AppRoutes } from '@/routes/router'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
