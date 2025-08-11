"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { siteConfig } from "@/lib/site"
import { useAssetExists } from "@/hooks/use-asset-exists"

export default function ResumeDownload({ className = "" }: { className?: string }) {
  const { toast } = useToast()
  const exists = useAssetExists(siteConfig.resumePath)

  if (exists) {
    return (
      <Button asChild className={className || "bg-white text-black hover:bg-zinc-200"}>
        <a href={siteConfig.resumePath} download>
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </a>
      </Button>
    )
  }

  return (
    <Button
      className={className || "bg-white text-black hover:bg-zinc-200"}
      onClick={() => {
        // Try to download the file directly, even if it doesn't exist
        const link = document.createElement('a')
        link.href = siteConfig.resumePath
        link.download = 'resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Show toast if file doesn't exist
        if (!exists) {
          toast({
            title: "Resume download",
            description: "If the download doesn't start, the resume file may not be available yet.",
          })
        }
      }}
    >
      <Download className="mr-2 h-4 w-4" />
      Download Resume
    </Button>
  )
}
