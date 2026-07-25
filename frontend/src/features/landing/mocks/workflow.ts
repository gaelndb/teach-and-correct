import { Camera, FileCheck2, Sparkles } from 'lucide-react'

export const workflowSteps = [
  {
    icon: Camera,
    title: 'Je prends une photo',
    description:
      "Photographiez la copie d'élève depuis votre téléphone ou importez une image déjà disponible.",
  },
  {
    icon: Sparkles,
    title: 'L’IA lit la copie',
    description:
      "Le LLM analyse l'écriture, comprend les réponses et prépare une correction structurée.",
  },
  {
    icon: FileCheck2,
    title: 'Je reçois la correction',
    description:
      'Obtenez une note détaillée, des remarques pédagogiques et des pistes de progression.',
  },
] as const
