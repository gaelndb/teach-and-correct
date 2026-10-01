import { HelpCircle, LogOut, Settings } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { ScanButton } from '@/components/dashboard/shared/scan-button'
import { Button } from '@/components/ui/button'

type DashboardPageProps = {
  teacher: {
    firstName: string
    lastName: string
  } | null
  onLogout: () => void
}

export function DashboardPage({ teacher, onLogout }: DashboardPageProps) {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#385f49]">
      <header className="sticky top-0 z-40 border-b border-[#2f4e3d] bg-[#385f49] text-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <button type="button" onClick={() => navigate('/dashboard/students')} className="text-lg font-black transition hover:text-white/80">
            TeachAndCorrect
          </button>

          <nav className="hidden items-center gap-2 text-sm font-black text-white/55 md:flex">
            <NavLink to="/dashboard/students" className={({ isActive }) => `rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white ${isActive ? 'bg-white/15 text-white' : ''}`}>
              Accueil
            </NavLink>
            <NavLink to="/dashboard/students" className={({ isActive }) => `rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white ${isActive ? 'bg-white/15 text-white' : ''}`}>
              Élèves
            </NavLink>
            <NavLink to="/dashboard/copies" className={({ isActive }) => `rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white ${isActive ? 'bg-white/15 text-white' : ''}`}>
              Copies
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <ScanButton onClick={() => navigate('/dashboard/import')} />
            <Button className="hidden h-10 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white shadow-none hover:bg-white/15 lg:inline-flex">
              <HelpCircle className="h-4 w-4" />
              Aide
            </Button>
            <Button onClick={onLogout} className="hidden h-10 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white shadow-none hover:bg-white/15 lg:inline-flex">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
            <Button className="hidden h-10 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white shadow-none hover:bg-white/15 xl:inline-flex">
              <Settings className="h-4 w-4" />
              {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Professeur'}
            </Button>
          </div>
        </div>
      </header>

      <Outlet />
    </main>
  )
}
