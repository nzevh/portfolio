import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-black px-6 text-white">
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-white/60">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-white/70">The page you’re looking for doesn’t exist or has been moved.</p>
        <div className="mt-6">
          <Link href="/">
            <Button className="bg-white text-black hover:bg-zinc-200">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
