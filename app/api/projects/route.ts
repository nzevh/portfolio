import { type NextRequest, NextResponse } from "next/server"
import type { Project } from "@/lib/projects"

// Using dynamic import so this route can be tree-shaken on client builds
import * as cheerio from "cheerio"
import type { AnyNode } from "domhandler"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sourceUrl = searchParams.get("sourceUrl")

  if (!sourceUrl) {
    return NextResponse.json({ projects: [] as Project[] }, { status: 200 })
  }

  // Try JSON first: {source}/projects.json
  try {
    const jsonUrl = new URL("/projects.json", ensureTrailingSlash(sourceUrl)).toString()
    const jsonRes = await fetch(jsonUrl, { headers: { Accept: "application/json" } })
    if (jsonRes.ok) {
      const payload = await jsonRes.json()
      const normalized = normalizeProjectsFromJson(payload)
      if (normalized.length) {
        return NextResponse.json({ projects: normalized }, { status: 200 })
      }
    }
  } catch {
    // ignore and fallback to HTML scraping
  }

  // Fallback: scrape HTML looking for Problem/Method/Result sections
  try {
    const htmlRes = await fetch(sourceUrl, { headers: { Accept: "text/html" } })
    const html = await htmlRes.text()
    const projects = scrapeProjectsFromHtml(html, sourceUrl)
    return NextResponse.json({ projects }, { status: 200 })
  } catch {
    return NextResponse.json({ projects: [] as Project[] }, { status: 200 })
  }
}

function ensureTrailingSlash(url: string) {
  return url.endsWith("/") ? url : url + "/"
}

function normalizeProjectsFromJson(payload: unknown): Project[] {
  // Accept common shapes and map to our Project interface
  // Examples supported:
  // - [{ id, title, problem, method, result, tags, link, image }]
  // - { projects: [...] } wrapper
  const arr: any[] = Array.isArray(payload) ? payload : ((payload as any)?.projects ?? [])
  return arr
    .map((p, idx) => {
      const id = String(p.id ?? idx + 1)
      const title = String(p.title ?? p.name ?? `Project ${idx + 1}`)
      const problem = String(p.problem ?? p.challenge ?? "")
      const method = String(p.method ?? p.approach ?? "")
      const result = String(p.result ?? p.outcome ?? "")
      const tags = Array.isArray(p.tags) ? p.tags.map((t: any) => String(t)) : []
      const link = typeof p.link === "string" ? p.link : typeof p.url === "string" ? p.url : undefined
      const image = typeof p.image === "string" ? p.image : typeof p.thumbnail === "string" ? p.thumbnail : undefined
      return { id, title, problem, method, result, tags, link, image } as Project
    })
    .filter((p) => p.title || p.problem || p.method || p.result)
}

function scrapeProjectsFromHtml(html: string, baseUrl: string): Project[] {
  const $ = cheerio.load(html)

  // Gather candidate containers
  const containers = $("section, article, .project, .portfolio-item").toArray()
  const projects: Project[] = []

  // Helper to extract text after a heading containing a keyword
  const extractSection = ($scope: cheerio.Cheerio<AnyNode>, label: string) => {
    const heading = $scope
      .find("h1,h2,h3,h4,strong,b,em")
      .filter((_i, el) => {
        const t = $(el).text().trim().toLowerCase()
        return t === label || t.includes(label + ":")
      })
      .first()

    if (heading.length > 0) {
      // Get all following siblings until next heading
      const followingSiblings = heading.nextAll()
      let text = ""

      for (let i = 0; i < followingSiblings.length; i++) {
        const sibling = followingSiblings.eq(i)
        if (sibling.is("h1,h2,h3,h4,strong,b,em")) break
        const siblingText = sibling.text().trim()
        if (siblingText) {
          text += " " + siblingText
        }
      }
      return text.trim()
    }

    // Alternative: find paragraphs containing "Problem:" etc.
    const para = $scope
      .find("p,li,div")
      .filter((_i, el) => {
        const t = $(el).text().trim().toLowerCase()
        return t.startsWith(label + ":")
      })
      .first()
    if (para.length > 0) {
      return para
        .text()
        .replace(/^\s*[^:]+:\s*/i, "")
        .trim()
    }
    return ""
  }

  const seenTitles = new Set<string>()
  for (const c of containers) {
    const scope = $(c)

    const title = scope.find("h1,h2,h3,.title").first().text().trim() || scope.attr("data-title") || ""

    const problem = extractSection(scope, "problem")
    const method = extractSection(scope, "method")
    const result = extractSection(scope, "result")

    if (!title && !(problem || method || result)) continue

    // Image and link heuristics
    const imgSrc = scope.find("img").first().attr("src") || "/robotics-control-monochrome.png"
    const link =
      scope
        .find("a")
        .filter((_i, el) => {
          const t = $(el).text().toLowerCase()
          return (
            t.includes("demo") ||
            t.includes("repo") ||
            t.includes("github") ||
            t.includes("project") ||
            t.includes("case")
          )
        })
        .first()
        .attr("href") || undefined

    // Tags heuristic
    const tags = scope
      .find(".tag,.badge,.label")
      .toArray()
      .slice(0, 5)
      .map((el) => $(el).text().trim())
      .filter(Boolean)

    const normalizedTitle = title || `Project ${projects.length + 1}`
    if (seenTitles.has(normalizedTitle + problem + method + result)) continue
    seenTitles.add(normalizedTitle + problem + method + result)

    projects.push({
      id: String(projects.length + 1),
      title: normalizedTitle,
      problem,
      method,
      result,
      tags,
      link: link ? absolutize(link, baseUrl) : undefined,
      image: imgSrc ? absolutize(imgSrc, baseUrl) : undefined,
    })
  }

  // Fallback: no containers found; try global content
  if (projects.length === 0) {
    const problem = extractGlobal($, "problem")
    const method = extractGlobal($, "method")
    const result = extractGlobal($, "result")
    if (problem || method || result) {
      projects.push({
        id: "1",
        title: $("title").first().text().trim() || "Project",
        problem,
        method,
        result,
        tags: [],
      })
    }
  }

  return projects
}

function extractGlobal($: cheerio.CheerioAPI, label: string): string {
  const heading = $("h1,h2,h3,h4,strong,b,em")
    .filter((_i, el) => {
      const t = $(el).text().trim().toLowerCase()
      return t === label || t.includes(label + ":")
    })
    .first()
  if (heading.length) {
    // Get all following siblings until next heading
    const followingSiblings = heading.nextAll()
    let text = ""

    for (let i = 0; i < followingSiblings.length; i++) {
      const sibling = followingSiblings.eq(i)
      if (sibling.is("h1,h2,h3,h4,strong,b,em")) break
      const siblingText = sibling.text().trim()
      if (siblingText) {
        text += " " + siblingText
      }
    }
    return text.trim()
  }
  const para = $("p,li,div")
    .filter((_i, el) => {
      const t = $(el).text().trim().toLowerCase()
      return t.startsWith(label + ":")
    })
    .first()
  if (para.length)
    return para
      .text()
      .replace(/^\s*[^:]+:\s*/i, "")
      .trim()
  return ""
}

function absolutize(url: string, base: string): string {
  try {
    return new URL(url, base).toString()
  } catch {
    return url
  }
}
