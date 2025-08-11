"use client"

import { useEffect, useState } from "react"

export function useAssetExists(path: string | undefined | null) {
  const [exists, setExists] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    async function check() {
      if (!path) {
        setExists(false)
        return
      }
      try {
        const res = await fetch(path, { method: "HEAD", cache: "no-store" })
        if (!cancelled) setExists(res.ok)
      } catch {
        if (!cancelled) setExists(false)
      }
    }
    check()
    return () => {
      cancelled = true
    }
  }, [path])

  return exists
}
