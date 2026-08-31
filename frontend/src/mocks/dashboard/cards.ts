import { CheckCircle2, Clock3, FileText, GraduationCap, School, Users } from 'lucide-react'

export const studentsStatsCards = [
  {
    key: 'classAverage',
    label: 'Moyenne par classe',
    hint: 'classes',
    icon: GraduationCap,
    iconClassName: 'text-[#5f9674]',
    valueClassName: 'text-[#5f9674]',
  },
  {
    key: 'totalStudents',
    label: "Nombre d'élèves au total",
    hint: 'dans toutes vos classes',
    icon: Users,
    iconClassName: 'bg-[#eef2ee] text-[#385f49]',
    valueClassName: 'text-[#5f9674]',
  },
  {
    key: 'totalClasses',
    label: 'Nombre de classes',
    hint: 'classes suivies',
    icon: School,
    iconClassName: 'bg-[#edf5f1] text-[#5f9674]',
    valueClassName: 'text-[#5f9674]',
  },
] as const

export const copiesStatsCards = [
  {
    label: 'Copies corrigées',
    value: 10,
    hint: 'ce mois-ci',
    icon: CheckCircle2,
    iconClassName: 'bg-[#edf5f1] text-[#5f9674]',
    valueClassName: 'text-[#5f9674]',
  },
  {
    label: 'Copies corrigées en attente de validation',
    value: 4,
    hint: 'à valider',
    icon: Clock3,
    iconClassName: 'bg-[#fff0e8] text-[#9a4a1f]',
    valueClassName: 'text-[#9a4a1f]',
  },
  {
    label: 'Copies à corriger',
    value: 6,
    hint: 'non traitées',
    icon: Clock3,
    iconClassName: 'bg-[#f8e9e5] text-[#d3634d]',
    valueClassName: 'text-[#d3634d]',
  },
  {
    label: 'Copies importées au total',
    value: 20,
    hint: 'au total',
    icon: FileText,
    iconClassName: 'bg-[#eef2ee] text-[#385f49]',
    valueClassName: 'text-[#5f9674]',
  },
] as const

export const detectedCopyInformation = [
  { label: 'Nom', value: 'Bertrand' },
  { label: 'Prénom', value: 'Léa' },
  { label: 'Matière', value: 'Français' },
  { label: 'Classe', value: '6ème B' },
] as const
