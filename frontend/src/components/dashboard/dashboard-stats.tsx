import { CheckCircle2, FileText, GraduationCap, Users } from 'lucide-react'

import { Card } from '@/components/ui/card'
import type { Student } from '@/types/student'

type DashboardStatsProps = {
  students: Student[]
}

export function DashboardStats({ students }: DashboardStatsProps) {
  const classAverage = students.reduce((total, student) => total + student.average, 0) / students.length
  const correctionsToReview = students.filter((student) => student.status === 'À vérifier').length

  const stats = [
    { label: 'Élèves suivis', value: students.length, icon: Users, color: 'text-primary', bg: 'bg-blue-100' },
    { label: 'Copies corrigées', value: 42, icon: FileText, color: 'text-violet', bg: 'bg-violet-100' },
    { label: 'Moyenne classe', value: `${classAverage.toFixed(1)}/20`, icon: GraduationCap, color: 'text-success', bg: 'bg-green-100' },
    { label: 'À vérifier', value: correctionsToReview, icon: CheckCircle2, color: 'text-accent', bg: 'bg-orange-100' },
  ]

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-black text-foreground">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </section>
  )
}
