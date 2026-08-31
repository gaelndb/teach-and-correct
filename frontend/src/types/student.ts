export type Grade = {
  subject: string
  score: number
  maxScore: number
  date: string
  comment: string
}

export type Student = {
  id: string
  firstName: string
  lastName: string
  className: string
  avatarColor: string
  average: number
  lastCorrection: string
  status: 'Copie corrigée' | 'Copie à corriger' | 'Copie corrigée en attente de validation'
  grades: Grade[]
}
