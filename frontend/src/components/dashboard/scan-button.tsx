import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ScanButton() {
  return (
    <Button className="h-10 rounded-lg bg-[#d3634d] px-5 text-sm font-black text-white shadow-none hover:bg-[#c95540]">
      <Plus className="h-4 w-4" />
      Nouvelle copie
    </Button>
  )
}
