import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { sampleProjects } from "@/lib/projects"
import ProjectDetails from "@/components/project-details"
import type { Project } from "@/lib/projects"

type PageProps = {
  params: { id: string }
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { id } = await params
  let project: Project | undefined = sampleProjects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to projects
        </Link>
      </header>
      <main>
        <ProjectDetails project={project!} />
      </main>
    </div>
  )
}
