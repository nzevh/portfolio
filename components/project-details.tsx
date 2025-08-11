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

type Props = {
  project: Project
}

export default function ProjectDetails({ project }: Props) {
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
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 text-white">
      {/* Title + Tags */}
      <div className="mb-6">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags?.map((t) => (
            <Badge key={t} variant="outline" className="border-white/30 bg-transparent text-white/85">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* 3D + Info */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="model" className="w-full">
            <TabsList className="bg-white/5">
              <TabsTrigger value="model">3D Model</TabsTrigger>
              <TabsTrigger value="gallery">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="model" className="mt-4">
              <ModelViewer src={models[Math.min(modelIndex, models.length - 1)]} alt={project.title + " 3D model"} />
              {models.length > 1 ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {models.map((m, idx) => (
                    <Button
                      key={m + idx}
                      variant={idx === modelIndex ? "default" : "outline"}
                      className={
                        idx === modelIndex
                          ? "bg-white text-black hover:bg-zinc-200"
                          : "border-white/20 bg-transparent text-white"
                      }
                      onClick={() => setModelIndex(idx)}
                    >
                      Model {idx + 1}
                    </Button>
                  ))}
                </div>
              ) : null}
            </TabsContent>
            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                      className="h-36 w-full object-cover opacity-95 grayscale transition group-hover:opacity-100"
                    />
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="space-y-4">
              <section>
                <h2 className="text-sm uppercase tracking-widest text-white/70">Problem</h2>
                <p className="mt-3 text-white/90">{project.problem || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h2 className="text-sm uppercase tracking-widest text-white/70">Method</h2>
                <p className="mt-3 whitespace-pre-line text-white/90">{project.method || "—"}</p>
              </section>
              <Separator className="bg-white/10" />
              <section>
                <h2 className="text-sm uppercase tracking-widest text-white/70">Result</h2>
                <p className="mt-3 text-white/90">{project.result || "—"}</p>
              </section>
            </div>

            <div className="space-y-2">
              {project.link ? (
                <Link href={project.link} target="_blank" className="block">
                  <Button className="w-full bg-white text-black hover:bg-zinc-200">
                    <ExternalLink className="mr-2 h-4 w-4" />
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
