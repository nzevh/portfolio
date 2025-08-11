"use client"

import type React from "react"

import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { isDeadHref } from "@/lib/site"
import { cn } from "@/lib/utils"
import type { PropsWithChildren, AnchorHTMLAttributes } from "react"

type SafeLinkProps = PropsWithChildren<
  {
    href?: string
    fallbackMessage?: string
    className?: string
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"]
    rel?: string
    "aria-label"?: string
  } & React.ComponentProps<typeof Link>
>

// Renders <Link> when href is configured, otherwise becomes a harmless button that toasts a message.
export function SafeLink({
  href,
  children,
  fallbackMessage = "This link hasn’t been configured yet.",
  className,
  target,
  rel,
  ...rest
}: SafeLinkProps) {
  const { toast } = useToast()
  if (!href || isDeadHref(href)) {
    return (
      <span
        className={cn("cursor-not-allowed opacity-70", className)}
        onClick={() =>
          toast({
            title: "Link unavailable",
            description: fallbackMessage,
          })
        }
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toast({
              title: "Link unavailable",
              description: fallbackMessage,
            })
          }
        }}
      >
        {children}
      </span>
    )
  }
  return (
    <Link href={href} target={target} rel={rel} className={className} {...rest}>
      {children}
    </Link>
  )
}
