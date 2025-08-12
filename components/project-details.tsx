"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ModelViewer from "@/components/three/model-viewer"
import type { Project } from "@/lib/projects"
import { useIsMobile } from "@/hooks/use-mobile"

type Props = {
  project: Project
}

export default function ProjectDetails({ project }: Props) {
  const isMobile = useIsMobile()
  const models = useMemo(
    () => (project.models && project.models.length ? project.models : ["/assets/3d/duck.glb"]),
    [project.models],
  )
  const images = useMemo(() => {
    const base = project.image ? [project.image] : []
    return project.gallery && project.gallery.length
      ? project.gallery
      : base.length
        ? base
        : ["/images/robotics-control-placeholder.png"]
  }, [project.image, project.gallery])

  const [modelIndex, setModelIndex] = useState(0)
  const [lightbox, setLightbox] = useState<{ open: boolean; src?: string }>({ open: false })

  return (
    <div className={`mx-auto w-full max-w-6xl pb-16 text-white ${isMobile ? 'px-3' : 'px-4 sm:px-6 lg:px-8'}`}>
      {/* Title + Tags */}
      <div className={isMobile ? "mb-4" : "mb-6"}>
        <h1 className={`text-balance font-semibold tracking-tight ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>{project.title}</h1>
        <div className={`flex flex-wrap gap-2 ${isMobile ? 'mt-2' : 'mt-3'}`}>
          {project.tags?.slice(0, isMobile ? 6 : undefined).map((t) => (
            <Badge key={t} variant="outline" className={`border-white/30 bg-transparent text-white/85 ${isMobile ? 'text-xs' : ''}`}>
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* 3D + Info */}
      <div className={`grid ${isMobile ? 'gap-6' : 'gap-8 lg:grid-cols-3'}`}>
        <div className={isMobile ? '' : 'lg:col-span-2'}>
          <Tabs defaultValue="model" className="w-full">
            <TabsList className={`bg-white/5 ${isMobile ? 'w-full' : ''}`}>
              <TabsTrigger value="model" className={isMobile ? 'flex-1 text-sm' : ''}>3D Model</TabsTrigger>
              <TabsTrigger value="gallery" className={isMobile ? 'flex-1 text-sm' : ''}>Images</TabsTrigger>
            </TabsList>
            <TabsContent value="model" className={isMobile ? "mt-3" : "mt-4"}>
              <ModelViewer src={models[Math.min(modelIndex, models.length - 1)]} alt={project.title + " 3D model"} />
              {models.length > 1 ? (
                <div className={`flex flex-wrap items-center gap-2 ${isMobile ? 'mt-2' : 'mt-3'}`}>
                  {models.map((m, idx) => (
                    <Button
                      key={m + idx}
                      variant={idx === modelIndex ? "default" : "outline"}
                      size={isMobile ? "sm" : "default"}
                      className={
                        idx === modelIndex
                          ? `bg-white text-black hover:bg-zinc-200 ${isMobile ? 'text-xs' : ''}`
                          : `border-white/20 bg-transparent text-white ${isMobile ? 'text-xs' : ''}`
                      }
                      onClick={() => setModelIndex(idx)}
                    >
                      Model {idx + 1}
                    </Button>
                  ))}
                </div>
              ) : null}
            </TabsContent>
            <TabsContent value="gallery" className={isMobile ? "mt-3" : "mt-4"}>
              <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    className="group relative overflow-hidden rounded border border-white/10 bg-white/5"
                    onClick={() => setLightbox({ open: true, src })}
                    aria-label={"Open image " + (i + 1)}
                  >
                    <img
                      src={src || "/placeholder.svg"}
                      alt={(project.title || "Project") + " image " + (i + 1)}
                      className={`w-full object-cover opacity-95 grayscale transition group-hover:opacity-100 ${isMobile ? 'h-28' : 'h-36'}`}
                    />
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <aside className={isMobile ? '' : 'lg:col-span-1'}>
          <div className={`${isMobile ? 'mt-6' : 'sticky top-6'} rounded-xl border border-white/10 bg-white/5 ${isMobile ? 'p-3 space-y-4' : 'p-4 space-y-6'}`}>
            <div className={isMobile ? "space-y-3" : "space-y-4"}>
              <section>
                <h2 className={`uppercase tracking-widest text-white/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>Problem</h2>
                <p className={`text-white/90 ${isMobile ? 'mt-2 text-sm' : 'mt-3'}`}>{project.problem || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h2 className={`uppercase tracking-widest text-white/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>Method</h2>
                <p className={`whitespace-pre-line text-white/90 ${isMobile ? 'mt-2 text-sm' : 'mt-3'}`}>{project.method || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h2 className={`uppercase tracking-widest text-white/70 ${isMobile ? 'text-xs' : 'text-sm'}`}>Result</h2>
                <p className={`text-white/90 ${isMobile ? 'mt-2 text-sm' : 'mt-3'}`}>{project.result || "—"}</p>
              </section>
            </div>

            <div className="space-y-2">
              {project.link ? (
                <Link href={project.link} target="_blank" className="block">
                  <Button className={`w-full bg-white text-black hover:bg-zinc-200 ${isMobile ? 'text-sm' : ''}`}>
                    <ExternalLink className={`${isMobile ? 'mr-1' : 'mr-2'} h-4 w-4`} />
                    External Link
                  </Button>
                </Link>
              ) : null}
              <div className="text-xs text-white/50">ID: {project.id}</div>
            </div>
          </div>
        </aside>
      </div>

      {/* Lightbox */}
      <Dialog open={lightbox.open} onOpenChange={(o) => setLightbox({ open: o, src: o ? lightbox.src : undefined })}>
        <DialogContent className="max-w-5xl border-white/10 bg-black/90 p-0">
          {lightbox.src ? (
            <img
              src={lightbox.src || "/images/placeholder.svg"}
              alt={project.title + " full image"}
              className="h-auto w-full rounded-md object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
