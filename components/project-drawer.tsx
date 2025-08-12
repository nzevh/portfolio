"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Project } from "@/lib/projects"
import { SafeLink } from "@/components/safe-link"
import { isDeadHref } from "@/lib/site"
import { useIsMobile } from "@/hooks/use-mobile"

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  project: Project | null
}

const imgFallback = "/images/robotics-monochrome-placeholder.png"

export default function ProjectDrawer({ open = false, onOpenChange = () => { }, project }: Props) {
  const isMobile = useIsMobile()
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={`w-full overflow-y-auto border-l border-white/10 bg-black/90 text-white ${isMobile ? 'p-3' : 'p-4'} sm:max-w-lg`}
      >
        {project ? (
          <>
            <SheetHeader>
              <SheetTitle className={`text-white text-left ${isMobile ? 'text-lg' : 'text-xl'}`}>{project.title}</SheetTitle>
              <SheetDescription className="text-left text-white/80">
                {project.tags?.slice(0, isMobile ? 4 : 6).map((t) => (
                  <span key={t} className="mr-2 mb-1 inline-block rounded border border-white/30 px-2 py-0.5 text-xs text-white/80">
                    {t}
                  </span>
                ))}
              </SheetDescription>
            </SheetHeader>
            <div className={isMobile ? "mt-4" : "mt-5"}>
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
            <div className={`${isMobile ? 'mt-4 space-y-4' : 'mt-6 space-y-6'}`}>
              <section>
                <h4 className={`uppercase tracking-widest text-white/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>Problem</h4>
                <p className={`mt-2 text-white/90 ${isMobile ? 'text-sm' : 'text-base'}`}>{project.problem || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h4 className={`uppercase tracking-widest text-white/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>Method</h4>
                <p className={`mt-2 whitespace-pre-line text-white/90 ${isMobile ? 'text-sm' : 'text-base'}`}>{project.method || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h4 className={`uppercase tracking-widest text-white/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>Result</h4>
                <p className={`mt-2 text-white/90 ${isMobile ? 'text-sm' : 'text-base'}`}>{project.result || "—"}</p>
              </section>
            </div>
            <div className={`${isMobile ? 'mt-6' : 'mt-8'} ${isMobile ? 'flex flex-col gap-3' : 'flex items-center justify-between gap-2'}`}>
              <div className={`text-xs text-white/50 ${isMobile ? 'order-2' : ''}`}>ID: {project.id}</div>
              <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-2'}`}>
                <SafeLink href={`/projects/${project.id}`}>
                  <Button className={`bg-white text-black hover:bg-zinc-200 ${isMobile ? 'w-full text-sm' : ''}`}>View full details</Button>
                </SafeLink>
                {project.link && (
                  <SafeLink
                    href={project.link}
                    fallbackMessage={isDeadHref(project.link) ? "External project link not provided yet." : undefined}
                    target="_blank"
                  >
                    <Button variant="outline" className={`border-white/20 bg-white/5 text-white hover:bg-white/10 ${isMobile ? 'w-full text-sm' : ''}`}>
                      <ExternalLink className={`${isMobile ? 'mr-1' : 'mr-2'} h-4 w-4`} />
                      {isMobile ? 'Link' : 'External Link'}
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
