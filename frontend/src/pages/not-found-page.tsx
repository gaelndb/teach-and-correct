import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fbfaf6] px-6 text-center text-[#385f49]">
      <p className="text-xs font-black uppercase tracking-[0.32em] text-[#5f9674]">404 error</p>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-5xl">Page not found</h1>
      <p className="mt-5 max-w-md text-base font-semibold leading-7 text-[#7d987f]">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild className="mt-8 h-11 rounded-lg bg-[#d3634d] px-6 text-sm font-black text-white shadow-none hover:bg-[#c95540]">
        <Link to="/">Back to home</Link>
      </Button>
    </main>
  )
}
