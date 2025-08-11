import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">Resume</h1>
        <p className="mt-2 text-white/70">Favour Adimora — Robotics Control Engineer</p>
        <div className="mt-4">
          <Link href="/docs/resume.pdf" target="_blank" download="favour-resume.pdf">
            <Button className="bg-white text-black hover:bg-zinc-200">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2">
          <div className="aspect-[8.5/11] w-full overflow-hidden rounded-lg border border-white/10 bg-black">
            {/* PDF preview */}
            <object
              data="/docs/resume.pdf#view=fitH"
              type="application/pdf"
              className="h-full w-full"
            >
              <iframe
                src="/docs/resume.pdf#view=fitH"
                className="h-full w-full border-0"
                title="Resume PDF Preview"
              >
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-white/70">
                  <div>
                    <div className="mb-4 text-6xl">📄</div>
                    <p className="mb-2">Resume Preview</p>
                    <p className="text-sm text-white/50">
                      PDF preview unavailable in this browser. Use the Download button above to view the full resume.
                    </p>
                  </div>
                </div>
              </iframe>
            </object>
          </div>
        </div>

        {/* Optional: Quick summary if you want content even without a PDF */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/70">Core Focus</h2>
            <p className="mt-3 text-white/90">
              Model Predictive Control, geometric control on SO(3), impedance control, visual servoing, SLAM-coupled
              planning, embedded real-time systems.
            </p>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/70">Stack</h2>
            <p className="mt-3 text-white/90">C++/Eigen, Python, ROS, optimization, estimation, mechatronics.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
