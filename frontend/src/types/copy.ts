export type CopyStatus = 'Copie corrigée' | 'Copie à corriger' | 'Copie corrigée en attente de validation'

export type StudentCopy = {
  id: string
  fileName: string
  studentName: string
  className: string
  subject: string
  score: string | null
  importedAt: string
  status: CopyStatus
  imageSrc: string
}
