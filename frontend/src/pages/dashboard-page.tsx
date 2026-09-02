import { HelpCircle, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

import { CopiesScreen } from '@/components/dashboard/copies/copies-screen'
import { ImportCopiesScreen } from '@/components/dashboard/import/import-copies-screen'
import { ScanButton } from '@/components/dashboard/shared/scan-button'
import { StudentScreen } from '@/components/dashboard/students/student-screen'
import { Button } from '@/components/ui/button'

type DashboardPageProps = {
  teacher: {
    firstName: string
    lastName: string
  } | null
  onLogout: () => void
}

type DashboardScreen = 'students' | 'copies' | 'import'

export function DashboardPage({ teacher, onLogout }: DashboardPageProps) {
  const [currentScreen, setCurrentScreen] = useState<DashboardScreen>('students')

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#385f49]">
      <header className="sticky top-0 z-40 border-b border-[#2f4e3d] bg-[#385f49] text-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <button type="button" onClick={() => setCurrentScreen('students')} className="text-lg font-black transition hover:text-white/80">
            TeachAndCorrect
          </button>

          <nav className="hidden items-center gap-2 text-sm font-black text-white/55 md:flex">
            <a href="#accueil" className="rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white">Accueil</a>
            <button type="button" onClick={() => setCurrentScreen('students')} className={`rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white ${currentScreen === 'students' ? 'bg-white/15 text-white' : ''}`}>Élèves</button>
            <button type="button" onClick={() => setCurrentScreen('copies')} className={`rounded-lg px-5 py-3 transition hover:bg-white/10 hover:text-white ${currentScreen === 'copies' || currentScreen === 'import' ? 'bg-white/15 text-white' : ''}`}>Copies</button>
          </nav>

          <div className="flex items-center gap-2">
            <ScanButton onClick={() => setCurrentScreen('import')} />
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

      {currentScreen === 'import' ? (
        <ImportCopiesScreen onStartImport={() => setCurrentScreen('import')} />
      ) : currentScreen === 'copies' ? (
        <CopiesScreen onOpenImport={() => setCurrentScreen('import')} />
      ) : (
        <StudentScreen />
      )}
    </main>
  )
}
