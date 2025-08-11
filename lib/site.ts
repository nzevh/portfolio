export const siteConfig = {
  resumePath: "/resume.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/favour-adimora",
    github: "https://github.com/nzevh",
    twitter: "https://twitter.com/nzevh_",
  },
}

// Utility to detect links that haven't been configured yet
export function isDeadHref(href?: string | null) {
  if (!href) return true
  const h = href.trim()
  if (h === "#" || h === "" || h.toLowerCase().startsWith("javascript:")) return true
  if (h.includes("your-username")) return true
  // Generic homepage without a username path often means placeholder
  if (h === "https://github.com" || h === "https://www.linkedin.com" || h === "https://twitter.com") return true
  return false
}
