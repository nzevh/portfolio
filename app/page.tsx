"use client"

import { useMemo, useState } from "react"
import { Github, ExternalLink, Settings2, Linkedin, Twitter, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-mobile"
import { Toaster } from "@/components/ui/toaster"

import PortfolioScene from "@/components/three/portfolio-scene"
import ProjectDrawer from "@/components/project-drawer"
import { type Project, sampleProjects } from "@/lib/projects"
import { siteConfig } from "@/lib/site"
import { SafeLink } from "@/components/safe-link"
import ResumeDownload from "@/components/resume-download"

export default function Page() {
  const [projects] = useState<Project[]>(sampleProjects)
  const [selected, setSelected] = useState<Project | null>(null)
  const isMobile = useMediaQuery()
  const router = useRouter()

  const nodes = useMemo(() => projects.map((p, idx) => ({ ...p, idx })), [projects])

  const imgFallback = "/images/robotics-control-placeholder.png"

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.05),transparent_25%)]" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 py-4 sm:px-6 lg:px-8">
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-white/20 shadow-sm">
              <AvatarImage src="/images/profile-avatar.jpg" alt="Favour Adimora" />
              <AvatarFallback className="bg-white/5 text-white/80 text-xs sm:text-sm font-medium">FA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Favour Adimora</h1>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-white/60">Robotics Control Engineer</div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div className="pointer-events-auto flex items-center sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/15 bg-white/5 text-white hover:bg-white/10 px-2">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-white/10 bg-black/90 text-white backdrop-blur-md">
                <DropdownMenuItem asChild>
                  <SafeLink href="/about" className="w-full text-white/80 hover:text-white cursor-pointer">
                    About
                  </SafeLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SafeLink href="/contact" className="w-full text-white/80 hover:text-white cursor-pointer">
                    Contact
                  </SafeLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SafeLink href="/resume" className="w-full text-white/80 hover:text-white cursor-pointer">
                    Resume
                  </SafeLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild>
                  <SafeLink href={siteConfig.social.github} target="_blank" className="w-full text-white/80 hover:text-white cursor-pointer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </SafeLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SafeLink href={siteConfig.social.linkedin} target="_blank" className="w-full text-white/80 hover:text-white cursor-pointer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </SafeLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SafeLink href={siteConfig.social.twitter} target="_blank" className="w-full text-white/80 hover:text-white cursor-pointer">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </SafeLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="p-0">
                  <ResumeDownload className="w-full bg-white text-black hover:bg-zinc-200 text-sm justify-start h-8" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop menu */}
          <div className="pointer-events-auto hidden items-center gap-4 lg:gap-6 sm:flex">
            <nav className="flex items-center gap-4 lg:gap-6 text-sm">
              <SafeLink href="/about" className="text-white/80 hover:text-white">
                About
              </SafeLink>
              <SafeLink href="/contact" className="text-white/80 hover:text-white">
                Contact
              </SafeLink>
              <SafeLink href="/resume" className="text-white/80 hover:text-white">
                Resume
              </SafeLink>
            </nav>
            <SafeLink href={siteConfig.social.github} target="_blank" className="inline-flex">
              <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </SafeLink>
            <ResumeDownload />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative">
          <div className="h-[75vh] w-full sm:h-[80vh] px-8">
            <PortfolioScene projects={nodes} onSelect={(p) => setSelected(p)} maxVisible={isMobile ? 6 : 12} />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center px-4">
            <div className="mt-24 w-full max-w-4xl text-center">
              <h2 className="pointer-events-auto mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
                <Settings2 className="h-3.5 w-3.5" />
                Adaptive Control • Perception • Mechatronics
              </h2>
              <h3 className="mx-auto mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Designing reliable autonomy through control theory and real robots
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-white/70 sm:text-base">
                Explore projects by interacting with the 3D nodes. Click a node to open the case study with Problem,
                Method, and Result.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="bg-white/5">
              <TabsTrigger value="grid" className="data-[state=inactive]:text-white">Projects Grid</TabsTrigger>
              <TabsTrigger value="list" className="data-[state=inactive]:text-white">Compact List</TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <Card
                    key={p.id}
                    className="group cursor-pointer border-white/10 bg-white/5 transition hover:bg-white/10"
                    onClick={() => router.push(`/projects/${p.id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-lg text-white">{p.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {p.tags?.slice(0, 3)?.map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="mr-1 border-white/30 bg-transparent text-white/85"
                          >
                            {t}
                          </Badge>
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3 aspect-video w-full overflow-hidden rounded-md border border-white/10 bg-white/5">
                        <img
                          src={p.image || imgFallback}
                          alt={p.title + " preview image"}
                          className="h-full w-full object-cover opacity-95 grayscale"
                          onError={(e) => {
                            const target = e.currentTarget
                            if (target.src !== imgFallback) target.src = imgFallback
                          }}
                        />
                      </div>
                      <p className="line-clamp-3 text-sm text-white/85">{p.problem}</p>
                      <div className="mt-3 inline-flex items-center text-sm text-white/90">
                        View details
                        <span className="ml-2 inline-block">{">"}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list" className="mt-6">
              <div className="divide-y divide-white/10 rounded-md border border-white/10 bg-white/5">
                {projects.map((p) => (
                  <div key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium text-white">{p.title}</h4>
                        {p.tags?.slice(0, 3)?.map((t) => (
                          <Badge key={t} variant="outline" className="border-white/30 text-white/85">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-white/80">{p.problem}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.link ? (
                        <SafeLink href={p.link} target="_blank">
                          <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open
                          </Button>
                        </SafeLink>
                      ) : null}
                      <Button
                        variant="default"
                        className="bg-white text-black hover:bg-zinc-200"
                        onClick={() => router.push(`/projects/${p.id}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-sm text-white/60 sm:px-6 lg:px-8">
          <div>© {new Date().getFullYear()} Favour Adimora</div>
          <div className="hidden gap-4 sm:flex">
            <SafeLink
              href={siteConfig.social.linkedin}
              target="_blank"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              fallbackMessage="Add your LinkedIn URL in lib/site.ts."
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </SafeLink>
            <SafeLink
              href={siteConfig.social.github}
              target="_blank"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              fallbackMessage="Add your GitHub URL in lib/site.ts."
            >
              <Github className="h-4 w-4" />
              GitHub
            </SafeLink>
            <SafeLink
              href={siteConfig.social.twitter}
              target="_blank"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              fallbackMessage="Add your Twitter URL in lib/site.ts."
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </SafeLink>
          </div>
        </div>
      </footer>

      <ProjectDrawer open={!!selected} project={selected} onOpenChange={(open) => !open && setSelected(null)} />
      <Toaster />
    </div>
  )
}
