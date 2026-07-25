import { Camera, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ScanButton() {
  return (
    <div className="relative">
      <span className="absolute inset-0 rounded-full bg-accent/20 blur-md animate-pulse" />
      <Button className="relative animate-gentleFloat bg-gradient-to-r from-accent to-violet hover:from-orange-600 hover:to-violet">
        <Camera className="h-5 w-5" />
        Scanner une copie
        <Sparkles className="h-4 w-4" />
      </Button>
    </div>
  )
}
