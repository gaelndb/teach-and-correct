import { Send } from 'lucide-react'

import { Button } from '@/components/ui/button'

const inputClassName = 'h-12 w-full rounded-lg border border-[#dfe7df] bg-[#edf5f1] px-4 text-sm font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15'

export function ContactForm() {
  return (
    <form className="rounded-2xl border border-[#dfe7df] bg-white p-8 shadow-sm sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-black text-[#385f49]">Prénom</span>
          <input placeholder="Gaëlle" className={inputClassName} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-black text-[#385f49]">Nom</span>
          <input placeholder="Dupont" className={inputClassName} />
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-black text-[#385f49]">Adresse e-mail</span>
        <input type="email" placeholder="g.dupont@ac-paris.fr" className={inputClassName} />
      </label>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-black text-[#385f49]">Établissement (facultatif)</span>
        <input placeholder="Collège Jean Jaurès — Paris 10e" className={inputClassName} />
      </label>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-black text-[#385f49]">Votre message</span>
        <textarea placeholder="Décrivez votre question ou votre besoin..." className="min-h-36 w-full resize-none rounded-lg border border-[#dfe7df] bg-[#edf5f1] px-4 py-3 text-sm font-semibold text-[#385f49] outline-none transition placeholder:text-[#9aae9e] focus:border-[#5f9674] focus:bg-white focus:ring-2 focus:ring-[#5f9674]/15" />
      </label>

      <Button type="button" className="mt-6 h-12 rounded-lg bg-[#d3634d] px-7 text-sm font-black text-white shadow-none hover:bg-[#c95540]">
        <Send className="h-4 w-4" />
        Envoyer le message
      </Button>
    </form>
  )
}
