"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

type Props = {
  project: Project
  x: number
  y: number
  onOpenProject?: (project: Project) => void
  onKeepOpen?: () => void
  onRequestClose?: () => void
  className?: string
  autoHideMs?: number // Auto-hide delay in milliseconds
}

export default function OverlayProjectCard({
  project,
  x,
  y,
  onOpenProject,
  onKeepOpen,
  onRequestClose,
  className,
  autoHideMs = 1000,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep the card inside viewport
  const style: React.CSSProperties = {
    left: x,
    top: y,
    transform: "translate(12px, -50%)", // offset to the right of cursor/point
  }

  // Auto-hide timer effect
  useEffect(() => {
    // Start auto-hide timer when card appears
    if (autoHideMs > 0) {
      autoHideTimer.current = setTimeout(() => {
        onRequestClose?.()
      }, autoHideMs)
    }

    // Cleanup timer on unmount
    return () => {
      if (autoHideTimer.current) {
        clearTimeout(autoHideTimer.current)
        autoHideTimer.current = null
      }
    }
  }, [autoHideMs, onRequestClose])

  // Viewport positioning effect
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const overRight = rect.right > window.innerWidth - 12
    const overLeft = rect.left < 12
    const overTop = rect.top < 12
    const overBottom = rect.bottom > window.innerHeight - 12
    const next = el.style
    // Flip horizontally if overflowing right
    if (overRight) next.transform = "translate(-100% - 12px, -50%)"
    if (overLeft) next.transform = "translate(12px, -50%)"
    // Clamp vertical
    if (overTop) next.top = "12px"
    if (overBottom) next.top = `${window.innerHeight - rect.height - 12}px`
  }, [x, y, project.id])

  // Handle mouse interactions with timer
  const handleMouseEnter = () => {
    // Clear auto-hide timer when hovering over card
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current)
      autoHideTimer.current = null
    }
    onKeepOpen?.()
  }

  const handleMouseLeave = () => {
    // Restart auto-hide timer when leaving card
    if (autoHideMs > 0) {
      autoHideTimer.current = setTimeout(() => {
        onRequestClose?.()
      }, autoHideMs)
    }
    onRequestClose?.()
  }

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "pointer-events-auto absolute z-30 w-[320px] select-none",
        "animate-in fade-in-0 zoom-in-95 duration-150",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="dialog"
      aria-label={project.title + " quick view"}
    >
      <Card className="border-white/10 bg-black/80 backdrop-blur-md text-white shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{project.title}</CardTitle>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags?.slice(0, 4).map((t) => (
              <Badge key={t} variant="outline" className="border-white/25 text-white/85">
                {t}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <section>
            <h4 className="text-[11px] uppercase tracking-widest text-white/60">Problem</h4>
            <p className="mt-1 line-clamp-2 text-sm text-white/90">{project.problem || "—"}</p>
          </section>
          <section>
            <h4 className="text-[11px] uppercase tracking-widest text-white/60">Method</h4>
            <p className="mt-1 line-clamp-2 text-sm text-white/90">{project.method || "—"}</p>
          </section>
          <section>
            <h4 className="text-[11px] uppercase tracking-widest text-white/60">Result</h4>
            <p className="mt-1 line-clamp-2 text-sm text-white/90">{project.result || "—"}</p>
          </section>
          <div className="pt-1">
            <Button
              size="sm"
              className="w-full bg-white text-black hover:bg-zinc-200"
              onClick={() => onOpenProject?.(project)}
            >
              View project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
