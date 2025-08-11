"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Project } from "@/lib/projects"
import { SafeLink } from "@/components/safe-link"
import { isDeadHref } from "@/lib/site"

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  project: Project | null
}

const imgFallback = "/images/robotics-monochrome-placeholder.png"

export default function ProjectDrawer({ open = false, onOpenChange = () => { }, project }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-4 overflow-y-auto border-l border-white/10 bg-black/90 text-white sm:max-w-lg"
      >
        {project ? (
          <>
            <SheetHeader>
              <SheetTitle className="text-white text-left text-xl">{project.title}</SheetTitle>
              <SheetDescription className="text-left text-white/80">
                {project.tags?.map((t) => (
                  <span key={t} className="mr-2 rounded border border-white/30 px-2 py-0.5 text-xs text-white/80">
                    {t}
                  </span>
                ))}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-5">
              <div className="aspect-video w-full overflow-hidden rounded border border-white/10 bg-white/5">
                <img
                  src={project.image || imgFallback}
                  alt={project.title + " image"}
                  className="h-full w-full object-cover opacity-90 grayscale"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (target.src !== imgFallback) target.src = imgFallback
                  }}
                />
              </div>
            </div>
            <div className="mt-6 space-y-6">
              <section>
                <h4 className="text-sm uppercase tracking-widest text-white/70">Problem</h4>
                <p className="mt-2 text-white/90">{project.problem || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h4 className="text-sm uppercase tracking-widest text-white/70">Method</h4>
                <p className="mt-2 whitespace-pre-line text-white/90">{project.method || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h4 className="text-sm uppercase tracking-widest text-white/70">Result</h4>
                <p className="mt-2 text-white/90">{project.result || "—"}</p>
              </section>
            </div>
            <div className="mt-8 flex items-center justify-between gap-2">
              <div className="text-xs text-white/50">ID: {project.id}</div>
              <div className="flex items-center gap-2">
                <SafeLink href={`/projects/${project.id}`}>
                  <Button className="bg-white text-black hover:bg-zinc-200">View full details</Button>
                </SafeLink>
                {project.link && (
                  <SafeLink
                    href={project.link}
                    fallbackMessage={isDeadHref(project.link) ? "External project link not provided yet." : undefined}
                    target="_blank"
                  >
                    <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      External Link
                    </Button>
                  </SafeLink>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="pt-12 text-white/70">Select a project to view details.</div>
        )}
      </SheetContent>
    </Sheet>
  )
}
